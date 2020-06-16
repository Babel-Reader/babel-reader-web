import React, { useContext } from 'react';
import './Header.scss';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BookContext } from 'App';
import Login from 'components/login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dropzone from 'components/dropzone';

export default ({history}) => {
  const { languages, setLanguages, languageList, user, setUser, file, setFile } = useContext(BookContext);

  const LangInput = ({ value, onChange, options = languageList, label }) => {
    return (<Autocomplete
      className="lang-combo-box"
      options={options}
      value={value}
      onChange={onChange}
      getOptionLabel={(option) => option.nativeName || option.name || option.key}
      renderInput={(params) => <TextField {...params} label={label}/>}
    />);
  };


  return (
    <AppBar position='static' className='home-header'>
      <Toolbar>
        <div className='header-section left'>
          <Button
            onClick={()=>history.push('/library')}
            >
            Library
          </Button>
          <Dropzone {...{
            onDrop: (files) => {
              if (files[0]) {
                setFile(files[0]);
              }
            },
          }}>
            {`${typeof file === 'object' ? file.name : file} - Click to open a book...`}
          </Dropzone>
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

        <Login className='header-section right'
          {...{ user, setUser }}/>
      </Toolbar>
    </AppBar>
  );
};
