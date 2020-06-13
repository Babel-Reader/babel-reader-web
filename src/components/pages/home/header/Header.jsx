import React, { useContext } from 'react';
import './Header.scss';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { signIn, signOut } from 'services/firebase/firebase';
import Button from '@material-ui/core/Button';
import { BookContext } from 'App';

export default () => {
  const { languages, setLanguages, languageList, user, setUser } = useContext(BookContext);

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
    <header className="home-header">

      <div className="lang-input">
        <LangInput
          {...{
            label: 'Inlang',
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
            label: 'Outlang',
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
      {!!user && (
        <div>
          <div>
            Logged in as: {user.displayName}
          </div>
          <Button onClick={() => {
            signOut(setUser);
          }}>
            Sign out
          </Button>
        </div>
      )}
      {!user && (

        <Button onClick={() => {
          signIn(setUser);
        }}>
          sign in
        </Button>
      )}
      <Button href='/library'>
        Library
      </Button>

    </header>
  );
};
