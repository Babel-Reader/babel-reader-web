import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './BookInfoModal.scss';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import { getBookName } from 'components/pages/library/BookList/BookItem/BookItem';

export const InfoSection = ({label, value})=>{

  return (
    <TableRow>
      <TableCell>
        {label}
      </TableCell>
      <TableCell align='right'>
        {value}
      </TableCell>
    </TableRow>
  )
}

export default ({
  open,
  book,
  metadata,
  onClose=()=>{}
}) => {
  let updatedDate;
  let createdDate;

  if (metadata) {
    updatedDate = new Date(metadata.updated);
    createdDate = new Date(metadata.timeCreated);
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
    >
      {metadata && (
        <div>
          <DialogTitle>
            {getBookName(book, metadata)}
          </DialogTitle>
          <DialogContent>
            <TableContainer>
              <Table className='table'>
                <TableBody>
                  <InfoSection label='File Name' value={book.name}/>
                  <InfoSection label='Last Updated' value={updatedDate.toDateString()}/>
                  <InfoSection label='Date Created' value={createdDate.toDateString()}/>
                  <InfoSection label='Size' value={`${metadata.size} KB`}/>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}
