import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Blog = ({ blog }) => {
  const [blogData, setBlogData] = useState(blog);

  useEffect(() => {
    setBlogData(blog);
  }, [blog]);

  return (
      <Link to={`/blogs/${blogData.id}`} className="text-light">{blogData.title}</Link>
  );
};

export default Blog;
