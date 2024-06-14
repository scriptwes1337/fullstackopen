import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { LoginForm } from "./components/LoginForm";
import loginService from "./services/login";
import { CreateBlogForm } from "./components/CreateBlogForm";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [refreshEffect, setRefreshEffect] = useState(1);
  const [notification, setNotification] = useState("");
  const [showCreateBlog, setShowCreateBlog] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      blogService.getAll().then((blogs) => {
        // Sort the blogs by likes in descending order
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedBlogs);
      });
    }
  }, [isLoggedIn, refreshEffect]);

  const handleLogin = async () => {
    try {
      const user = await loginService.login(username, password);
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      localStorage.setItem("token", user.token);
      setNotification("SUCCESS login");
    } catch (error) {
      console.error("Login failed", error);
      setNotification("FAILED login");
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setNotification("SUCCESS logout");
    } catch (error) {
      console.error("FAILED logout", error);
      setNotification("FAILED logout");
    }
  };

  const handleCreateBlog = async () => {
    try {
      await blogService.createBlog(title, author, url);
      setTitle("");
      setAuthor("");
      setUrl("");
      setRefreshEffect((prevState) => prevState + 1);
      setNotification("SUCCESS create new blog");
      setShowCreateBlog(false);
    } catch (error) {
      console.error("FAILED create new blog", error);
      setNotification("FAILED create new blog");
    }
  };

  const handleShowCreateBlog = () => {
    setShowCreateBlog(true);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      try {
        await axios.delete(`/api/blogs/${blog._id}`);
        setNotification("SUCCESS delete blog");
        setRefreshEffect((prevState) => prevState + 1);
      } catch (error) {
        console.error("FAILED delete blog", error);
        setNotification("FAILED delete blog");
      }
    }
  };

  const handleLike = async (blog) => {
    blog.likes += 1;
    setRefreshEffect((prevState) => prevState + 1);

    const response = await axios.put(`/api/blogs/${blog._id}`, blog);

    return response.data;
  };

  return (
    <div>
      <p data-testid="notificationMessage">{notification}</p>
      {isLoggedIn ? (
        <div>
          <h2>blogs</h2>
          {showCreateBlog ? (
            <CreateBlogForm
              onCreateBlog={handleCreateBlog}
              title={title}
              author={author}
              url={url}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
            />
          ) : (
            <button onClick={handleShowCreateBlog}>New Blog</button>
          )}

          {blogs.map((blog) => (
            <Blog
              key={blog._id}
              blog={blog}
              onDelete={() => handleDelete(blog)}
              onLike={() => handleLike(blog)}
            />
          ))}
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <LoginForm
          onLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default App;
