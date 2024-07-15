import { useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS_NO_GENRE, EDIT_AUTHOR } from "../queries";
import { useMutation } from "@apollo/client";

const Authors = (props) => {
  const { show, allAuthors } = props;

  if (!show) {
    return null;
  }

  const [birthYearName, setBirthYearName] = useState("");
  const [birthYearBorn, setBirthYearBorn] = useState("");


  const authors = allAuthors.data.allAuthors;

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.error("Error editing author:", error.message);
      alert(`Error creating book: ${error.message}`);
    },
    onCompleted: (data) => {
      console.log("Author edited successfully:", data);
    },
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS_NO_GENRE }],
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: birthYearName, setBornTo: birthYearBorn } });
    console.log("author edited...");
    
    setBirthYearName("");
    setBirthYearBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
        {/* hi */}
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="birthYearNameInput">name</label>
          <select
            type="text"
            name="birthYearNameInput"
            id="birthYearNameInput"
            onClick={({ target }) => setBirthYearName(target.value)}
          >
            <option disabled selected value>
              -- select an option --{" "}
            </option>
            {authors.map((author) => {
              return <option>{author.name}</option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="birthYearBornInput">born</label>
          <input
            type="number"
            name="birthYearBornInput"
            id="birthYearBornInput"
            value={birthYearBorn}
            onChange={({ target }) => setBirthYearBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
