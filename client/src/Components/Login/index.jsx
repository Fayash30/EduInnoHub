import React, { useState } from 'react';
import "./login.css"; 
import { ToastContainer, toast } from "react-toastify";
import image from '../Main/assets/logo-removebg-preview.png';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCancel = () => {
    window.location.href = '/';
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });

    const data = await response.json()
    if (data.status === 'ok') {
      localStorage.setItem('token', data.user);
      window.location.href = '/';
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="login_container">
        <div className="login_form_container"> 
          <div className="left"> 
            <div className="form_container"> 
              <h1>Login</h1> 
              <form onSubmit={handleLogin} className="form">
                <div className="form-group-inline">
                  <label htmlFor="username">Email:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group-inline">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                    required
                  />
                </div>
                <div className="form-group-inline">
                  <button type="submit" className="green_btn">Login</button> 
                  <button onClick={handleCancel} type="button" className="white_btn">Cancel</button> 
                </div>
                <div className="form-group-inline">
                  <a href="/register" className="new-user">New User</a>
                  <span className="link-space"></span>
                  <a href="/forgot-password" className="forgot-password">Forgot Password</a>
                </div>
              </form>
            </div>
          </div>
          <div className="right"> 
            <h1>Welcome Back!</h1> 
            <div className="additional-info">
              <img src={image} alt="Your Image" className="image" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
    </>
  );
}

export default LoginForm;

