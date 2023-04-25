import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './BasicModal.css'
import { Input } from '@mui/material';
import { auth } from '../firebase'
import { useEffect } from 'react';
import { useState } from 'react';
import ImageUpload from './ImageUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ user, email,
  password,username, SignUp,SignIn,setEmail, setPassword, setUsername
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenSignIn = () => setOpenSignIn(true)
  // const [email, setEmail] = React.useState('')
  // const [password, setPassword] = React.useState('')
  // const [username, setUsername] = React.useState('')
  const [openSignIn, setOpenSignIn] = React.useState(false)
    
  // const SignUp = (e) => {
  //     e.preventDefault();

  //     auth
  //       .createUserWithEmailAndPassword(email, password)
  //       .then((authUser) => {
  //         return authUser.user.updateProfile({
  //           displayName: username
  //         })
  //       })
  //       .catch((error) => alert(error.message))
        
  //       handleClose()
  // } 

  // const SignIn = (e) => {
  //   e.preventDefault();

  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .catch((error) => alert(error.message))
    
  //   setOpenSignIn(false)
  // } 

  // const [user, setUser] = useState(null)
  //runs specific code based on a specific condidition
  // When the component first mounts, the onAuthStateChanged function is called 
  //and the unsubscribe function is returned.This function is then called when the 
  //component unmounts to clean up the listener.
  /*When the authUser object is returned from Firebase's authentication API, the setUser function is called with the authUser object as an argument. If the authUser object has a displayName, then no action is taken. If it does not have a displayName, then the updateProfile method is called on the authUser object with the username as an argument to update the user's display name.
If there is no authUser object returned, then the setUser function is called with a value of null to indicate that the user has logged out. */
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         // the user has logged in
//         console.log(authUser)
//         setUser(authUser)

//         // if (authUser.displayName) {
//         //   //dont update username 

//         // } else {
//         //   return authUser.updateProfile({
//         //     displayName: username,
//         //   })
//         // }

//       } else {
//         // the user has logged out
//         setUser(null)
//       }
//     })

//     return () => {
//       //some clean up function
//       unsubscribe() //so we dont make duplicates
//     }

// },[user, username])
    
  return (
    <>
      <div>
        {
          user
            ?
            (
            <Button onClick={ () => auth.signOut()}>LogOut</Button>
            )
            :
            (
              <div className="app__loginContainer">
                <Button onClick={handleOpenSignIn}>SignIn</Button>
                <Button onClick={handleOpen}>SignUp</Button>
              </div>
            )
        }

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              <form className='app__signup'>
                  <center>
                      <h3 className="logo">
                          Instagram
                      </h3>
                  </center>
                  <Input
                      placeholder='email'
                      type='text'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                  />
                  <Input
                      placeholder='password'
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                  />
                  <Input
                      placeholder='username'
                      type='username'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                  />
              <Button onClick={SignUp}>Sign Up</Button>
              </form>
          </Box>
        </Modal>
        <Modal
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              <form className='app__signup'>
                  <center>
                      <h3 className="logo">
                          Instagram
                      </h3>
                  </center>
                  <Input
                      placeholder='email'
                      type='text'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                  />
                  <Input
                      placeholder='password'
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                  />
              <Button onClick={SignIn}>Sign In</Button>
              </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}