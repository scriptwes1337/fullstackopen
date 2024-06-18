import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Blog = ({ blog }) => {
  const [blogData, setBlogData] = useState(blog);

  useEffect(() => {
    setBlogData(blog);
  }, [blog]);

  const style = {
    padding: "5px",
    border: "1px solid black"
  };

  return (
    <div>
      <p style={style}><Link to={`/blogs/${blogData.id}`}>{blogData.title}</Link></p>
    </div>
  );
};

export default Blog;
