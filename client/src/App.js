import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React  from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import LikedSongs from './LikedSongs'
import Logs from './Logs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/liked-songs" element={<LikedSongs />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
