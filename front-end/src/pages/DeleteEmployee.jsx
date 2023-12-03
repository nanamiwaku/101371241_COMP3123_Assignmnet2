import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams(); // Assuming 'eid' is the URL parameter
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:8089/api/v1/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8089/api/v1/emp/employees/${id}`);
      // Redirect to the dashboard or any other page after deletion
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h2>Delete Employee</h2>
      {employee ? (
        <div>
          <p>Are you sure you want to delete the following employee?</p>
          <p>Name: {employee.firstname} {employee.lastname}</p>
          <p>Email: {employee.email}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DeleteEmployee;
