import React, {useContext} from 'react';
import './Header.scss';
import {useDropzone} from 'react-dropzone';
import {Autocomplete} from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import {bookTitle} from '../../utils';
import {BookContext} from '../home/Home';
import {getLanguageList} from '../../App';
import {isSignedIn, signIn, signOut, storage} from "../../services/firebase/firebase";
import Button from "@material-ui/core/Button";


const LangInput = ({ value, onChange, options = getLanguageList(), label }) => (
  <Autocomplete
    className="lang-combo-box"
    options={options}
    value={value}
    onChange={onChange}
    getOptionLabel={(option) => option.nativeName || option.name || option.key}
    renderInput={(params) => <TextField {...params} label={label} />}
  />
);

export default () => {
  const { file, setFile, languages, setLanguages } = useContext(BookContext);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles[0] && setFile(acceptedFiles[0]);
      if (isSignedIn()) {
        //todo: avoid name collision. Arrange by user
        const reference1 = storage.ref().child('book.pdf');
        reference1.put(acceptedFiles[0]).then(() => {
          console.log("done")
        }, (e) => {
          console.error(e)
        })
      }

    },
    accept: '.pdf',
  });

  return (
    <header className="home-header">
      <section {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div />
        <div className="header-title">
          <p className="header-book-title">
            {bookTitle(file)}
          </p>
          <i>Click to open a book</i>
        </div>
      </section>
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
            options: getLanguageList().slice(1),
          }}
        />
      </div>

      <Button onClick={()=>{
        signIn();
      }}>
        sign in
      </Button>
      <Button onClick={()=>{
        signOut();
      }}>
        Sign out
      </Button>

    </header>
  );
};
