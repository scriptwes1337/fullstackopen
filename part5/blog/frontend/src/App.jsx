import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/users";
import { LoginForm } from "./components/LoginForm";
import { CreateBlog } from "./components/CreateBlog";

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
    blogService.getAll().then((blogs) => setBlogs(blogs));

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

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleCreateBlog = async () => {
    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const response = await blogService.createBlog(newBlog, user.token);
      setBlogs([...blogs, response.data[0]]);
      notifySuccess(
        `a new blog ${response.data[0].title} by ${response.data[0].author} added`
      );
      setShowNewBlogForm(false);
    } catch (err) {
      notifyError(`Error creating blog: ${err.message}`);
    }
  };

  const handleshowNewBlogForm = () => {
    setShowNewBlogForm(!showNewBlogForm);
  };

  return (
    <div>
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
        >
          {errorMsg}
        </p>
      )}
      {isAuth ? (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} is logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {showNewBlogForm ? (
            <CreateBlog
              handleTitle={handleTitle}
              handleAuthor={handleAuthor}
              handleUrl={handleUrl}
              handleCreateBlog={handleCreateBlog}
            >
              <button onClick={handleshowNewBlogForm}>cancel</button>
            </CreateBlog>
          ) : (
            <button onClick={handleshowNewBlogForm}>new blog</button>
          )}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}{" "}
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
