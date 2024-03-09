import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import Header from  './Header'
import Footer from './Footer'
import "./UserProfile.css"
const ProfilePage = () => {
  
  const [user, setUser] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    user_name: '',
    phone_number: '',
    gender: '',
    course: '',
    college: ''
  });
  const [editing, setEditing] = useState(false);
  const token = localStorage.getItem('token');
  if(!token)
  {
    window.location.href='/';
  }
  
  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const courseResponse = await fetch('http://localhost:5000/getcourses');
      const collegeResponse = await fetch('http://localhost:5000/getcolleges');

      if (!courseResponse.ok || !collegeResponse.ok) {
        throw new Error('Failed to fetch options');
      }

      const courseData = await courseResponse.json();
      const collegeData = await collegeResponse.json();

      setCourseOptions(courseData.courses);
      setCollegeOptions(collegeData.colleges);
    } catch (error) {
      console.error('Error fetching options:', error);
    
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/getUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setUser(userData);
        setFormData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [token]);
  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://127.0.0.1:5000/api/updateUser/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast("Profile Updated Succesfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
        
        });
      setEditing(false); 
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    
    <>
    
    <Header/>
    <div className="profile-container">
      <h1>User Profile</h1>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group-inline">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          name = "name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
         
      <div className="form-group-inline">
        <label htmlFor="user_name">Username:</label>
        <input
          type="text"
          name="user_name"
          placeholder="Enter your username"
          value={formData.user_name}
          onChange={handleChange}
        />
      </div>
    
      <div className="form-group-inline">
        <label htmlFor="contactNo">Contact No:</label>
        <input
          type="tel"
          name="phone_number"
          placeholder="Enter your contact number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group-inline">
  <label>Gender:</label>
  <div>
    
    <label>
      <input
        type="radio"
        name="gender"
        value="Male"
        checked={formData.gender === 'Male'}
        onChange={handleChange}
      />
      Male
    </label>
    <label>
      <input
        type="radio"
        name="gender"
        value="Female"
        checked={formData.gender === 'Female'}
        onChange={handleChange}
      />
      Female
    </label>
    <span ></span>
    <label>
      <input
        type="radio"
        name="gender"
        value="Others"
        checked={formData.gender === 'Others'}
        onChange={handleChange}
      />
      Others
    </label>
  </div>
</div>

<div className="form-group-inline">
  <label htmlFor="course">Course:</label>
  <select
    id="course"
    name="course"
    value={formData.course}
    onChange={handleChange}
    required
  >
    <option value="">Select your course</option>
    {courseOptions.map((option, index) => (
      <option key={index} value={option.course}>
        {option.course}
      </option>
    ))}
  </select>
</div>
            <div className="form-group-inline">
              <label htmlFor="college">College:</label>
              <select
                id="college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                required
              >
                <option value="">Select your college</option>
                {collegeOptions.map((option, index) => (
                  <option key={index} value={option.college}>
                    {option.college}
                  </option>
                ))}
              </select>
            </div>
          <button type="submit">Update Profile</button>
          <button onClick = {() => setEditing(false)}> Cancel! </button>
        </form>
      ) : (
        <>
        <div className= 'User-profile' >
          <p><strong >Name:</strong> {user && user.name}</p>
          <p><strong>Email:</strong> {user && user.email}</p>
          <p><strong>Username:</strong> {user && user.user_name}</p>
          <p><strong>Phone Number:</strong> {user && user.phone_number}</p>
          <p><strong>Gender:</strong> {user && user.gender}</p>
          <p><strong>Course:</strong> {user && user.course}</p>
          <p><strong>College:</strong> {user && user.college}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
        
        </>
      )}
    </div>

    
    <Footer />
    <ToastContainer
    position="top-center"
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
};

export default ProfilePage;
