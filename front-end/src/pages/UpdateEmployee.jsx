import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:8089/api/v1/emp/employees/';

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    salary: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}${id}`, employee);
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleLogout = () => {
    // Remove the token or user data from storage
    localStorage.removeItem('userToken'); // Adjust this according to your token storage method

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="employee-details-container">
      <div className="employee-details-heading">
        <h4>Update Employee</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='employee-details'>
          <div>
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={employee.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={employee.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={employee.gender}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="salary">Salary:</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={employee.salary}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='employee-actions'>
          <button type="submit" className='btn btn-success'>Update</button>
          <Link to={`/dashboard`} className='btn btn-info'>Cancel</Link>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
