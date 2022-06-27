import React, { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './pages/Home';

function App() {

  useEffect(() => {
    document.title = 'Hochzeitsanmeldungen';
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
