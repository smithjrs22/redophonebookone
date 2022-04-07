const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

const generateId = () => {
  let id = Math.floor(Math.random() * (100 - 1));
  if (persons.find((person) => person.id === id)) {
    id = generateId();
  }
  return id;
};

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

//3.1: Phonebook backend step1//
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
//3.2: Phonebook backend step2//
app.get("/info", (request, response) => {
  response.json("Phonebook has info for 4 people" + " " + new Date());
});

//3.3: Phonebook backend step3 http://localhost:3001/api/persons/5//
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  let person = persons.find((person) => {
    console.log(person.id, typeof person.id, id, typeof id, person.id === id);
    return person.id === id;
  });
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

//3.4: Phonebook backend step4 Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry//
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  person = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

//3.5: Phonebook backend step5 Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.//

// const person = {
//   id: generateId(),
//   name: body.name,
//   number: body.number
// }

// persons = persons.concat(person);
// response.json(person);

// const express = require('express')
// const app = express()
// app.use (express.json ())

//3.6: Phonebook backend step6 Implement error handling for creating new entries. The request is not allowed to succeed, if: The name or number is missingThe name already exists in the phonebook//

app.post("api/persons", (request, response) => {
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});
// app.post("/api/notes", (request, response) => {
//   const body = request.body;

//   if (!body) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//     id: generateId(),
//   };

//   notes = notes.concat(note);

//   response.json(note);
// });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
