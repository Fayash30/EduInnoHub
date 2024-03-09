import React, { useState, useEffect } from 'react';
import "./upload.css";
import { ToastContainer , toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from '../Header';
import Footer from '../Footer';


function Upload() {
  const [error, setError] = useState('');
  const [title, setProjectTitle] = useState('');
  const [description,setDescription] = useState('');
  const [abstract, setProjectAbstract] = useState('');
  const [domain, setSelectedDomain] = useState('');
  const [domainOptions, setDomainOptions] = useState([]);
  const [ytlink, setYoutubeLink] = useState('');
  const [file, setFile] = useState('');

 
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/getDomains');
        if (!response.ok) {
          throw new Error('Failed to fetch domains');
        }
        const data = await response.json();
        setDomainOptions(data.domains);
      } catch (error) {
        console.error('Error fetching domains:', error);
      }
    };
    fetchDomains();
  }, []);

  

  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
  };

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token') !== null;

    const handleFile = (e) => {
      setFile(e.target.files[0]);
    }

    
    const token = localStorage.getItem('token');
   const handleUpload = async (e) => {

    if(!isLoggedIn)
      {
        alert("Login to Upload");
          navigate("/login");
      }
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description',description);
      formData.append('abstract', abstract);
      formData.append('domain', domain);
      formData.append('ytlink', ytlink);
      formData.append('file', file, file.name);

      const response = await fetch('http://127.0.0.1:5000/api/upload/',{
            method: 'POST',
            body : formData,
            headers: {
              'Authorization': `Bearer ${token}` 
          }
        })

        const data = await response.json()
        
        console.log(data);
        if(data.status === "ok")
        {
          toast.info("File Uploaded", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
            });
          navigate("/", {replace:true})
        }
        else{
          setError(response.error)
          toast.error("Plagirsm  Detected in Your Project", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
              });
           }
  };


  const handleCancel = () => {
    alert("Canceled!!");
    navigate("/");
  };

  return (
    <>
    <Header/>
    <form onSubmit={handleUpload} >
      <div className='upload-page-container'>
    <div className="upload-container">
      <h2>Upload Project</h2>

      <div className="form-group-inline">
        <label htmlFor="projectTitle">Project Title:</label>
        <input type="text" id="projectTitle" value={title} onChange={(e) => setProjectTitle(e.target.value)} />
      </div>

      <div className="form-group-inline">
        <label htmlFor="projectDescription">Project Description:</label>
        <textarea id="projectDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="form-group-inline">
        <label htmlFor="projectAbstract">Project Abstract:</label>
        <textarea id="projectAbstract" value={abstract} onChange={(e) => setProjectAbstract(e.target.value)} />
      </div>

      <div className="form-group-inline">
        <label htmlFor="domain">Domain:</label>
        <select id="domain" value={domain} onChange={handleDomainChange}>
          <option value="">Select Domain</option>
          {domainOptions.map((domain) => (
          <option key={domain._id} value={domain.domain}>
        {domain.domain}
    </option>
  ))}
</select>
      </div>

      <div className="form-group-inline">
        <label htmlFor="youtubeLink">Reference Link (optional):</label>
        <input type="text" id="youtubeLink" value={ytlink} onChange={(e) => setYoutubeLink(e.target.value)} />
      </div>

      <div className="form-group-inline">
        <label htmlFor="file">Upload File:</label>
        <input type="file" id="file"  name="file" onChange={handleFile} />
      </div>

      <div className="button-group">
      
        <button type = "submit" > Upload </button>
        <button onClick={handleCancel}>Cancel</button>
        
      </div>
    </div>
  </div>
    </form>
    <Footer />
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    draggable
    theme="light" />
    </>
  );
}

export default Upload;
