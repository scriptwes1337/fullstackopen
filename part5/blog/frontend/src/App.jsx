import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/users";
import { LoginForm } from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState({});

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
    const response = await userService.login(usernameInput, passwordInput);

    const { name, username, token } = response.data;

    if (token) {
      const newUser = {
        name,
        username,
        token,
      };
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setIsAuth(true);
    }
  };

  const handleLogout = (e) => {
    localStorage.clear();
    setIsAuth(false);
  };

  return (
    <div>
      {isAuth ? (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} is logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
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
