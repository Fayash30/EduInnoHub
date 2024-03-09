import React, { useState } from 'react';
import Footer from '../Footer';
import Header from "../Header";
import Domains from './domain';
import Colleges from './college';
import Users from './user';
import Projects from './projects';
import Courses from './course';
import DashBoard from './DashBoard';
import SideBar from './SideBar';
import "./Admin.css";

const AdminDashboard = () => {
    const [selectedItem, setSelectedItem] = useState('DashBoard');

    const renderSelectedComponent = () => {
        switch (selectedItem) {
            case 'Users':
                return <Users />;
            case 'Projects':
                return <Projects />;
            case 'Domains':
                return <Domains />;
            case 'Colleges':
                return <Colleges />;
            case 'Courses':
                return <Courses />;
            default:
                return <DashBoard />;
        }
    };

    return (
        <>
            <Header />
            <div className="admin-dashboard-container">
                <SideBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                <div className="selected-component">
                    {renderSelectedComponent()}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AdminDashboard;
