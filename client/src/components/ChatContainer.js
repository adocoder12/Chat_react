import React, { useEffect, useState, useRef } from "react";
import './ChatContainercopy.css'
import { useAuthContext } from '../hooks/useAuthContext'


export default function ChatContainercopy({ socket, userId, currentChat }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [currentRoom, setCurrentRoom] = useState(undefined);
    const [messageList, setMessageList] = useState([]);
    const messageEndRef = useRef(null);
    const { user } = useAuthContext()

    //scroll smothly
    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    //Get current chat
    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                )._id;
            }
        };
        getCurrentChat();
    }, [currentChat]);

    //Joining room and rendering once

    function orderIds(id1, id2) {
        if (id1 > id2) {
            return id1 + "-" + id2;
        } else {
            return id2 + "-" + id1;
        }
    }

    const roomId = orderIds(user._id, currentChat._id);

    function joinRoom(room, isPublic = true) {
        if (!user) {
            return alert("Please login");
        }
        socket.current.emit("join-room", room, currentRoom);
        setCurrentRoom(room);
    };

    useEffect(() => {
        joinRoom(roomId, false);
    }, [currentChat._id])

    //Get the messages to room 
    useEffect(() => {
        socket.current.on("room-messages", (roomMessages) => {
            setMessageList(roomMessages);
        });
    }, [messageList]);

    // send message to User
    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : "0" + day;
        return month + "/" + day + "/" + year;
    }

    const todayDate = getFormattedDate();

    const sendMessage = () => {
        if (currentMessage !== "") {
            const today = new Date();
            const room = roomId
            const author = user.username
            const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
            const time = today.getHours() + ":" + minutes;
            const content = currentMessage
            socket.current.emit("message-room", room, content, author, time, todayDate);
            setCurrentMessage("");
        }
    }
    return (
        <>
            {currentChat && (
                <div className='chat-container'>
                    {/* Curremt chat */}
                    <div className="currentChat">
                        <p>{currentChat.username}</p>
                        <img src={currentChat.picture} className="avatar"></img>

                    </div>
                    {/* Chat container */}
                    <div className="message-container">
                        {user &&
                            messageList.map(({ _id: date, messagesByDate }, idx) => (
                                <div key={idx}>
                                    {messagesByDate.map(({ content, time, from: sender }, msgIdx) => (
                                        <div className={sender === user.username ? "message" : "incoming-message"} key={msgIdx}>
                                            <div>
                                                <div className="message-content">
                                                    <p>{content}</p>
                                                </div>
                                                <div className="message-meta">
                                                    <p id="time">{time}</p>
                                                    <p id="author">{sender}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        <div ref={messageEndRef} />
                    </div>
                    {/* Chat input */}
                    <div className="chat-input" >
                        <input onChange={(e) => setCurrentMessage(e.target.value)} onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                            value={currentMessage} type="text" className="txt-input" placeholder="Send a message..." />
                        <button onClick={sendMessage} type="submit" className="btn-submit" id="chat-submit" disabled={!user}>send</button>
                    </div>
                </div>
            )}
        </>
    )
}
