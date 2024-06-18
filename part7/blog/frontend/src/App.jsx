import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/users";
import { LoginForm } from "./components/LoginForm";
import { CreateBlog } from "./components/CreateBlog";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  const notifySuccess = (message) => {
    setSuccessMsg(message);
    setTimeout(() => {
      setSuccessMsg("");
    }, 5000);
  };

  const notifyError = (message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    });

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      setIsAuth(true);
      setUser(currentUser);
    }
  }, []);

  const handleUsername = (e) => {
    setUsernameInput(e.target.value);
  };

  const handlePassword = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await userService.login(usernameInput, passwordInput);

      const { name, username, token } = response.data;

      if (!token) {
        return notifyError("Incorrect username or password");
      }

      const newUser = {
        name,
        username,
        token,
      };
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setIsAuth(true);
      notifySuccess("Logged in successfully!");
    } catch (err) {
      if (err.response.status === 401) {
        notifyError("Incorrect username or password");
      } else {
        notifyError(`An error occurred during login: ${err.message}`);
      }
    }
  };

  const handleLogout = (e) => {
    localStorage.clear();
    setIsAuth(false);
    notifySuccess("Logged out successfully.");
  };

  const handleCreateBlog = async () => {
    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const response = await blogService.createBlog(newBlog, user.token);
      const createdBlog = response.data[0];
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      notifySuccess(
        `a new blog ${response.data[0].title} by ${response.data[0].author} added`,
      );
      setShowNewBlogForm(false);
    } catch (err) {
      notifyError(`Error creating blog: ${err.message}`);
    }
  };

  const handleShowNewBlogForm = () => {
    setShowNewBlogForm(!showNewBlogForm);
  };

  const handleDeleteBlog = async (id) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog.id !== id));
      notifySuccess("Blog deleted successfully.");
    } catch (err) {
      console.log("Delete unsuccessful", err.message);
      notifyError("Error deleting blog: " + err.message);
    }
  };

  const handleLike = async (id) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === id);
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
      await axios.put(`/api/blogs/${id}`, updatedBlog);
      setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)));
    } catch (error) {
      console.error("Like unsuccessful", error.message);
    }
  };

  return (
    <div>
      {" "}
      {successMsg === "" ? null : (
        <p
          style={{
            color: "green",
            fontSize: "1.5rem",
            backgroundColor: "lightgrey",
            padding: "0.8rem",
            border: "2px green solid",
            borderRadius: "10px",
          }}
          data-testid="successMsg"
        >
          {successMsg}
        </p>
      )}
      {errorMsg === "" ? null : (
        <p
          style={{
            color: "green",
            fontSize: "1.5rem",
            backgroundColor: "lightgrey",
            padding: "0.8rem",
            border: "2px green solid",
            borderRadius: "10px",
          }}
          data-testid="errorMsg"
        >
          {errorMsg}
        </p>
      )}
      {isAuth ? (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} is logged in
            <button onClick={handleLogout} data-testid="logoutBtn">
              logout
            </button>
          </p>
          {showNewBlogForm ? (
            <CreateBlog
              title={title}
              author={author}
              url={url}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
              handleCreateBlog={handleCreateBlog}
            >
              <button onClick={handleShowNewBlogForm}>cancel</button>
            </CreateBlog>
          ) : (
            <button onClick={handleShowNewBlogForm} data-testid="newBlogBtn">
              new blog
            </button>
          )}
          {blogs.map((blog) =>
            blog ? (
              <Blog
                key={blog.id}
                blog={blog}
                deleteBlog={handleDeleteBlog}
                user={user}
                handleLike={handleLike}
              />
            ) : null,
          )}
        </>
      ) : (
        <LoginForm
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
