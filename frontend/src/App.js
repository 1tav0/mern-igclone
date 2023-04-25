import './App.css';
import Header from './components/Header'
import Post from './components/Post'
import React, { useState, useEffect } from 'react'
import { db } from './firebase'
import { auth } from './firebase'
import ImageUpload from './components/ImageUpload';
// import InstagramEmbed from 'react-instagram-embed';

function App() {
 
  //give the state inital values in this case and object 
  // const [posts, setPosts] = useState([
  //   {
  //     imageUrl: 'https://therealchamps.com/wp-content/uploads/getty-images/2017/07/947096288.jpeg',
  //     username: 'tavo',
  //     caption: 'coming from property'
  //   },
  //   {
  //     imageUrl: 'https://assets.manutd.com/AssetPicker/images/0/0/10/126/687707/Legends-Profile_Cristiano-Ronaldo1523460877263.jpg',
  //     username: 'cr7',
  //     caption: 'The real goat'
  //   },
  //   {
  //     imageUrl: 'https://www.aljazeera.com/wp-content/uploads/2021/08/AP081018051839.jpg?resize=1800%2C1800',
  //     username: 'sav',
  //     caption: 'yessirrr'
  //   }
  // ]);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenSignIn = () => setOpenSignIn(true)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [openSignIn, setOpenSignIn] = React.useState(false)
    
  const SignUp = (e) => {
      e.preventDefault();

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          return authUser.user.updateProfile({
            displayName: username
          })
        })
        .catch((error) => alert(error.message))
        
        handleClose()
  } 

  const SignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    
    setOpenSignIn(false)
  } 

  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user has logged in
        console.log(authUser)
        setUser(authUser)

        // if (authUser.displayName) {
        //   //dont update username 

        // } else {
        //   return authUser.updateProfile({
        //     displayName: username,
        //   })
        // }

      } else {
        // the user has logged out
        setUser(null)
      }
    })

    return () => {
      //some clean up function
      unsubscribe() //so we dont make duplicates
    }

},[user, username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //every time a new posts is added this fires 
      setPosts(snapshot.docs.map(doc => (
        {
          id: doc.id,
          post: doc.data()
        })))
    })
  }, [])
  

  return (
    <div className="app">
      <Header
        user={user}
        email={email}
        password={password}
        username={username}
        setEmail={setEmail} // pass setEmail function as prop
        setPassword={setPassword} // pass setPassword function as pro
        setUsername={setUsername} // pass setUsername function as prop
        SignUp={SignUp}
        SignIn={SignIn}
      />
        <div className="app__posts">
          {
            posts.map(({post, id}) => (
              <Post
                key={id}
                postId={id}
                user={user}
                imageUrl= {post.imageUrl}
                username= {post.username}
                caption= {post.caption}
              />
            ))
          }
        </div>
         {
            user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ) : (
                <h3>Must be logged in to upload file</h3>
            ) 
          }
    </div>
  );
}

export default App;
