import axios from "axios";
const personsLink = "http://localhost:3001/persons";

const deletePerson = (link, id) => {
  return axios.delete(`${link}/${id}`);
};

export { deletePerson };
