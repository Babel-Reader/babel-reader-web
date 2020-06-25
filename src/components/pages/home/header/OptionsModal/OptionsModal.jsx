import React, { useContext } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Login from 'components/login';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import './OptionsModal.scss'
import { BookContext } from 'App';
import DialogContentText from '@material-ui/core/DialogContentText';

export default ({
  open,
  setOpen,
  user,
  setUser,
  LangInput,
})=>{
  const { languages, setLanguages, languageList } = useContext(BookContext);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent className='dialog-content'
      >
        <Login {...{ user, setUser }}/>
        <Divider />

          <LangInput
            {...{
              label: 'Book Language',
              value: languages.in,
              onChange: (e, lang) => {
                setLanguages({
                  ...languages,
                  in: lang,
                });
              },
            }}
          />

          <LangInput
            {...{
              label: 'Translation Language',
              value: languages.out,
              onChange: (e, lang) => {
                setLanguages({
                  ...languages,
                  out: lang,
                });
              },
              options: languageList.slice(1),
            }}
          />


        <Divider/>
        <DialogContentText id='dialog-content-recent-books'>
          Recent Books
        </DialogContentText>
        <div className='recent-books-box'>

        </div>

      </DialogContent>
    </Dialog>
  )
}
