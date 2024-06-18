import React from "react";
import { Button, Form } from "react-bootstrap";

export const CreateBlog = ({
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  handleCreateBlog,
  children,
}) => {
  return (
    <>
      <h2>create new</h2>
      <Form
        data-testid="create-blog-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateBlog({ title, author, url });
        }}
      >
        <Form.Group>
          <Form.Label htmlFor="createBlogTitleInput">title:</Form.Label>
          <Form.Control
            type="text"
            name="createBlogTitleInput"
            id="createBlogTitleInput"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            data-testid="newBlogTitleInput"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="createBlogAuthorInput">author:</Form.Label>
          <Form.Control
            type="text"
            name="createBlogAuthorInput"
            id="createBlogAuthorInput"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            data-testid="newBlogAuthorInput"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="createBlogUrlInput">url:</Form.Label>
          <Form.Control
            type="text"
            name="createBlogUrlInput"
            id="createBlogUrlInput"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            data-testid="newBlogUrlInput"
          />
        </Form.Group>
        <Form.Group>
          <Button variant="primary" className="m-1" type="submit" data-testid="newBlogCreateBtn">
            create
          </Button>
        </Form.Group>
        {children}
      </Form>
    </>
  );
};
