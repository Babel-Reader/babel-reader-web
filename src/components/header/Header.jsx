import React, {useContext} from "react";
import './Header.scss'
import {useDropzone} from "react-dropzone";
import {Autocomplete} from "@material-ui/lab";
import {languageList} from "../../utils";
import TextField from "@material-ui/core/TextField";
import {BookContext} from "../home/Home";

const LangInput = ({value, onChange}) => {

  return (
    <Autocomplete
      className="lang-combo-box"
      options={languageList}
      value={value}
      onChange={onChange}
      getOptionLabel={(option) => option.key}
      renderInput={(params) => <TextField {...params} label="Inlang" />}
    />
  )
}

export default () => {
  const {
    file,
    setFile,
    languages,
    setLanguages,
  } = useContext(BookContext);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles[0] && setFile(acceptedFiles[0]);
    },
    accept: '.pdf'
  });

  return (
    <header className='home-header'>
      <section {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div>

        </div>
        <div className='header-title'>
          <p className='header-book-title'>
            {file ? (typeof file === 'string' ? file : file.path) : ''}
          </p>
          <i>Click to open a book</i>
        </div>
      </section>

      <div className="lang-input">
        <LangInput {...{
          value: languages.in,
          onChange: (e, lang) => {
            setLanguages({
              ...languages,
              in: lang
            })
          }
        }}/>

        <LangInput {...{
          value: languages.out,
          onChange: (e, lang) => {
            setLanguages({
              ...languages,
              out: lang
            })
          }
        }}/>
      </div>

    </header>
  );
};
