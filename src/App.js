import './style/App.css';
import React from 'react';
import { db } from './firebase.js';
import { useEffect, useState } from 'react';

import Header from './Header.js';

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{

  }, []);

  return (
    <div className="App">
      <Header setUser={setUser} user={user}></Header>
    </div>
  );
}

export default App;
