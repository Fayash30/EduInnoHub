import "./common.css";
import React, { useState, useEffect } from 'react';
import edit from "../Main/assets/Edit.png";
import del from "../Main/assets/delete.png";

const Courses = () =>{
    const [courses, setcourses] = useState([]);
    const [newcourse, setNewcourse] = useState('');
    const [editcourse, setEditcourse] = useState('');
    const [editcourseId, setEditcourseId] = useState(null);
    const [showPostcourse, setShowPostcourse] = useState(false);
   
    const fetchcourses = async () => {
        try {
            const response = await fetch('http://localhost:5000/getcourses');
            if (response.ok) {
                const data = await response.json();
                setcourses(data.courses);
            } else {
                console.error('Error fetching courses:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    
    useEffect(() => {
        fetchcourses();
    }, []);

    const handlecourseChange = (e) => {
        setNewcourse(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/postcourses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course: newcourse }),
            });
            if (response.ok) {
                console.log('course posted successfully');
                alert('course added successfully');
                setNewcourse('');
                fetchcourses(); 
            } else {
                console.error('Error posting course:', response.statusText);
                alert('Error adding course');
            }
        } catch (error) {
            console.error('Error posting course:', error);
            alert('Error adding course');
        }
    };

   
    const handleEdit = (id, course) => {
        setEditcourseId(id);
        setEditcourse(course);
    };

   
    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/course/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course: editcourse }),
            });
            if (response.ok) {
                console.log('course updated successfully');
                alert('course updated successfully');
                setEditcourse('');
                setEditcourseId(null);
                fetchcourses(); 
            } else {
                console.error('Error updating course:', response.statusText);
                alert('Error updating course');
            }
        } catch (error) {
            console.error('Error updating course:', error);
            alert('Error updating course');
        }
    };

   
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/course/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('course deleted successfully');
                alert('course deleted successfully');
                fetchcourses(); 
            } else {
                console.error('Error deleting course:', response.statusText);
                alert('Error deleting course');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Error deleting course');
        }
    };

    const togglePostcourseForm = () => {
      setShowPostcourse(!showPostcourse);
  };

    return (
        <>
        
           <div>
                <button onClick={togglePostcourseForm}>Add New course</button>
                {showPostcourse && (
                    <div>
                        <h2>Post Course</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>course :</label>
                                <input
                                    type="text"
                                    value={newcourse}
                                    onChange={handlecourseChange}
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}
            </div>

            <div>
                <h2>All courses</h2>
                <table>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Courses</th>
        
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course._id}>
                                <td>{index + 1}</td>
                               <td>
                        {editcourseId === course._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editcourse}
                                    onChange={(e) => setEditcourse(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(course._id)}>Save</button>
                                <button onClick={() => setEditcourseId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {course.course}
                                <img src={edit} alt="edit" width='30' height="30" onClick={() => handleEdit(course._id, course.course)} />
                                <img src={del} alt="delete" width='30' height="30" onClick={() => handleDelete(course._id)} />
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

export default Courses;

