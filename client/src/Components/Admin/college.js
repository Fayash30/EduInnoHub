import React, { useState, useEffect } from 'react';
import edit from "../Main/assets/Edit.png";
import del from "../Main/assets/delete.png";
import "./common.css";

const Colleges = () =>{
    const [colleges, setcolleges] = useState([]);
    const [newcollege, setNewcollege] = useState('');
    const [editcollege, setEditcollege] = useState('');
    const [editcollegeId, setEditcollegeId] = useState(null);
    const [showPostcollege, setShowPostcollege] = useState(false);
   
    const fetchcolleges = async () => {
        try {
            const response = await fetch('http://localhost:5000/getcolleges');
            if (response.ok) {
                const data = await response.json();
                setcolleges(data.colleges);
            } else {
                console.error('Error fetching colleges:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching colleges:', error);
        }
    };

    
    useEffect(() => {
        fetchcolleges();
    }, []);

    const handlecollegeChange = (e) => {
        setNewcollege(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/postcolleges', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ college: newcollege }),
            });
            if (response.ok) {
                console.log('college posted successfully');
                alert('college added successfully');
                setNewcollege('');
                fetchcolleges(); 
            } else {
                console.error('Error posting college:', response.statusText);
                alert('Error adding college');
            }
        } catch (error) {
            console.error('Error posting college:', error);
            alert('Error adding college');
        }
    };

   
    const handleEdit = (id, college) => {
        setEditcollegeId(id);
        setEditcollege(college);
    };

   
    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/college/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ college: editcollege }),
            });
            if (response.ok) {
                console.log('college updated successfully');
                alert('college updated successfully');
                setEditcollege('');
                setEditcollegeId(null);
                fetchcolleges(); 
            } else {
                console.error('Error updating college:', response.statusText);
                alert('Error updating college');
            }
        } catch (error) {
            console.error('Error updating college:', error);
            alert('Error updating college');
        }
    };

   
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/college/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('college deleted successfully');
                alert('college deleted successfully');
                fetchcolleges(); 
            } else {
                console.error('Error deleting college:', response.statusText);
                alert('Error deleting college');
            }
        } catch (error) {
            console.error('Error deleting college:', error);
            alert('Error deleting college');
        }
    };

    const togglePostcollegeForm = () => {
      setShowPostcollege(!showPostcollege);
  };

    return (
        <>
           <div>
                <button onClick={togglePostcollegeForm}>Add New college</button>
                {showPostcollege && (
                    <div>
                        <h2>Post College </h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>college :</label>
                                <input
                                    type="text"
                                    value={newcollege}
                                    onChange={handlecollegeChange}
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}
            </div>

            <div>
                <h2>All colleges</h2>
                <table>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Colleges</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colleges.map((college, index) => (
                            <tr key={college._id}>
                                <td>{index + 1}</td>
                                <td>
                        {editcollegeId === college._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editcollege}
                                    onChange={(e) => setEditcollege(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(college._id)}>Save</button>
                                <button onClick={() => setEditcollegeId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {college.college}
                                <img src={edit} alt="edit" width='30' height="30" onClick={() => handleEdit(college._id, college.college)} />
                                <img src={del} alt="delete" width='30' height="30" onClick={() => handleDelete(college._id)} />
                            </>
                        )}
                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Colleges;

