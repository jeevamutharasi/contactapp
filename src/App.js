import React, { useState, useEffect } from "react";
import './App.css';
import Header from "./component/Header";
import AddContact from "./component/AddContact";
import ContactList from "./component/ContactList";


function App() {
  const LOCAL_STORAGE_KEY ="contacts";
  const [contacts, setContacts] = useState([]);
 const uuid = require('uuid').v4;

  const addContactHandler = (contact) =>{
    console.log(contact);
   setContacts([...contacts,{id: uuid(), ...contact}]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  }
  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  }, [contacts]);

  return (
   <div className="ui container">
     <Header />
     <AddContact addContactHandler={addContactHandler}/>
     <ContactList contacts={contacts} getContactId = {removeContactHandler} />
   </div>
  );
}

export default App;
