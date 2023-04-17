import React from 'react'
import ContactList from '../../Chat-React/src/ContactList';
import { useReducer } from 'react';
import messengerReducer from '../../Chat-React/src/messengerReducer';


const contacts = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' },
];



const initialState =
{
    selectedId: 0,
    messages: {
    }
}

export default function App() {
    const [state, dispatch] = useReducer(messengerReducer, initialState)
    const contact = contacts[state.selectedId]


    return (
        <>
            <ContactList contacts={contacts} />
            <Chat />
        </>
    )
}

