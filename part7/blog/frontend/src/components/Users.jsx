import axios from "axios";
import React, { useEffect, useState } from "react";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users/all").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
