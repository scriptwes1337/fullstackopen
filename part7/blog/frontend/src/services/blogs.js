import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (blog, token) => {
  const request = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return request;
};

export default { getAll, createBlog };
