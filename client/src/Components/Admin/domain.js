import React, { useState, useEffect } from 'react';
import edit from "../Main/assets/Edit.png";
import del from "../Main/assets/delete.png";
import "./common.css";
const Domains = () =>{
    const [domains, setDomains] = useState([]);
    const [newDomain, setNewDomain] = useState('');
    const [editDomain, setEditDomain] = useState('');
    const [editDomainId, setEditDomainId] = useState(null);
    const [showPostDomain, setShowPostDomain] = useState(false);
   
    const fetchDomains = async () => {
        try {
            const response = await fetch('http://localhost:5000/getDomains');
            if (response.ok) {
                const data = await response.json();
                setDomains(data.domains);
            } else {
                console.error('Error fetching domains:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching domains:', error);
        }
    };

    
    useEffect(() => {
        fetchDomains();
    }, []);

    const handleDomainChange = (e) => {
        setNewDomain(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/postDomains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ domain: newDomain }),
            });
            if (response.ok) {
                console.log('Domain posted successfully');
                alert('Domain added successfully');
                setNewDomain('');
                fetchDomains(); 
            } else {
                console.error('Error posting domain:', response.statusText);
                alert('Error adding domain');
            }
        } catch (error) {
            console.error('Error posting domain:', error);
            alert('Error adding domain');
        }
    };

   
    const handleEdit = (id, domain) => {
        setEditDomainId(id);
        setEditDomain(domain);
    };

   
    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/domains/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ domain: editDomain }),
            });
            if (response.ok) {
                console.log('Domain updated successfully');
                alert('Domain updated successfully');
                setEditDomain('');
                setEditDomainId(null);
                fetchDomains(); 
            } else {
                console.error('Error updating domain:', response.statusText);
                alert('Error updating domain');
            }
        } catch (error) {
            console.error('Error updating domain:', error);
            alert('Error updating domain');
        }
    };

   
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/domains/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Domain deleted successfully');
                alert('Domain deleted successfully');
                fetchDomains(); 
            } else {
                console.error('Error deleting domain:', response.statusText);
                alert('Error deleting domain');
            }
        } catch (error) {
            console.error('Error deleting domain:', error);
            alert('Error deleting domain');
        }
    };

    const togglePostDomainForm = () => {
      setShowPostDomain(!showPostDomain);
  };

    return (
        <>
       
           <div>
                <button onClick={togglePostDomainForm}>Add New Domain</button>
                {showPostDomain && (
                    <div>
                        <h2>Post Domain</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Domain :</label>
                                <input
                                    type="text"
                                    value={newDomain}
                                    onChange={handleDomainChange}
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}
            </div>

            <div>
                <h2>All Domains</h2>
                <table>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Domains</th>
                        </tr>
                    </thead>
                    <tbody>
                        {domains.map((domain, index) => (
                            <tr key={domain._id}>
                                <td>{index + 1}</td>
                                <td>
                        {editDomainId === domain._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editDomain}
                                    onChange={(e) => setEditDomain(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(domain._id)}>Save</button>
                                <button onClick={() => setEditDomainId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {domain.domain}
                                <img src={edit} alt="edit" width='30' height="30" onClick={() => handleEdit(domain._id, domain.domain)} />
                                <img src={del} alt="delete" width='30' height="30" onClick={() => handleDelete(domain._id)} />
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

export default Domains;
