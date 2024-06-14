import React from "react";

export const CreateBlog = ({
  handleTitle,
  handleAuthor,
  handleUrl,
  handleCreateBlog,
  children,
}) => {
  return (
    <>
      <h2>create new</h2>
      <div>
        <label htmlFor="createBlogTitleInput">title:</label>
        <input
          type="text"
          name="createBlogTitleInput"
          id="createBlogTitleInput"
          onChange={handleTitle}
        />
      </div>
      <div>
        <label htmlFor="createBlogAuthorInput">author:</label>
        <input
          type="text"
          name="createBlogAuthorInput"
          id="createBlogAuthorInput"
          onChange={handleAuthor}
        />
      </div>
      <div>
        <label htmlFor="createBlogUrlInput">url:</label>
        <input
          type="text"
          name="createBlogUrlInput"
          id="createBlogUrlInput"
          onChange={handleUrl}
        />
      </div>
      <div>
        <button onClick={handleCreateBlog}>create</button>
      </div>
      {children}
    </>
  );
};
