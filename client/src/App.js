import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './Components/Signup';
import LoginForm from './Components/Login';
import HomePage from './Components/Main';
import Upload from './Components/Upload';
import { SingleProjectView } from './Components/SingleProjectView';
import ProfilePage from './Components/UserProfile';
import AdminDashboard from './Components/Admin/Admin';
import ChatRoom from './Components/ChatRoom';
import "./Components/app.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element = { <HomePage />} />
          <Route path = "/project/:id" element = { <SingleProjectView />} />
          <Route path="/register" element={ <SignupForm />} />
          <Route path="/login" element={ <LoginForm />} />
          <Route path="/upload" element = { <Upload />} />
          <Route path='/Admin' element = { <AdminDashboard />} />
          <Route path = '/profile' element = { <ProfilePage /> } />
          <Route path = '/chat' element = { <ChatRoom /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
