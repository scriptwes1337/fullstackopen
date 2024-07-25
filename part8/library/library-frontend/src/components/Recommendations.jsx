import { useQuery } from "@apollo/client";
import React from "react";
import { ME } from "../queries";

export const Recommendations = ({ show, books }) => {
  if (!show) {
    return null;
  }

  const localToken = localStorage.getItem("token");

  const fetchCurrentUser = useQuery(ME, {
    variables: {
      token: localToken,
    },
  });
  let currentUser = null;
  if (fetchCurrentUser.loading) {
    return <div>Loading...</div>;
  }
  if (fetchCurrentUser.error) {
    return <div>Error: {fetchCurrentUser.error.message}</div>;
  }
  if (fetchCurrentUser.data) {
    currentUser = fetchCurrentUser.data.me;
  }

  const recommendedBooks = books.filter((book) =>
    book.genres
      .map((genre) => genre.toLowerCase())
      .includes(currentUser.favoriteGenre.toLowerCase())
  );

  return (
    <div>
      <p>Books in your favorite genre: {currentUser.favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
