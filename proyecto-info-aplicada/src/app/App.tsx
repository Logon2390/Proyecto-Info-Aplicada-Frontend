import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from  '../views/home/Home';
import Upload from '../views/upload/Upload';
import Login from '../views/login/Login';
import Register from '../views/register/Register';
import Userfiles from '../views/userFiles/UserFiles';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () =>  {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userfiles" element={<Userfiles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
