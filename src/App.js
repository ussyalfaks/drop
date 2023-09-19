import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Gallery from './components/gallery';
import './App.css'; 
 
function App() {




  return (
    <div className='App'>
      <Router>
      <Routes>
        <Route  path="/" element={<Login/>} />
        <Route path="/gallery" element={<Gallery/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
