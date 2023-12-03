import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './pages/style.css';
import Login from './pages/Login';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the login page at the root path */}
          <Route path="/" element={<Login />} />

          {/* Route for the signup page */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
