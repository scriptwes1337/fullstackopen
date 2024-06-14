import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (title, author, url) => {
  const newBlog = {
    title: title,
    author: author,
    url: url,
  };

  const response = await axios.post(baseUrl, newBlog);
  return response.data;
};

export default { getAll, createBlog };
