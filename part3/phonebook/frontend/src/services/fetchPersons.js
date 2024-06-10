import axios from "axios";

const fetchPersons = (link) => {
  return axios.get(link);
}

export {fetchPersons}