import React from 'react'
import './Header.css' 
import Avatar from '@mui/material/Avatar';
import BasicModal from './BasicModal';

const Header = ({ user, email,
  password,username, SignUp,SignIn,setEmail, setPassword, setUsername }) => {
  return (
    <div className="header">
          <h3 className="logo">
              Instagram
          </h3>
          <div className="right_side">
              <BasicModal
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
              <Avatar 
                  className='profile_pic'
                  src='https://i.guim.co.uk/img/media/e5a60fe02429db588fdd910fcfa259b9c78b4e60/0_73_3313_1988/master/3313.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=72d54d2ff469eb5e148a278c0c7adc23'
                  alt='cr7'
              />  
          </div>
    </div>
  )
}

export default Header