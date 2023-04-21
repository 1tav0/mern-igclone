import React from 'react'
import './Post.css'

const Post = () => {
  return (
    <div className="post">
          <h3>username</h3>
          <img 
            className='post__image'
            src="https://therealchamps.com/wp-content/uploads/getty-images/2017/07/947096288.jpeg" 
            alt="" 
          />
          <h4 className='post__text'>
              <strong>1tav0</strong>
              This is some text
          </h4>
    </div>
  )
}

export default Post