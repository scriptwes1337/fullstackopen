import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const User = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/users/${id}`).then((res) => setUser(res.data));
  }, [id]);

  return (
    <div>
      {" "}
      {!user ? (
        <div>no data yet...</div>
      ) : (
        <div>
          {" "}
          <h1>{user.username}</h1>
          <b>added blogs</b>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
