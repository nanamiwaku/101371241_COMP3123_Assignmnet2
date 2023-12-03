import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:8089/api/v1/emp/employees/';

const ViewEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${API_URL}${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  // Check if employee data is loaded
  if (!employee) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    // Remove the token or user data from storage
    localStorage.removeItem('userToken'); // Adjust this according to your token storage method

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="employee-details-container">
    
      <div className="employee-details-heading">
        <h4>Employee Management System</h4>
      </div>
      <div className='employee-details'>
        <h3>First Name: {employee.firstname}</h3>
        <h3>Last Name: {employee.lastname}</h3>
        <h3>Email: {employee.email}</h3>
        <h3>Gender: {employee.gender}</h3>
        <h3>Salary: ${employee.salary}</h3>
      </div>
      <div className='employee-actions'>
        <Link to={`/dashboard`} className='btn btn-info'>Dashboard</Link>
        <Link to={`/dashboard/edit-employee/${employee._id}`} className='btn btn-info'>Update</Link>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ViewEmployee;
