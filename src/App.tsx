import React from 'react';
import './App.css';
import Pokelist from './components/Pokelist';
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Pokelist/>
    </Router>
  );
}

export default App;
