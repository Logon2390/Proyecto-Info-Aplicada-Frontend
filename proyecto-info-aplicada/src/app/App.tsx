import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from  '../views/home/Home';
import Upload from '../views/upload/Upload';
import Login from '../views/login/Login';
import Register from '../views/register/Register';
import Userfiles from '../views/userFiles/UserFiles';
import Unauthorized from '../views/unauthorized/Unauthorized';
import Mining from '../views/mining/Mining';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
//import '../views/home/Home.scss';

const App: React.FC = () =>  {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start-mining" element={<Mining />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
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
