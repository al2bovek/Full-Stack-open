import express from 'express';
import { persons } from './api.js';

const app = express();

app.use(express.json());

app.get('/info', (request, response) => {
  response.send(`<div style="text-align:center"><h2>Phonebook has info for ${persons.length} people</h2>
    <p>${new Date()}</p></div>`
  )
})

app.get('/api/persons', (request, response) => { response.json(persons)});


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ error: 'Person not found' });
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.filter(person => person.id !== id)

  response.status(204).end()
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;
  if (!name || !number) {
    return response.status(400).json({ error: 'Name and number are required' });
  }
  if (persons.some(person => person.name === name)) {
    return response.status(409).json({ error: 'Name must be unique' });
  }
  const id = Math.floor(Math.random() * 10000);
  const newPerson = { id, name, number };
  persons.push(newPerson);
  response.status(201).json(newPerson);
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
