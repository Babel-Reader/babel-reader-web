import React, { useContext, useState } from 'react';
import './Header.scss';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { BookContext } from 'App';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, Settings } from '@material-ui/icons';
import OptionsModal from 'components/pages/home/header/OptionsModal';

export default ({history}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { languages, setLanguages, languageList, user, setUser } = useContext(BookContext);

  const LangInput = ({ value, onChange, options = languageList, label }) => {
    return (<Autocomplete
      className="lang-combo-box"
      options={options}
      value={value}
      onChange={(e, lang)=>lang && onChange(e, lang)}
      getOptionLabel={(option) => option.nativeName || option.name || option.key}
      renderInput={(params) => <TextField {...params} label={label}/>}
    />);
  };


  return (
    <AppBar position='static' className='home-header'>
      <Toolbar>
        <div className='header-section left'>
          <IconButton
            onClick={() => history.push('/library')}
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
            LangInput
          }}
        />

      </Toolbar>
    </AppBar>
  );
};
