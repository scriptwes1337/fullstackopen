import axios from "axios";
import React, { useState } from "react";
import PropTypes from "prop-types";

export const Blog = ({ blog, deleteBlog, user, handleLike }) => {
  const [blogData, setBlogData] = useState(blog);
  const [viewBlog, setViewBlog] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("view");

  const handleView = () => {
    setViewBlog(!viewBlog);
    if (viewBlog) {
      setButtonLabel("show");
    } else if (!viewBlog) {
      setButtonLabel("hide");
    }
  };

  const handleLikeClick = async () => {
    try {
      await handleLike(blogData.id);
      setBlogData({ ...blogData, likes: blogData.likes + 1 });
    } catch (err) {
      console.log("Like unsuccessful", err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(blogData.id);
    } catch (err) {
      console.log("Delete unsuccessful", err.message);
    }
  };

  return (
    <div>
      {viewBlog ? (
        <div style={{ border: "1px solid black" }} data-testId="blogDetails">
          <p>
            Title: {blogData.title}{" "}
            <button onClick={handleView}>{buttonLabel}</button>
          </p>{" "}
          <p>Url: {blogData.url}</p>
          <p>
            <span data-testid="likeCount">Likes: {blogData.likes}</span>
            <button onClick={handleLikeClick} data-testid="likeBtn">like</button>
          </p>
          <p>Author: {blogData.author}</p>
          {blog.user.username === user.username ? (
            <button onClick={handleDelete}>delete</button>
          ) : null}
        </div>
      ) : (
        <div data-testid="blogEntry">
          <span>{blogData.title}</span> <span>{blogData.author}</span>
          <button onClick={handleView} data-testId="toggleBlogDetailsBtn">{buttonLabel}</button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
