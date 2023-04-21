import './App.css';
import Header from './components/Header'
import Post from './components/Post'
import React, { useState } from 'react'

function App() {

  //give the state inital values in this case and object 
  const [posts, setPosts] = useState([
    {
      imageUrl: 'https://therealchamps.com/wp-content/uploads/getty-images/2017/07/947096288.jpeg',
      username: 'tavo',
      caption: 'coming from property'
    },
    {
      imageUrl: 'https://assets.manutd.com/AssetPicker/images/0/0/10/126/687707/Legends-Profile_Cristiano-Ronaldo1523460877263.jpg',
      username: 'cr7',
      caption: 'The real goat'
    },
    {
      imageUrl: 'https://www.aljazeera.com/wp-content/uploads/2021/08/AP081018051839.jpg?resize=1800%2C1800',
      username: 'sav',
      caption: 'yessirrr'
    }
  ]);

  return (
    <div className="app">
      <Header />
      {
        posts.map(post => (
          <Post
            imageUrl= {post.imageUrl}
            username= {post.username}
            caption= {post.caption}
          />
        ))
      }
    </div>
  );
}

export default App;
