import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS_NO_GENRE } from "./queries";

const App = () => {  
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooksNoGenre = useQuery(ALL_BOOKS_NO_GENRE)
  const [page, setPage] = useState("authors");

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
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
    </div>
  );
};

export default App;
