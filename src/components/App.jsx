import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { useState } from 'react';
import { Section } from './Section/Section';
import { FormAddContact } from './FormAddContact/FormAddContact';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleSubmit = data => {
    const newContact = { ...data, id: nanoid() };
    const doesExist = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (doesExist) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      setContacts(prevContacts => ({
        contacts: [...prevContacts, newContact],
      }));
    }
  };

  const handleFilteredContacts = event => {
    setFilter({ filter: event.target.value });
  };

  const deleteContact = id => {
    setContacts(prevContacts => ({
      contacts: prevContacts.filter(contact => contact.id !== id),
    }));
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
