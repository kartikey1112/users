import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersTable from "./Screens/Home";
import UserForm from "./Screens/Users";
import { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000");
      const userList = await response.json();
      setUsers(userList);
    } catch (err) {
      setError("Unable to get users from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route  path="/" element={<UsersTable users={users} loading={loading} error={error} />}/>
        <Route  path="/users" element={ <UserForm users={users} setUsers={setUsers}/>}/>
    
      </Routes>
    </Router>
  );
};

export default App;
