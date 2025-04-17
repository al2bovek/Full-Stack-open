import { useState, useEffect } from 'react';
// import axios from 'axios';

import postService from './postService.js';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'University of Helsinki', phone: '+358 (0) 2941 911' },
    { name: 'University of Jyväskylä', phone: '+358 (0) 14 260 1211' },
    { name: 'University of Oulu', phone: '+358 (0) 294 48 0000' },
    { name: 'Aalto University', phone: '+358 (0) 9 47001' }
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchName, setSearchName] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       setPersons(response.data)
  //     })
  // }, [])

  useEffect(() => {
    postService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  console.log(persons)

  const addNewEntry = event => {
    event.preventDefault();
    if (!newName || !newPhone) {
      alert("Name or phone number field is empty.");
      return;
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook.`);
      return;
    }
    if (persons.some(person => person.phone === newPhone)) {
      alert(`Phone number ${newPhone} is already in the phonebook.`);
      return;
    }

    const newPerson = { name: newName.trim(), phone: newPhone.trim() };
    console.log("Adding:", newPerson);

    postService.create(newPerson)
      .then(person => {
        setPersons([...persons, person]);
        setNewName('');
        setNewPhone('');
      })
      .catch(error => {
        console.error("Failed to add person:", error.response?.data || error.message);
        alert("Failed to add person. Please try again.");
      });
      


    // axios.post('http://localhost:3001/persons', newPerson)
    //   .then(response => {
    //     setPersons([...persons, response.data]);
    //     setNewName('');
    //     setNewPhone('');
    //   })
    //   .catch(error => {
    //     console.error("Error adding person:", error);
    //     alert("Failed to add person. Please try again.");
    //   });
  };

  const handleNewNameAdd = event => {
    setNewName(event.target.value);
  };

  const handleNewPhoneAdd = event => {
    setNewPhone(event.target.value);
  };

  const handleSearchName = event => {
    setSearchName(event.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      {searchName && <Persons persons={filteredPersons} />}
      <h3>Add a new</h3>
      <PersonForm
        addNewEntry={addNewEntry}
        newName={newName}
        handleNewNameAdd={handleNewNameAdd}
        newPhone={newPhone}
        handleNewPhoneAdd={handleNewPhoneAdd}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
