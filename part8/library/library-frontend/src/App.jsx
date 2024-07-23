import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS_NO_GENRE } from "./queries";
import { Login } from "./components/Login";

const App = () => {
  const allAuthors = useQuery(ALL_AUTHORS);
  const allBooksNoGenre = useQuery(ALL_BOOKS_NO_GENRE);
  const [page, setPage] = useState("authors");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (!localToken) {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        {isLoggedIn ? (
          <button onClick={() => setPage("books")}>books</button>
        ) : null}
        <button onClick={() => setPage("add")}>add book</button>
        {isLoggedIn ? (
          <button onClick={() => handleLogout()}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      {allAuthors.loading ? (
        <div>loading...</div>
      ) : (
        <Authors show={page === "authors"} allAuthors={allAuthors} />
      )}

      {allBooksNoGenre.loading ? (
        <div>loading...</div>
      ) : (
        <Books show={page === "books"} allBooksNoGenre={allBooksNoGenre} />
      )}

      <NewBook show={page === "add"} />

      <Login
        show={page === "login"}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default App;
