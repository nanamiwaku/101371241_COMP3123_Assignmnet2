import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
/*import './style.css'*/

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8089/api/v1/user/signup', values);
      if (response.data.status) {
        localStorage.setItem("valid", true);
        navigate('/dashboard');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <div className="container mt-5">
      <form className="col-md-6 offset-md-3" onSubmit={handleSignup}>
        <h2 className="mb-4">Sign Up</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={values.username}
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
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>

        {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}

        <div className="mt-3">
          <p>Already have an account? <Link to="/">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
