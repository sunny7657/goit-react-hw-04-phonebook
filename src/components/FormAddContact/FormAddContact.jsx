import { useState } from 'react';
import styled from 'styled-components';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BtnStyled = styled.button`
  display: block;
  margin-top: 20px;
  font-size: 12px;
  padding: 8px;
`;

export const FormAddContact = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = evt => {
    const { value } = evt.target;
    if (evt.target.name === 'name') {
      setName(value);
    } else if (evt.target.name === 'number') {
      setNumber(value);
    }
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
    Notify.success('The contact was created');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          required
          placeholder="Adam Smith"
          value={name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          required
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
          placeholder="000-00-00"
          value={number}
          onChange={handleInputChange}
        />
      </label>
      <BtnStyled type="submit">Add contact</BtnStyled>
    </form>
  );
};
