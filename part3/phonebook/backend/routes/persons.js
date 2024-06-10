const express = require("express");
const router = express.Router();

const persons = [
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

router.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

router.get("/info", (req, res) => {
  res.status(200).send(`
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    </div>
  `);
});

router.get("/api/persons/:id", (req, res) => {
  const requestedId = req.params["id"];
  const requestedPerson = persons.find(
    (person) => String(person.id) === String(requestedId)
  );

  if (requestedPerson) {
    res.status(200).json(requestedPerson);
  } else {
    res.status(404).json({ error: "No data found." });
  }
});

router.delete("/api/persons/:id", (req, res) => {
  const requestedId = req.params["id"];
  const requestedPerson = persons.find(
    (person) => String(person.id) === String(requestedId)
  );

  const requestedPersonIndex = persons.indexOf(requestedPerson);

  persons.splice(requestedPersonIndex, 1);

  res.status(200).json(requestedPerson);
});

router.post("/api/persons", (req, res) => {
  const { name, number, id } = req.body;

  if (!name || !number) {
    return res.status(404).json({ error: "Name or number missing." });
  }

  const checkExistingPerson = persons.find((person) => person.name === name);

  if (checkExistingPerson) {
    return res.status(404).json({ error: "Person already exists." });
  }

  const newPerson = {
    name,
    number,
    id,
  };
  persons.push(newPerson);

  res.status(200).json(persons);
});

router.put("/api/persons/:id", (req, res) => {
  const requestedId = req.params["id"];
  const requestedPerson = persons.find(
    (person) => String(person.id) === String(requestedId)
  );
  const requestedPersonIndex = persons.indexOf(requestedPerson);

  const { name, number, id } = req.body;

  const updatedPerson = {
    name,
    number,
    id,
  };
  persons[requestedPersonIndex] = updatedPerson;

  res.status(200).json(persons[requestedId]);
});

module.exports = router;
