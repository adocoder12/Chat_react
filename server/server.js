require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

//db models

const Message = require('./models/messageModel')

const cors = require("cors");

//Socketio model
const { Server } = require('socket.io')


//User route
const authRoutes = require("./routes/user");
//Express app
const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

// const uri = "mongodb+srv://adonay:1234@chat.5dqjfg1.mongodb.net/Chat_app?retryWrites=true&w=majority"



app.use("/api/user", authRoutes);

//connect to db

async function connect() {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}
connect();



/* SOCKETIO */
const PORT = 3001 || process.env.PORT;
const server = require('http').createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ['GET', 'POST'],
    },
});


async function getLastMessagesFromRoom(room) {
    let roomMessages = await Message.aggregate([
        { $match: { to: room } },
        { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } }
    ])
    return roomMessages;
}

function sortRoomMessagesByDate(messages) {
    return messages.sort(function (a, b) {
        let date1 = a._id.split('/');
        let date2 = b._id.split('/');

        date1 = date1[2] + date1[0] + date1[1]
        date2 = date2[2] + date2[0] + date2[1];

        return date1 < date2 ? -1 : 1
    })
}

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on('new-user', (userId) => {
        console.log(`user connecteed ${socket.id}`)
        onlineUsers.set(userId, socket.id);
        console.log(onlineUsers)
    })

    socket.on('join-room', async (newRoom, previousRoom) => {
        socket.join(newRoom);
        // socket.leave(newRoom);
        socket.leave(previousRoom);
        let roomMessages = await getLastMessagesFromRoom(newRoom);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        io.emit('room-messages', roomMessages);

        console.log(`User  ${socket.id} joined new room ${newRoom}`);

    })

    socket.on('message-room', async (room, content, sender, time, date) => {
        const newMessage = await Message.create({ content, from: sender, time, date, to: room });
        let roomMessages = await getLastMessagesFromRoom(room);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        // sending message to room
        if (room) {
            io.to(room).emit('room-messages', roomMessages);
        } else {
            console.log("Can´t send msg to user")
        }
    })
});


server.listen(PORT, () => {
    console.log(`Connected at PORT: ${PORT}`)
})
