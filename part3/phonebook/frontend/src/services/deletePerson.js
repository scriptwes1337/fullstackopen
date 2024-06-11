import axios from "axios";

const deletePerson = (link, id) => {
  return axios.delete(`${link}/${id}`);
};

export { deletePerson };
