import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [deletedPersons, setDeletedPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchName, setSearchName] = useState('');
  const [message, setMessage] = useState('');

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

  // console.log(persons);

  const addNewEntry = event => {
    event.preventDefault();
    if (!newName || !newPhone) {
      alert("Name or phone number field is empty.");
      return;
    }

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update their number?`)) {
        const updatedPerson = { ...existingPerson, phone: newPhone };

        postService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setMessage(`Updated ${newName}'s phone number.`);
            setTimeout(() => setMessage(''), 3000);
            setNewName('');
            setNewPhone('');
          })
          .catch(error => {
            console.error("Failed to update person:", error);
            alert("Failed to update phone number. Please try again.");
          });

        return;
      }
    }

    // if (persons.some(person => person.name === newName)) {
    //   alert(`${newName} is already in the phonebook.`);
    //   return;
    // }
    // if (persons.some(person => person.phone === newPhone)) {
    //   alert(`Phone number ${newPhone} is already in the phonebook.`);
    //   return;
    // }

    const newPerson = { name: newName.trim(), phone: newPhone.trim() };
    console.log("Adding:", newPerson);

    postService.create(newPerson)
      .then(person => {
        setPersons([...persons, person]);
        setMessage(`Added ${newName} successfully.`);
        setTimeout(() => setMessage(''), 2000);
        setNewName('');
        setNewPhone('');
      })
      .catch(error => {
        console.error("Failed to add person:", error.response?.data || error.message);
        alert("Network Error. Failed to add person. Please try npm run server.");
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


  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id);

    postService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setDeletedPersons([...deletedPersons, personToDelete]);
        toast.success(`${personToDelete.name} was deleted successfully.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            color: "red",
            marginTop: '55%',
          },
        });
        // setMessage(`${personToDelete.name} was deleted successfully.`);
        // setTimeout(() => setMessage(''), 3000);
      })
      .catch(error => {
        console.error("Failed to delete person:", error);
        alert("Failed to delete person. Please try again.");
      });
  };

  const restorePerson = person => {
    postService.create(person)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setDeletedPersons(deletedPersons.filter(p => p.id !== person.id));
        toast.success(`${person.name} restored!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            color: "green",
            marginTop: '55%',
          },
        });
      })
      .catch(error => {
        console.error("Failed to restore person:", error);
        alert("Failed to restore person.");
      });
  };

  const removeFromDeletedList = id => {
    setDeletedPersons(deletedPersons.filter(person => person.id !== id));
  };

// console.log(deletedPersons);

  return (
    <div className='shell'>
      <ToastContainer />

      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      {searchName && <Persons persons={filteredPersons} onDelete={deletePerson} />}
      <h3>Add a new</h3>
      <PersonForm
        addNewEntry={addNewEntry}
        newName={newName}
        handleNewNameAdd={handleNewNameAdd}
        newPhone={newPhone}
        handleNewPhoneAdd={handleNewPhoneAdd}
      />
      <h3>Numbers</h3>
      {message && <div className='message' style={{ color: 'green' }}>{message}</div>}
      {/* <ToastContainer /> */}

      <Persons persons={persons} onDelete={deletePerson} />
      {deletedPersons.length > 0 && (
        <div className='restore'>
          <h3>Restore</h3>
          <ul>
            {deletedPersons.map(person => (
              <li key={person.id}>
                <button className='restore_button' onClick={() => restorePerson(person)}>Restore</button>
                <span style={{ color: 'transparent' }}>...</span>
                {person.name} {person.phone}
                <span style={{ color: 'transparent' }}>...</span>
                <button className='nope' onClick={() => removeFromDeletedList(person.id)} style={{ color: 'red' }}>
                  Nope
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
