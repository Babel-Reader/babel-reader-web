import React, { useContext, useState } from 'react';
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
import LangInput from 'components/LangInput';
import { BookContext } from 'App';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export const InfoSection = ({label, children})=>{

  return (
    <TableRow>
      <TableCell>
        {label}
      </TableCell>
      <TableCell align='right'>
        {children}
      </TableCell>
    </TableRow>
  )
}

export default ({
  open,
  book,
  metadata,
  setMetadata,
  onClose=()=>{}
}) => {
  if (!metadata) {
    return null;
  }

  const [newMetadata, setNewMetadata] = useState(metadata);
  const {languageList} = useContext(BookContext)

  const updatedDate = new Date(newMetadata.updated);
  const createdDate = new Date(newMetadata.timeCreated);
  const { customMetadata = {} } = newMetadata;
  const { language } = customMetadata;

  const update = ()=>{
    book.updateMetadata({ customMetadata: newMetadata.customMetadata})
    setMetadata(newMetadata)
  }

  const isDirty = JSON.stringify(metadata) !== JSON.stringify(newMetadata);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {getBookName(book, metadata)}
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table className='table'>
            <TableBody>
              <InfoSection label='File Name'>{book.name}</InfoSection>
              {language && (
                <InfoSection label='Book Language'>
                  <LangInput {...{
                    value: languageList.find((e) => e.key === language),
                    onChange: (e, lang) => {
                      const change = {
                        ...newMetadata,
                        customMetadata: {
                          ...newMetadata.customMetadata,
                          language: lang.key,
                        },
                      };
                     setNewMetadata(change);
                    },
                  }}/>
                </InfoSection>
              )}
              <InfoSection label='Last Updated'>{updatedDate.toDateString()}</InfoSection>
              <InfoSection label='Date Created'>{createdDate.toDateString()}</InfoSection>
              <InfoSection label='Size'>{`${metadata.size} KB`}</InfoSection>
            </TableBody>
          </Table>
        </TableContainer>
        {isDirty && (
          <DialogActions>
          <Button onClick={() => setNewMetadata(metadata)} color="primary">
            Cancel
          </Button>
          <Button onClick={update} color="primary">
            save
          </Button>
        </DialogActions>
        )}
      </DialogContent>
    </Dialog>
  );
}
