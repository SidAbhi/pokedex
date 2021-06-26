import React from 'react';
import './App.css';
import Pokelist from './components/Pokelist';
import {BrowserRouter as Router, Routes, Navigate, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Navigate to="/pokemon"/>
        </Route>
        <Route path="pokemon/*" element={<Pokelist/>}/>
      </Routes>
    </Router>
  );
}

export default App;
