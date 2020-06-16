import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import 'components/pages/library/BookList/BookItemUploading/BookItemUploading.scss';
import IconButton from '@material-ui/core/IconButton';
import { Clear } from '@material-ui/icons';
import { storage } from 'services/firebase/firebase';
import { LibraryContext } from 'components/pages/library/Library';

export default  (
  props,
) => {
  const {book, uploadUrl} = props;
  const { setBooks, setUploadingBooks } = useContext(LibraryContext);

  const [progress, setProgress] = useState(0);
  let task;
  let storageRef;


  useEffect(() => {
    storageRef = storage.ref().child(uploadUrl);

    task = storageRef.put(book);
    task.on('state_changed', (status) => {
        const progress = status.bytesTransferred / status.totalBytes;
        setProgress(progress);
      }, (err) => {
        console.error(err);
      },
      () => {
        removeUpload();
        setBooks(prevBooks => ([...prevBooks, task.snapshot.ref]));
      },
    );
  }, [uploadUrl]);

  const removeUpload = () => {
    if (task && progress < 1) {
      task.cancel();
    }
    setUploadingBooks((prevUploadingBooks) => prevUploadingBooks.filter((book) => book.uploadUrl !== uploadUrl));
  }

  return (
    <li className='book-list-item'>
      <Button
        fullWidth
      >
        <div className='progress-bar' style={{ width: `${progress * 100}%` }}>
        </div>
        <span>
          {book.name}
        </span>
      </Button>
      <IconButton onClick={removeUpload}>
        <Clear/>
      </IconButton>
    </li>
  );
}

