import './style/App.css';
import React from 'react';
import { db, auth } from './firebase.js';
import { useEffect, useState } from 'react';
import Post from './Post.js';
import Header from './Header.js';

function App() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((val) => {
      setUser(val.displayName);
    });
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((document) => {
        return {
          id: document.id,
          info: document.data()
        }
      }));
    })
  }, []);



  return (
    <div className="App">
      <Header setUser={setUser} user={user}></Header>
      {
        posts.map((val) => {
          return (
            <Post user={user} info={val.info} id={val.id}></Post>
          )
        })
      }
    </div>
  );
}

export default App;
