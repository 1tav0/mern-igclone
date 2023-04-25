import React, { useEffect, useState } from 'react'
import './Post.css'
import Avatar from '@mui/material/Avatar';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';

const Post = ({ username, caption, imageUrl, postId, user }) => {
  //username is the name of the use who posted the post
  //user has the displayName of the user who comments 
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('')
  //upon loading aka need a useEffect
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db.collection("posts") //access this collection
                      .doc(postId)// go into doc with this id
                      .collection("comments") //access is comments collection
                      .orderBy("timestamp", "desc")
                      .onSnapshot((snapshot) => { //snpshot listener to update the comments everytime theres a change in comments
                        setComments(snapshot.docs.map((doc) => doc.data()))
                      })
    }
    return () => {
      unsubscribe();
    }
  }, [postId])

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setComment('')
  }

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className='post__avatar'
          alt='tavo'
          src=''
        />
        <h3>{username}</h3>
      </div>
      <img 
        className='post__image'
        src={imageUrl} 
        alt="" 
      />
      <h4 className='post__text'>
          <strong>{username} </strong>
          {caption}
      </h4>

      <div className="post__comments">
        {
          comments.map((comment) => (
            <p>
              <strong className='post__comments__username'>{comment.username} </strong>
              {comment.text}
            </p>
          ))
        }
      </div>

      {
        user && (
          <form className='post__commentBox'>
            <input
              type="text"
              className='post__input'
              placeholder='Add a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={!comment} //disabled if there is no comment
              className='post__button'
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
        )
      }
    </div>
  )
}

export default Post