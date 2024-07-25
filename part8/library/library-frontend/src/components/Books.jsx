import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS_BY_GENRE } from "../queries";

const Books = ({ show, books }) => {
  if (!show) {
    return null;
  }

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [displayBooks, setDisplayBooks] = useState(books);

  const fetchBooksByGenre = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre,
  });

  const findAllGenres = () => {
    const allGenres = [];
    books.forEach((book) => {
      book.genres.forEach((genre) => {
        if (!allGenres.includes(genre)) {
          allGenres.push(genre);
        }
      });
    });
    setGenres(allGenres);
  };

  const handleGenreSelect = async (genre) => {
    setSelectedGenre(genre);
  };

  useEffect(() => {
    findAllGenres();
  }, [show]);

  useEffect(() => {
    if (selectedGenre !== null) {
      if (fetchBooksByGenre.data) {
        setDisplayBooks(fetchBooksByGenre.data.allBooks);
      }
    } else {
        setDisplayBooks(books);
    }
  }, [fetchBooksByGenre]);

  return (
    <div>
      <h2>books</h2>
      {selectedGenre ? <p>in genre {selectedGenre}</p> : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {displayBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => handleGenreSelect(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => handleGenreSelect(null)}>all genres</button>
    </div>
  );
};

export default Books;
