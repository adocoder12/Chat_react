import React, { useState } from "react";
import './ChatInput.css'

export default function Chatinput() {
    const [msg, setMsg] = useState("");
    console.log(msg)

    // const sendChat = (event) => {
    //     event.preventDefault();
    //     if (msg.length > 0) {
    //         setMsg("");
    //     }
    // };
    return (
        <>
            <div className="chat-input" >
                <input onChange={(e) => setMsg(e.target.value)}
                    value={msg} type="text" className="txt-input" placeholder="Send a message..." />
                <button type="submit" className="btn-submit" id="chat-submit">send</button>
            </div>
        </ >
    );
}
