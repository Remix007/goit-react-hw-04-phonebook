import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import FormAddPhone from './FormAddPhone/FormAddPhone';
import Contacts from './Contacts/Contacts';

import s from './App.module.css';

function App() {
  const [phoneList, setPhoneList] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('phoneList')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  const addContact = data => {
    if (isDublicate(data)) {
      return alert(`${data.name} - ${data.number} is already in phonebook`);
    }
    setPhoneList(prevPhoneList => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return [...prevPhoneList, newContact];
    });
  };

  const removeContact = id => {
    setPhoneList(prevPhoneList => prevPhoneList.filter(item => item.id !== id));
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const isDublicate = ({ name, number }) => {
    const result = phoneList.find(
      item => item.name === name && item.number === number
    );
    return Boolean(result);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return phoneList;
    }
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = phoneList.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) || number.includes(filter);
      return result;
    });
    return filteredContacts;
  };

  useEffect(() => {
    localStorage.setItem('phoneList', JSON.stringify(phoneList));
  }, [phoneList]);

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h2 className={s.title}>Phonebook</h2>
      <div className={s.container}>
        <FormAddPhone onSubmit={addContact} />
      </div>

      <div>
        <h2 className={s.title}>Contacts</h2>
        <p className={s.paragraph}>Find contacts by name</p>
        <input
          name="filter"
          onChange={handleFilter}
          className={s.input}
          placeholder="Filter"
        />
        <Contacts items={filteredContacts} removeContact={removeContact} />
      </div>
    </div>
  );
}

export default App;
