import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS_NO_GENRE } from "./queries";
import { Login } from "./components/Login";
import { Recommendations } from "./components/Recommendations";

const App = () => {
  const allAuthors = useQuery(ALL_AUTHORS);
  const [page, setPage] = useState("authors");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fetchBooks = useQuery(ALL_BOOKS_NO_GENRE);

  let localToken;
  let books;

  if (fetchBooks.data) {
    books = fetchBooks.data.allBooks;
  }

  useEffect(() => {
    localToken = localStorage.getItem("token");

    if (!localToken) {
      setIsLoggedIn(false);
    }

    if (localToken) {
      setIsLoggedIn(true);
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
        {isLoggedIn ? (
          <button onClick={() => setPage("recommendations")}>
            recommendations
          </button>
        ) : null}
      </div>

      {allAuthors.loading ? (
        <div>loading...</div>
      ) : (
        <Authors show={page === "authors"} allAuthors={allAuthors} />
      )}

      <Books show={page === "books"} books={books} />

      <NewBook show={page === "add"} />

      <Login
        show={page === "login"}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Recommendations show={page === "recommendations"} books={books} />
    </div>
  );
};

export default App;
