import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users/all").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <Table variant="dark" striped bordered>
        <thead>
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <Link to={`/users/${user.id}`} className="text-light">{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
