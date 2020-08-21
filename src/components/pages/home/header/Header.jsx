import React, { useContext, useState } from 'react';
import './Header.scss';
import { BookContext } from 'App';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, Settings } from '@material-ui/icons';
import OptionsModal from 'components/pages/home/header/OptionsModal';
import LangInput from 'components/LangInput';

export default ({history}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { languages, setLanguages, languageList, user, setUser } = useContext(BookContext);

  return (
    <AppBar position='static' className='home-header'>
      <Toolbar>
        <div className='header-section left'>
          <IconButton
            onClick={() => history.push('/')}
          >
            <ArrowBack/>
          </IconButton>
          <div className="lang-input header-section">
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
          </div>
        </div>

        <IconButton onClick={() => setDialogOpen(true)}>
          <Settings/>
        </IconButton>
        <OptionsModal
          {...{
            open: dialogOpen,
            setOpen: setDialogOpen,
            user,
            setUser,
          }}
        />

      </Toolbar>
    </AppBar>
  );
};
