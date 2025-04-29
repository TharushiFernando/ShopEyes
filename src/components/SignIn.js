import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await axios.post('http://localhost:8070/user/login', formData);

      // Save user data in localStorage
      localStorage.setItem("NAME", response.data.user.username);
      localStorage.setItem("EMAIL", response.data.user.email);

      // 🔔 Trigger a custom event to notify the header
      window.dispatchEvent(new Event("loginSuccess"));

      // Show success alert and navigate
      Swal.fire({
        icon: "success",
        title: "Login Successfully!",
        confirmButtonText: "OK",
      }).then(() => navigate("/item"));

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong! Try Again",
        confirmButtonText: "OK",
      });
      console.error(error);
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

  const signUpPromptStyle = {
    marginTop: '1rem',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Sign In</button>

        <div style={signUpPromptStyle}>
          <span>Don't have an account? </span>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            style={{
              ...buttonStyle,
              backgroundColor: '#28a745',
              marginTop: '0.5rem'
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
