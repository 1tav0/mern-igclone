import React, { useState } from 'react'
import './ImageUpload.css' 
import { Button } from '@mui/material'
import { db, storage } from '../firebase'
import firebase from 'firebase/compat/app';

const ImageUpload = ({ username }) => {

  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) { //if theres a file get the first one and the image to it 
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    //${image.name} is basically the file name 
    //get a reference to the new folder images where we are storing everything and put an image there
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on( //listening to what is happening to uploadTask
      "state_changed", //listening for this state then on change give me a snapshot
      (snapshot) => { // since this is asynchronous we have to keep track of it using snapshot
        //progress function ...
        const progress = Math.round( //as it changes keep giving me snapshots of the changes in the case the progress
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 //gives u the progress indicator betweem 0 to 100
        )//based on how much info has been sent across and how much is left 
        setProgress(progress)
      },
      (error) => {
        //Error function ...
        console.log(error);
        alert(error.message);
      },
      () => { //when the upload completes
        // complete function
        storage //go to storge
              .ref("images") //to the ref images folder
              .child(image.name) // to the child image 
              .getDownloadURL() // get the url we have uploaded
              .then( url => {
                //post the image inside db
                db
                  .collection("posts")
                  .add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageUrl: url,
                    username: username
                  })
                setProgress(0);
                setCaption("");
                setImage(null);
              })
      }
    )
  }

  return (
    <div className="imageUpload">
      <progress className='imageUpload__progress' value={progress} max="100" />
      <input
        type="text"
        placeholder='Enter a caption...'
        onChange = { e => setCaption(e.target.value)}
        value = { caption }
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}

export default ImageUpload