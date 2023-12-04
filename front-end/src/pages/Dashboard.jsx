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

 /*
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8089/api/v1/emp/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  */

  const fetchData = () => {
      axios.get('http://localhost:8089/api/v1/emp/employees')
      .then(response =>{
        setEmployees(response.data);
      })
      .catch(error => {
      console.error('Error fetching employee data:', error);
      });
  };

  const handleDelete = async (id) => {
      await axios.delete(`http://localhost:8089/api/v1/emp/employees/${id}`)
      .then(() =>{
        setEmployees((employees.filter(employee => employee._id !== id)));
      })
      .catch (error => {
        console.error('There was an error deleting the employee:', error);
        // You might want to display an error message to the user here
      });
  };
  

  const handleLogout = () => {
    // Remove the token or user data from storage
    localStorage.removeItem('userToken'); // Adjust this according to your token storage method

    // Redirect to the login page
    navigate('/');
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
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
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
                    <Link to={`/view/${employee._id}`} className="btn btn-info btn-sm mx-1">
                      View
                    </Link>
                    <Link to={`/edit/${employee._id}`} className="btn btn-warning btn-sm mx-1">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="btn btn-danger btn-sm mx-1">Delete
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
