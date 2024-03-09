import React, { useEffect, useState } from 'react';
import { SchoolOutlined , BusinessOutlined ,AccountCircleOutlined , ComputerOutlined , DnsOutlined} from '@material-ui/icons';
import "./DashBoard.css";

const CountBox = ({ icon, title, count }) => {
    return (
        <div className="count-box">
            <div className="icon">{icon}</div>
            <div className="title">{title}</div>
            <div className="count">{count}</div>
        </div>
    );
};

const DashBoard = () => {

    const[numProjects , setNumProjects] = useState(0);
    const[numUsers , setNumUsers] = useState(0);
    const[numDomains , setNumDomains] = useState(0);
    const[numCourses , setNumCourses] = useState(0);
    const[numColleges , setNumColleges] = useState(0);

    

    useEffect(() => {

        const token = localStorage.getItem('token');
        if(!token)
        {
            window.location.href='/login';
        }
        fetchUsers();
        fetchDomains();
        fetchColleges();
        fetchCourses();
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
          const response = await fetch('http://localhost:5000/getprojects');
          const data = await response.json(); 
          setNumProjects(data.projects.length);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };

      const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:5000/getcourses');
            const data = await response.json();
            setNumCourses(data.courses.length);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchColleges = async () => {
        try {
            const response = await fetch('http://localhost:5000/getcolleges');
            const data = await response.json();
            setNumColleges(data.colleges.length);
        } catch (error) {
            console.error('Error fetching colleges:', error);
        }
    };

    const fetchDomains = async () => {
        try {
            const response = await fetch('http://localhost:5000/getDomains');
            const data = await response.json();
            setNumDomains(data.domains.length);
        } catch (error) {
            console.error('Error fetching domains:', error);
        }
    };

    const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/getUsers/');
          const data = await response.json();
            setNumUsers(data.users.length);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
    return (
        <>
            <div className="count-box-container">
                <CountBox title = {"Total Projects"} icon={<ComputerOutlined />} count={numProjects} />
                <CountBox title = {"Total Users"} icon={<AccountCircleOutlined />} count={numUsers} />
                <CountBox title = {"Total Domains"} icon={<DnsOutlined />} count={numDomains} />
                <CountBox title = {"Total Courses"} icon={<SchoolOutlined />} count={numCourses} />
                <CountBox title = {"Total Colleges"} icon={<BusinessOutlined />} count={numColleges} />
            </div>
        </>
    )
};

export default DashBoard;