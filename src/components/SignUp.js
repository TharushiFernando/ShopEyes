import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/user/register', formData);
      console.log(response.data);

      Swal.fire({
        icon: 'success',
        title: 'Signup Successful!',
        confirmButtonText: 'OK',
      }).then(() => navigate('/signin')); // ✅ Redirect to login after confirmation

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed!',
        text: 'Please try again.',
      });
    }
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    fontFamily: 'Arial, sans-serif'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9'
  };

  const inputStyle = {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#0077cc',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
