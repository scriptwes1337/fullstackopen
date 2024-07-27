import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS_NO_GENRE = gql`
  query {
    allBooks {
      _id
      author {
        _id
        bookCount
        born
        name
      }
      genres
      published
      title
    }
  }
`;

export const ALL_BOOKS_BY_GENRE = gql`
  query Author($genre: String) {
    allBooks(genre: $genre) {
      author {
        _id
        bookCount
        born
        name
      }
      _id
      genres
      published
      title
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation AddBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
    $token: String!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
      token: $token
    ) {
      _id
      author {
        name
        _id
        born
        bookCount
      }
      genres
      published
      title
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!, $token: String!) {
    editAuthor(name: $name, setBornTo: $setBornTo, token: $token) {
      _id
      bookCount
      born
      name
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query Me($token: String!) {
    me(token: $token) {
      favoriteGenre
      id
      username
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      title
      published
      author {
        name
        _id
        born
        bookCount
      }
      _id
      genres
    }
  }
`;