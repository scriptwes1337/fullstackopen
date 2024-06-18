import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const IndividualBlog = ({ handleLike, user, deleteBlog }) => {
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/blogs/${id}`).then((res) => setBlogData(res.data));
  }, [id]);

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
      {blogData === null ? (
        <div>no data yet...</div>
      ) : (
        <div>
          <h1>{blogData.title}</h1>
          <a href={blogData.url}>{blogData.url}</a>
          <p>{blogData.likes} likes <button onClick={handleLikeClick}>like</button></p>
          <p>added by {blogData.user.username}</p>
          {blogData.user.username === user.username ? (
            <div>
              <button data-testid="deleteBtn" onClick={handleDelete}>
                delete
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default IndividualBlog;
