import React from 'react';
import Layout from './Layout';
import 'foundation-sites/dist/css/foundation.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>      
      <Layout />
    </Router>
  );
};

export default App;