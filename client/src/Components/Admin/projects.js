import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import del from "../Main/assets/delete.png";
import { ToastContainer , toast } from "react-toastify";
import "./common.css";

const Projects = () => {
    
    const [projects, setProjects] = useState([]);


    const fetchProjects = async () => {
        try {
          const response = await fetch('http://localhost:5000/getprojects');
          const data = await response.json();
  
          setProjects(data.projects);
         // setNumProjects(data.projects.length);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
  
  

    useEffect(() => {

        const token = localStorage.getItem('token');
        if(!token)
        {
            window.location.href='/login';
        }
         
          fetchProjects();
    }, []);

    const handleDeleteProject = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:5000/deleteProject/${projectId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchProjects();
              //  setNumProjects(numProjects - 1);
                toast.error("Project Deleted", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                    
                    });
            }
           
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
    <>
         <div>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Title</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project , index) => (
                                <tr key={project._id}>
                                    <td>{index + 1 }</td>
                                    <td>
                                        {project.title}
                                        <img src={del} alt="delete" width='30' height="30" onClick={() => handleDeleteProject(project._id)} /> 
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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

export default Projects;