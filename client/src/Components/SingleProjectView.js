import React, { useState, useEffect } from 'react';
import Header from './Header';
import DocViewer, { DocViewerRenderers  } from "@cyntler/react-doc-viewer";
import axios from 'axios';
import Footer from './Footer';
import "./SingleProjectView.css";
import { Link, useParams } from 'react-router-dom';

export const SingleProjectView = () => {
    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [docs, setDocs] = useState([]);
    const [fileLoading, setFileLoading] = useState(true);
     const [contentType, setContentType] = useState(null);
     
    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getproject/${id}`);
                const data = response.data;
                setProjectDetails(data.project);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching project details:', error);
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [id]);

    useEffect(() => {
        const fetchContType = async () => {
            if (projectDetails && projectDetails.pdf) {
                try {
                    const response = await fetch(`http://localhost:5000/metadata/${projectDetails.pdf}`);
                    const data = await response.json();
                    const contentType = data.contentType;
                    console.log(contentType);
                    setContentType(contentType);
                } catch (error) {
                    console.error('Error fetching file ContentType:', error);
                }
            } else {
                console.log("Cannot find the contentType");
            }
        };

        fetchContType();
    }, [projectDetails]);

    useEffect(() => {
        const fetchFileData = async () => {
            if (projectDetails && projectDetails.pdf && contentType) {
                try {
                    const response = await axios.get(`http://localhost:5000/file/${projectDetails.pdf}`, {
                        responseType: 'arraybuffer',
                    });
                    const supportedTypes = [
                        'application/pdf',
                        'image/jpeg',
                        'image/png',
                        'image/jpg',
                        'application/msword',
                        'image/gif',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'application/vnd.ms-excel',
                        'video/mp4',
                        'text/plain',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'application/vnd.ms-powerpoint',
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        'application/zip',
                    ];
                    if (supportedTypes.includes(contentType)) {
                        const blob = new Blob([response.data], { type: contentType });
                        const dataURL = URL.createObjectURL(blob);
                        setDocs([{ uri: dataURL }]);
                        setFileLoading(false);
                    } else {
                        console.log("Unsupported file type:", contentType);
                    }
                } catch (error) {
                    console.error('Error fetching file data:', error);
                }
            } else {
                console.log("Cannot find the doc");
            }
        };

        fetchFileData();
    }, [projectDetails, contentType]);

    return (
        <div>
            <Header />
            <h1 align="center">PROJECT DETAILS</h1>
            <div className="project-container" color="black">
                {loading ? (
                    <p>Loading project details...</p>
                ) : (
                    projectDetails ? (
                        <>
                            <h3>PROJECT TITLE:</h3>
                                <p>{projectDetails.title}</p>
                            <p><strong>DESCRIPTION:</strong>{projectDetails.description}</p>
                            <p><strong>DOMAIN:</strong> {projectDetails.domain}</p>
                            <p><strong>ABSTRACT:</strong> {projectDetails.abstract}</p>
                            <p><strong>UPLOADED DATE:</strong> {new Date(projectDetails.uploadedAt).toLocaleDateString()}</p>
                            {projectDetails.ytlink && (
        <p><strong>REFERENCE LINK:</strong> <Link to={`${projectDetails.ytlink}`}>{projectDetails.ytlink}</Link></p>)}

                            <p><strong>POSTED BY:</strong> {projectDetails.createdBy && projectDetails.createdBy}</p>
                            <p><strong>PROJECT FILES: </strong></p>
                            {fileLoading ? (
                                <p>Loading Files......</p>
                            ) : (
                                projectDetails.pdf && (
                                    <DocViewer
                                        documents={docs}
                                        pluginRenderers={DocViewerRenderers}
                                        theme={{
                                            primary: "#5296d8",
                                            secondary: "#ffffff",
                                            tertiary: "#5296d899",
                                            textPrimary: "#ffffff",
                                            textSecondary: "#5296d8",
                                            textTertiary: "#00000099",
                                            disableThemeScrollbar: false,
                                        }}
                                        style={{ height: 1000 }}
                                        prefetchMethod="GET"
                                    />
                                )
                            )}
                            
                        </>
                    ) : (
                        <p>No project details available.</p>
                    )
                )}
            </div>
            <Footer />
        </div>
    )
};
