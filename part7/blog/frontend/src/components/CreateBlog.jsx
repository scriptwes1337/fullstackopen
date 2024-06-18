import React from "react";

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
      <form
        data-testid="create-blog-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateBlog({ title, author, url });
        }}
      >
        <div>
          <label htmlFor="createBlogTitleInput">title:</label>
          <input
            type="text"
            name="createBlogTitleInput"
            id="createBlogTitleInput"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            data-testid="newBlogTitleInput"
          />
        </div>
        <div>
          <label htmlFor="createBlogAuthorInput">author:</label>
          <input
            type="text"
            name="createBlogAuthorInput"
            id="createBlogAuthorInput"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            data-testid="newBlogAuthorInput"
          />
        </div>
        <div>
          <label htmlFor="createBlogUrlInput">url:</label>
          <input
            type="text"
            name="createBlogUrlInput"
            id="createBlogUrlInput"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            data-testid="newBlogUrlInput"
          />
        </div>
        <div>
          <button type="submit" data-testid="newBlogCreateBtn">
            create
          </button>
        </div>
        {children}
      </form>
    </>
  );
};
