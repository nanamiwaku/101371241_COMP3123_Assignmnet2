import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    salary: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8089/api/v1/emp/employees', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding employee:', error);
      setErrorMessage(error.response?.data?.error || 'An error occurred during employee addition');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Employee</h2>
      <form className="col-md-6" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender:</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary:</label>
          <input
            type="number"
            className="form-control"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Employee</button>

        {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddEmployee;
