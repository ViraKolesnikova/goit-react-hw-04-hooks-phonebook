import { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import s from './Form.module.css';

export default function Form({ addContact, contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmitAddContact = event => {
    event.preventDefault();
    const contactID = shortid.generate();
    const newContact = {
      id: contactID,
      name,
      number,
    };
    if (checkContactIdentity() === undefined) {
      addContact(newContact);
      reset();
    } else {
      alertIdentity(name);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const checkContactIdentity = () => {
    const identity = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    return identity;
  };

  const alertIdentity = name => {
    alert(`${name} is already in your contacts!`);
    reset();
  };

  const nameID = shortid.generate();
  const numberID = shortid.generate();

  return (
    <form className={s.form} onSubmit={onSubmitAddContact}>
      <label className={s.label} htmlFor={nameID}>
        Name
      </label>
      <input
        id={nameID}
        className={s.input}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={e => setName(e.target.value)}
      />
      <label className={s.label} htmlFor={numberID}>
        Number
      </label>
      <input
        id={numberID}
        className={s.input}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={e => setNumber(e.target.value)}
      />
      <button className={s.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
