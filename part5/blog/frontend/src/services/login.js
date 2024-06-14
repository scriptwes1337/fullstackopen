import axios from "axios";
const baseUrl = "/api/login";

const login = async (username, password) => {
  const loginUserData = {
    username: username,
    password: password,
  };

  const response = await axios.post(baseUrl, loginUserData);
  return response.data;
};

export default { login };
