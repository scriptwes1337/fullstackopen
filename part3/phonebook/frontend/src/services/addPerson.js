import axios from "axios";

const addPerson = (link, newPerson) => {
    return axios
      .post(link, newPerson)
};

export { addPerson };
