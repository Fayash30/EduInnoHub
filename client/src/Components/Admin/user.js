import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import del from "../Main/assets/delete.png";
import { ToastContainer , toast } from "react-toastify";
import "./common.css";

const Users = () => {
    const [users, setUsers] = useState([]);


    const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/getUsers/');
          const data = await response.json();
  
       
          setUsers(data.users);
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
         
          fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/deleteUser/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
               fetchUsers();
               // setNumUsers(numUsers - 1);
            }
            toast.error("User Deleted" , {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
          
          });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    return (
    <>
        <div>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user,index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {user.user_name}
                                        <img src={del} alt="delete" width='30' height="30" onClick={() => handleDeleteUser(user._id)} />
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

export default Users;