import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";
// CSS
import './Chat.css'
import Welcome from "../components/Welcome";

//Component
import ChatContainercopy from '../components/ChatContainer'
import Contacts from '../components/Contacts';

export default function Chat() {
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const { user } = useAuthContext()
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const settingCurrentUser = () => {
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                navigate("/login");
            } else {
                setCurrentUser(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                );
            }
        }
        settingCurrentUser()
    },);

    useEffect(() => {
        if (currentUser) {
            socket.current = io("http://localhost:3001");
            socket.current.emit("new-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchAllUser = async () => {
            if (user) {
                fetch(`http://localhost:3001/api/user/allusers/${user._id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setContacts(data)

                    });
            }
        }
        fetchAllUser()
    }, [user]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <>
            <div className='contain'>
                <Contacts contacts={contacts} changeChat={handleChatChange} />
                {currentChat === undefined ?
                    (<Welcome />) :
                    (<ChatContainercopy socket={socket} userId={user._id} currentChat={currentChat} />)

                }
            </div>
        </>
    );
}
