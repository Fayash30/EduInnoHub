import React,{ useState,useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";


const SignupForm = () => {

  const [courseOptions, setCourseOptions] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const[error, setError] = useState('');
  const[registrationType , setRegistrationType] = useState('STUDENT');
  const [formData, setFormData] = useState({
    email:'',
    name:'',
    user_name:'',
    phone_number:'',
    password:'',
    user_type:'',
    institute_code:'',
    institute_location:'',
    gender:'',
    course :'',
    college:''
  });

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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    if (type === 'radio' || name === 'user_type') {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const handleTypeChange = (e) => {
    setRegistrationType(e.target.value);
  };

  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate("/login");
  }

    async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/create/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formData
            }),
        })

        const data = await response.json()

        if(data.status === 'ok'){
          toast("Account Created Successfully");
            navigate("/login", {replace:true})
        }
        else{
            setError(data.error)
            toast.error(data.error, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
                
                });
        }

        console.log(data)
    }

  return (
    <>
    <div className="signup-pages-container ">
    <div className="registration-containers">
      <h2>Registration</h2>
        <form onSubmit={handleSubmit} >
      <div className="form-group-inline">
        <label htmlFor="usertype">
          User Type:
          </label>
        <select 
        value={registrationType} 
        onChange={handleTypeChange} 
        >
          <option value="STUDENT">
            Student
            </option>
          <option value="INSTITUTE">
            Institute
            </option>
        </select>
      </div>

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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {registrationType === 'STUDENT' && (
        <>
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
          
        </>
      )}

      {registrationType === 'INSTITUTE' && (
        <>
          <div className="form-group-inline">
            <label htmlFor="instituteCode">Institute Code:</label>
            <input
              type="text"
              id="instituteCode"
              name="institute_code"
              placeholder="Enter your institute code"
              value={formData.institute_code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-inline">
            <label htmlFor="university">College Location:</label>
            <input
              type="text"
              id="university"
              name="institute_location"
              placeholder="Enter your college location"
              value={formData.institute_location}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
      <button className="button" type="submit">Register</button>
     
      <button className='button' onClick={handleRedirect} > Login </button>
      </form>
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
    pauseOnHover
    theme="light"
    
/>
</>
  );
};

export default SignupForm;