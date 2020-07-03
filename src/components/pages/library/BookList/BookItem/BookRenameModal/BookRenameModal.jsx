import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { getBookName } from 'components/pages/library/BookList/BookItem/BookItem';

export default ({
  open,
  book,
  metadata,
  setMetadata,
  onClose=()=>{}
})=>{
  const [name, setName] = useState(getBookName(book, metadata));

  useEffect(()=>{
    setName(getBookName(book, metadata))
  }, [metadata, book])

  const isValid = ()=>{
    return name && new RegExp('^[A-zÀ-ú0-9-.+=_]{1,32}$', 'g').test(name);
  }

  const rename = () => {
    const customMetadata = {
      displayName: name
    }
    book.updateMetadata({customMetadata}).then(() => {
      setMetadata({...metadata, customMetadata})
      onClose();
    }).catch((e) => {
      console.error('Update metadata error: ', e);
    });
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Rename</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="book-name"
          label="Name"
          value={name}
          error={!isValid()}
          onChange={(v)=>{
            setName(v.target.value)
          }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={rename} color="primary" disabled={!isValid()}>
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  )
}
