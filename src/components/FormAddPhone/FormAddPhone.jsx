import React from 'react';
import { useState } from 'react';
import initialState from './InitialState.js';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import s from './form-add-phone.module.css';

const FormAddPhone = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  const { name, number } = state;

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.formGroup}>
        <label htmlFor={nameInputId} className={s.label}>
          Name
        </label>
        <br></br>
        <input
          id={nameInputId}
          onChange={handleChange}
          value={name}
          className={s.input}
          type="text"
          name="name"
          placeholder="Введите имя и фамилию"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={s.formGroup}>
        <label htmlFor={numberInputId} className={s.label}>
          Number
        </label>
        <br></br>
        <input
          id={numberInputId}
          onChange={handleChange}
          value={number}
          className={s.input}
          type="tel"
          name="number"
          placeholder="Введите номер телефона"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <div className={s.formGroup}>
          <button className={s.btn} type="submit">
            Add contact
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormAddPhone;

FormAddPhone.defaultProps = {
  onSubmit: () => {},
};

FormAddPhone.propTypes = {
  onSubmit: PropTypes.func,
};

/
