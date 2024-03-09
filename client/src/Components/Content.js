import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Content.css';

const Content = () => {
  const [projects, setProjects] = useState([]);
  const [allDomains, setAllDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/getprojects');
        const data = await response.json();

        const uniqueDomains = ['All',...new Set(data.projects.map((project) => project.domain))];
        setAllDomains(uniqueDomains);
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDomainClick = (domain) => {
    setSelectedDomain((prevDomain) => (prevDomain === domain ? null : domain));
  };

  const filteredProjects = selectedDomain
  ? projects.filter((project) => (selectedDomain === 'All' ? true : project.domain === selectedDomain))
  : projects;


  return (
    <>
      <div className='content-container'>
        <h1 align="center"> CURRENT PROJECTS </h1>
        <div className='domain-filter'>
          <p>Filter by Domain:</p>
          <div>
            {allDomains.map((domain) => (
             <span
             key={domain}
             onClick={() => handleDomainClick(domain)}
             className={`${styles.domainButton} ${selectedDomain === domain ? styles.selectedDomain : ''}`}
           >
                {domain}
              </span>
            ))}
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>PROJECT TITLE</th>
              <th>DOMAIN</th>
              <th>UPLOADED DATE</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, index) => (
              <tr key={project._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/project/${project._id}`}>{project.title}</Link>
                </td>
                <td>{project.domain}</td>
                <td>{new Date(project.uploadedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Content;
