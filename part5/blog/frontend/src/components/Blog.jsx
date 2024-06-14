import React, { useState } from "react";

export const Blog = ({ blog }) => {
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

  return (
    <div>
      {viewBlog ? (
        <div style={{ border: "1px solid black" }}>
          <p>
            Title: {blog.title}{" "}
            <button onClick={handleView}>{buttonLabel}</button>
          </p>{" "}
          <p>Url: {blog.url}</p> 
          <p>Likes: {blog.likes}</p>{" "}
          <p>Author: {blog.author}</p>
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <button onClick={handleView}>{buttonLabel}</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
