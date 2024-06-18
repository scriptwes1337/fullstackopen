import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/users";
import { LoginForm } from "./components/LoginForm";
import { CreateBlog } from "./components/CreateBlog";
import axios from "axios";
import { setNotification } from "./reducers/notificationReducer";
import { deleteBlog, initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());

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
        return dispatch(setNotification("Wrong username or password", 5));
      }

      const newUser = {
        name,
        username,
        token,
      };
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setIsAuth(true);
      dispatch(setNotification("Logged in successfully!", 5));
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(setNotification("Incorrect username or password", 5));
      } else {
        dispatch(
          setNotification(`An error occurred during login: ${err.message}`, 5),
        );
      }
    }
  };

  const handleLogout = (e) => {
    localStorage.clear();
    setIsAuth(false);
    dispatch(setNotification("Logged out successfully.", 5));
  };

  const handleCreateBlog = async () => {
    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const response = await blogService.createBlog(newBlog, user.token);
      dispatch(initializeBlogs());
      dispatch(
        setNotification(
          `a new blog ${response.data[0].title} by ${response.data[0].author} added`,
          5,
        ),
      );
      setShowNewBlogForm(false);
    } catch (err) {
      dispatch(setNotification(`Error creating blog: ${err.message}`, 5));
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
      dispatch(deleteBlog(id));
      dispatch(setNotification("Blog deleted successfully.", 5));
    } catch (err) {
      console.log("Delete unsuccessful", err.message);
      dispatch(setNotification("Error deleting blog: " + err.message, 5));
    }
  };

  const handleLike = async (id) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === id);
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
        user: blogToUpdate.user.id,
      };
      await axios.put(`/api/blogs/${id}`, updatedBlog);
      dispatch(initializeBlogs());
    } catch (error) {
      console.error("Like unsuccessful", error.message);
    }
  };

  return (
    <div>
      {notification === "" ? null : (
        <p
          style={{
            color: "grey",
            fontSize: "1.5rem",
            backgroundColor: "lightgrey",
            padding: "0.8rem",
            border: "2px grey solid",
            borderRadius: "10px",
          }}
          data-testid="notification"
        >
          {notification}
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
