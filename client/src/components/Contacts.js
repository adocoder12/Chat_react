import React, { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'

//Importing Css
import './Contacts.css'


export default function Contacts({ contacts, changeChat }) {
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const { user } = useAuthContext()


    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact)
        console.log(contact)
    }
    return (
        <>
            {(user &&
                < div className='users-card' >
                    {contacts.filter((contact) => contact.status === "online").map((contact, index) => {
                        return (
                            <div key={contact._id} onClick={() => changeCurrentChat(index, contact)} className={`user-details ${index === currentSelected ? `selected` : ''
                                }`}  >
                                <img alt="Profile-picture" src={contact.picture} className="avatar" />
                                <h3 className="username">{contact.username}</h3>
                            </div>
                        );
                    }
                    )}
                </div >
            )
            }
        </>
    )

}
