import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import './BookItem.scss';
import IconButton from '@material-ui/core/IconButton';
import { Delete, MoreHoriz } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { LibraryContext } from 'components/pages/library/Library';

export default ({
  book,
  showOptions=false,
  deleteBook=()=>{}
}) => {
  const [title, setTitle] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {openBook} = useContext(LibraryContext)

  useEffect(() => {
    book.getMetadata().then((res) => {
      setTitle(res.name);
    });
  }, [book]);

  const handleMenuClose = ()=>{
    setAnchorEl(null);
  }

  return (
    <li className='book-list-item'>
      <Button
        onClick={() => {
          book.getDownloadURL().then(res => {
            openBook(res, title);
          });
        }}
        fullWidth
      >
        {title}
      </Button>
      {showOptions && (
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreHoriz/>
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          setDialogOpen(true)
          handleMenuClose();
        }}>
          <span>Delete</span>
          <Delete/>
        </MenuItem>
      </Menu>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>
          Delete this book?
        </DialogTitle>
        <DialogActions>
          <Button onClick={()=>{
            setDialogOpen(false)
          }} color="primary">
            No
          </Button>
          <Button onClick={()=>{
            setDialogOpen(false)
            deleteBook(book);
          }} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </li>
  );
};

