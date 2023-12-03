import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8089/api/v1/emp/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8089/api/v1/emp/employees/${id}`);
      // After deleting, fetch updated data
      fetchData();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <h2>Dashboard</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <Link to="/dashboard">Employee List</Link>
            </li>
            <li className="list-group-item">
              <Link to="/add-employee">Add Employee</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <h2>Employee List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstname}</td>
                  <td>{employee.lastname}</td>
                  <td>{employee.email}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Link to={`/view/${employee.id}`} className="btn btn-info btn-sm mx-1">
                      View
                    </Link>
                    <Link to={`/edit/${employee.id}`} className="btn btn-warning btn-sm mx-1">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="btn btn-danger btn-sm mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
