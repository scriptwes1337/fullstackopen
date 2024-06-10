import axios from "axios";

const updatePerson = (link, updatedPerson) => {
  return axios.put(link, updatedPerson);
};

export { updatePerson };
