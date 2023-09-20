import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Gallery from './pages/gallery';
import './style/App.css'; 
 
function App() {

  return (
    <div className='App'>
      <Router>
      <Routes>
        <Route  path="/" element={<Login/>} />
        <Route path="/Gallery" element={<Gallery/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
