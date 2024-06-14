import axios from "axios";
const baseUrl = "/api/signup";

const signup = (username, name, password) => {
  const newUserData = {
    username: username,
    name: name,
    password: password,
  };

  const request = axios.post(baseUrl, newUserData);
  return request.then((response) => response.data);
};

export default { signup };
