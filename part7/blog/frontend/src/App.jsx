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
import { setUser } from "./reducers/userReducer";
import { Route, Routes, Link } from "react-router-dom";
import { Users } from "./components/Users";
import { User } from "./components/User";
import IndividualBlog from "./components/IndividualBlog";
import { Alert, Button, Navbar, Container, Row, Table } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      setIsAuth(true);
      dispatch(setUser(currentUser));
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
      dispatch(setUser(newUser));
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

  const padding = {
    paddingRight: "10px",
  };

  return (
    <div className="container">
      {notification === "" ? null : (
        <Alert variant="dark" data-testid="notification">
          {notification}
        </Alert>
      )}
      {user.username ? (
        <Navbar className="bg-dark px-5">
          <Container>
            <Row className="d-flex w-100 text-center">
              <div className="col-3">
                <Link to="/" style={padding} className="text-light">
                  blogs
                </Link>
              </div>
              <div className="col-3">
                <Link to="/users" style={padding} className="text-light">
                  users
                </Link>
              </div>
              <div class="col-3">
                <span style={padding} className="text-light">
                  {user.name} is logged in
                </span>
              </div>
              <div class="col-3">
                <Button
                  onClick={handleLogout}
                  style={padding}
                  variant="light"
                  data-testid="logoutBtn"
                >
                  logout
                </Button>
              </div>
            </Row>
          </Container>
        </Navbar>
      ) : null}
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <IndividualBlog
              deleteBlog={handleDeleteBlog}
              user={user}
              handleLike={handleLike}
            />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/"
          element={
            isAuth ? (
              <>
                <h2>blogs</h2>
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
                    <Button
                      variant="danger"
                      className="m-1"
                      onClick={handleShowNewBlogForm}
                    >
                      cancel
                    </Button>
                  </CreateBlog>
                ) : (
                  <Button
                    variant="primary"
                    className="my-2"
                    onClick={handleShowNewBlogForm}
                    data-testid="newBlogBtn"
                  >
                    new blog
                  </Button>
                )}
                <Table striped bordered variant="dark">
                  <tbody>
                    {blogs.map((blog) =>
                      blog ? (
                        <tr>
                          <td>
                            <Blog key={blog.id} blog={blog} />{" "}
                          </td>
                        </tr>
                      ) : null,
                    )}
                  </tbody>
                </Table>
              </>
            ) : (
              <LoginForm
                handleUsername={handleUsername}
                handlePassword={handlePassword}
                handleLogin={handleLogin}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
