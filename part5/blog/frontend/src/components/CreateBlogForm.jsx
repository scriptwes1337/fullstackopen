import React from "react";

export const CreateBlogForm = ({
  onCreateBlog,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) => {
  return (
    <div>
      <h2>Create New Blog</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreateBlog();
        }}
      >
        <div>
          <label htmlFor="title">Title</label>

          <input
            data-testid="blogTitle"
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            data-testid="blogAuthor"
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input
            data-testid="blogUrl"
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" data-testid="createNewBlogButton">
          Create
        </button>
      </form>
    </div>
  );
};
