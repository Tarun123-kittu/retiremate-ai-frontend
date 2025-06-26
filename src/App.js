import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import ChatContainer from './components/Chat/ChatContainer';
import Home from './page/Home';
import './App.css'
function App() {
  return (
    <Router>
      <CssBaseline />    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatContainer />} />
        </Routes>
    </Router>
  );
}

export default App;
