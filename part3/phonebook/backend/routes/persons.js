const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Person = require("../models/Person");

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await console.log("Connected to MongoDB");
  } catch (err) {
    next(err);
  }
};

connectMongo();

router.get("/api/persons", async (req, res) => {
  try {
    let persons = await Person.find();
    res.status(200).json(persons);
  } catch (err) {
    next(err);
  }
});

router.get("/info", async (req, res) => {
  try {
    let persons = await Person.find();

    res.status(200).send(`
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    </div>
  `);
  } catch (err) {
    next(err);
  }
});

router.get("/api/persons/:id", async (req, res) => {
  try {
    let persons = await Person.find();

    const requestedId = req.params["id"];
    const requestedPerson = persons.find(
      (person) => String(person._id) === String(requestedId)
    );

    if (requestedPerson) {
      res.status(200).json(requestedPerson);
    } else {
      res.status(404).json({ error: "No data found." });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/api/persons/:id", async (req, res) => {
  try {
    const requestedId = req.params["id"];
    const response = await Person.findByIdAndDelete(requestedId);

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/api/persons", async (req, res) => {
  try {
    let persons = await Person.find();
    const { name, number, id } = req.body;
    const checkExistingPerson = persons.find((person) => person.name === name);

    if (!name || !number) {
      return res.status(404).json({ error: "Name or number missing." });
    }

    if (name.length < 3) {
      return res
        .status(404)
        .json({ error: "Name must be at least 3 characters long." });
    }

    if (number.length < 8) {
      return res
        .status(404)
        .json({ error: "Number must be at least 8 characters long." });
    }

    const regex = /^\d{2,3}-\d+$/;
    if (!regex.test(number)) {
      return res.status(404).json({error: "Number format is invalid"})
    }

    if (checkExistingPerson) {
      return res.status(404).json({ error: "Person already exists." });
    }

    const person = new Person({
      name,
      number,
    });

    const response = await person.save();

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.put("/api/persons/:id", async (req, res) => {
  try {
    const requestedId = req.params["id"];
    const { name, number, id } = req.body;

    const person = {
      name,
      number,
      id,
    };

    const response = await Person.findByIdAndUpdate(requestedId, person);

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
