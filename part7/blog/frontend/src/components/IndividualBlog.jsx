import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";

export const IndividualBlog = ({ handleLike, user, deleteBlog }) => {
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      navigate("/");
    } catch (err) {
      console.log("Delete unsuccessful", err.message);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/blogs/${id}/comments`, {
        comment: e.target.comment.value,
      });
      const updatedBlogData = { ...blogData };
      updatedBlogData.comments = [
        ...updatedBlogData.comments,
        e.target.comment.value,
      ];
      setBlogData(updatedBlogData);
      e.target.comment.value = "";
    } catch (err) {
      dispatch(setNotification(err.message));
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
          <p>
            {blogData.likes} likes{" "}
            <Button variant="primary" onClick={handleLikeClick}>
              like
            </Button>
          </p>
          <p>added by {blogData.user.username}</p>
          {blogData.user.username === user.username ? (
            <div>
              <Button variant="danger" data-testid="deleteBtn" onClick={handleDelete}>
                delete
              </Button>
            </div>
          ) : null}
          <strong>comments</strong>
          <Form onSubmit={handleComment}>
            <Form.Control type="text" name="comment"></Form.Control>
            <Button variant="primary" className="m-1" type="submit">add comment</Button>
          </Form>

          <ul>
            {blogData.comments.map((comment) => {
              return <li key={comment}>{comment}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IndividualBlog;
