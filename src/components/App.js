import '../index';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Admin from './Admin';
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
