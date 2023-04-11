import { useState } from 'react';
import Chat from './Chat';
import ContactList from './ContactList'

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' },
  { id: 3, name: 'Bob1', email: 'bob1@mail.com' },
  { id: 4, name: 'Li', email: 'bob12@mail.com' }
];


export default function App() {
  const initialContactsData = { selectedId: 0, messages: {} }
  const [contactsData, setContactData] = useState(initialContactsData)
  const contact = contacts.find(c => c.id === contactsData.selectedId)
  const message = contactsData.messages[contact.id]

  function selectedContact(id) {
    setContactData({ ...contactsData, selectedId: id })
  }
  console.log(contactsData.messages)

  function changeContactMessage(message) {
    setContactData(
      {
        ...contactsData,
        messages: {
          ...contactsData.messages,
          [contact.id]: message
        }
      }
    )
  }

  function sentToContact() {
    setContactData(
      {
        ...contactsData,
        messages: {
          ...contactsData.messages,
          [contact.id]: ''
        }
      }
    )
  }

  return (
    <>
      <ContactList contacts={contacts} selectedId={contact.id} onSelect={selectedContact} />
      <Chat key={contact.id} contact={contact} message={message} onChange={changeContactMessage} onClick={sentToContact} />
    </>
  )
}