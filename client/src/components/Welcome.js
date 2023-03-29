import React from "react";
import { useAuthContext } from '../hooks/useAuthContext'
import "./Welcome.css"
function Welcome() {
    const { user } = useAuthContext()

    return (
        <div className="container-welcome">
            <h1>
                Welcome, <span className="username">{user.username}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    );
}

export default Welcome
