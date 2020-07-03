import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import './BookItem.scss';
import IconButton from '@material-ui/core/IconButton';
import { Delete, MoreHoriz } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { LibraryContext } from 'components/pages/library/Library';
import BookInfoModal from 'components/pages/library/BookList/BookItem/BookInfoModal';
import BookRenameModal from 'components/pages/library/BookList/BookItem/BookRenameModal';

export const getBookName = (book, metadata) =>{
  //todo: test
  if (!metadata) {
    return book ? book.name : '';
  }

  if (!metadata.customMetadata) {
    return metadata.name;
  }

  return metadata.customMetadata.displayName || metadata.name;

}

export const BookItemModalTypes = {
  NONE: 'NONE',
  RENAME: 'RENAME',
  DELETE: 'DELETE',
  INFO: 'INFO'
}

export default ({
  book,
  readOnly=false,
  deleteBook=()=>{}
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedDialog, setOpenedDialog] = useState(BookItemModalTypes.NONE)
  const [metadata, setMetadata] = useState();
  const {openBook} = useContext(LibraryContext)

  useEffect(() => {
    if (!metadata) {
      book.getMetadata().then(setMetadata);
    }
  }, [book, metadata]);


  const handleMenuClose = ()=>{
    setAnchorEl(null);
  }

  return (
    <li className='book-list-item'>
      <Button
        onClick={() => {
          book.getDownloadURL().then(res => {
            openBook(res, book.name);
          });
        }}
        fullWidth
      >
        {getBookName(book, metadata)}

      </Button>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreHoriz/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=>{
          setOpenedDialog(BookItemModalTypes.INFO)
        }}>
          <span>About</span>
        </MenuItem>

        {!readOnly && (
          <>
            <MenuItem onClick={() => {
              setOpenedDialog(BookItemModalTypes.RENAME)
              handleMenuClose();
            }}>
              <span>Rename</span>
              <EditIcon/>
            </MenuItem>
            <MenuItem onClick={() => {
              setOpenedDialog(BookItemModalTypes.DELETE)
              handleMenuClose();
            }}>
              <span>Delete</span>
              <Delete/>
            </MenuItem>
          </>
        )}
      </Menu>
      <Dialog
        open={openedDialog === BookItemModalTypes.DELETE}
        onClose={() => setOpenedDialog(BookItemModalTypes.NONE)}
      >
        <DialogTitle>
          Delete this book?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => {
            setOpenedDialog(null);
          }} color="primary">
            No
          </Button>
          <Button onClick={() => {
            setOpenedDialog(null);
            deleteBook(book);
          }} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <BookInfoModal {...{
        open: openedDialog === BookItemModalTypes.INFO,
        onClose: () => setOpenedDialog(BookItemModalTypes.NONE),
        book,
        metadata,
      }}/>
      <BookRenameModal {...{
        open: openedDialog === BookItemModalTypes.RENAME,
        onClose: () => setOpenedDialog(BookItemModalTypes.NONE),
        metadata,
        setMetadata,
        book
      }}/>
    </li>
  );
};

