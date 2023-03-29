const mongoose = require("mongoose");

// const MessageSchema = mongoose.Schema(
//     {
//         message: {
//             text: {
//                 type: String,
//                 required: true
//             },
//         },
//         users: Array,
//         sender: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Users",
//             required: true,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

/*Message schema*/

const MessageSchema = new mongoose.Schema({
    content: String,
    from: Object,
    socketid: String,
    time: String,
    date: String,
    to: String
})


module.exports = mongoose.model("Messages", MessageSchema);