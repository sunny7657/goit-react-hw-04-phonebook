import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useEffect, useState } from 'react';
import { Section } from './Section/Section';
import { FormAddContact } from './FormAddContact/FormAddContact';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    if (localData && JSON.parse(localData).length > 0) {
      setContacts(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = data => {
    const newContact = { ...data, id: nanoid() };
    const doesExist = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (doesExist) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const handleFilteredContacts = event => {
    setFilter(event.target.value);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
    Notify.info('The contact was deleted');
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Section title="Phonebook">
        <FormAddContact onSubmit={handleSubmit} />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 && (
          <>
            <Filter onChange={handleFilteredContacts} />
            <ContactList contacts={filteredContacts} onDelete={deleteContact} />
          </>
        )}
      </Section>
    </div>
  );
};
