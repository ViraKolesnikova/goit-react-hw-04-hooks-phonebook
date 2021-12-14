import { useEffect, useState } from 'react';

import Form from './components/Form';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import { saveToLS, getFromLS } from './utils/localStorage';


export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = getFromLS('contacts');
    savedContacts &&  setContacts(savedContacts);
  }, []);

  useEffect(() => {
    saveToLS('contacts', contacts);
  }, [contacts]);

  const updateContactsList = obj => {
    setContacts(prevState => ([...prevState, obj]));
  };

  const findContactsByFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState=>prevState.filter(contact => contact.id !== contactId))    
  };

  return (
      <>
        <h1>Phonebook</h1>
        <Form
          addContact={updateContactsList}
          contacts={contacts}
        />

        <h2>Contacts</h2>
        <Filter
          onFilterInputEnter={e=>setFilter(e.target.value)}
          onFilterOut={()=>setFilter('')}
          filterValue={filter}
        />

        <ContactList
          contactsData={findContactsByFilter()}
          onDeleteBtn={deleteContact}
        />
      </>
    );
}

