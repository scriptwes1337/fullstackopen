import axios from "axios";
import React, { useState } from "react";

export const Blog = ({ blog }) => {
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

  const handleLike = async () => {
    try {
     blogData.likes += 1
      await axios.put(`/api/blogs/${blogData.id}`, blogData);
      setBlogData({...blogData});
    } catch (err) {
      console.log("Like unsuccessful", err.message);
    }
  };

  return (
    <div>
      {viewBlog ? (
        <div style={{ border: "1px solid black" }}>
          <p>
            Title: {blogData.title}{" "}
            <button onClick={handleView}>{buttonLabel}</button>
          </p>{" "}
          <p>Url: {blogData.url}</p>
          <p>
            Likes: {blogData.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>Author: {blogData.author}</p>
        </div>
      ) : (
        <div>
          {blogData.title} {blogData.author}
          <button onClick={handleView}>{buttonLabel}</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
