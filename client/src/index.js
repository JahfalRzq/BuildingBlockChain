import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './index.css';
import { Router, Routes, Route } from 'react-router-dom';
import history from './history';
import Blocks from './components/Blocks';
import ConductTransaction from './components/ConductTransaction';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(  
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/blocks" Component={Blocks} />
        <Route path='/conduct-transaction' Component={ConductTransaction} />

      </Routes>
    </Router>
);