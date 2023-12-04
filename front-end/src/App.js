import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './pages/style.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import ViewEmployee from './pages/ViewEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Use PrivateRoute as a wrapper for the protected route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/view/:id" element={<ViewEmployee />} />
          <Route path="/edit/:id" element={<UpdateEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
