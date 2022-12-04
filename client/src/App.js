import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React  from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
