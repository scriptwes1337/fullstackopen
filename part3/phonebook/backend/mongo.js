const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const connectMongo = async (password) => {
  await mongoose.connect(
    `mongodb+srv://admin:${password}@cluster0.u1fmcje.mongodb.net/fso-part3?retryWrites=true&w=majority&appName=Cluster0`
  );
  await console.log("Connected to MongoDB :)");
};

const addPerson = async (name, number) => {
  const person = new Person({
    name,
    number,
  });

  await person.save();
  await console.log(`Added ${name} number ${number} to phonebook`);
};

const retrieveAllPersons = async () => {
  return await Person.find();
};

const closeConnection = () => {
  mongoose.connection.close();
};

const main = async () => {
  // If password, name and number entered, add as entry into phonebook
  if (process.argv.length === 5) {
    try {
      const password = process.argv[2];
      const name = process.argv[3];
      const number = process.argv[4];

      await connectMongo(password);
      await addPerson(name, number);
      closeConnection();
    } catch (err) {
      console.error("Failed!", err);
    }
  }

  // If only password entered, then display all phonebook entries in DB
  if (process.argv.length === 3) {
    try {
      const password = process.argv[2];
      await connectMongo(password);
      const data = await retrieveAllPersons();
      console.log(data);
      closeConnection();
    } catch (err) {
      console.error("Failed!", err);
    }
  }
};

main()