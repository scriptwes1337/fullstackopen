import PropTypes from "prop-types";
import React, { useState } from "react";

const Blog = ({ blog, onDelete, onLike }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  return (
    <div style={blogStyle} data-testid="existingBlog">
      <div>
        {blog.title}
        <button onClick={toggleDetails} data-testid="existingBlogViewButton">
          {detailsVisible ? "hide" : "view"}
        </button>
      </div>
      {detailsVisible ? (
        <div>
          <p>Author: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <p data-testid="existingBlogLikesCount">
            {blog.likes} likes{" "}
            <button onClick={onLike} data-testid="existingBlogLikeButton">
              like
            </button>
          </p>
          <button onClick={onDelete}>Delete</button>
        </div>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blog;
