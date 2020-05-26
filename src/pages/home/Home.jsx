import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import {useDropzone} from 'react-dropzone'
import Reading from "../reading/Reading";
import {Autocomplete} from '@material-ui/lab'
import TextField from "@material-ui/core/TextField";
import './Home.css'

export default withRouter(()=>{
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({accept:'.pdf'});

  const languages = [
    {key: 'en'},
    {key: 'fr'},
    {key: 'es'},
    {key: 'de'}
  ];


  const [inLang, setInLang] = useState({key:'autodetect'});
  const [outLang, setOutLang] = useState(languages[0]);

  return (
    <section className="container">
      <div className='header'>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div className="lang-input">
          <Autocomplete
            className="lang-combo-box"
            options={languages}
            value={inLang}
            onChange={(e, lang)=>setInLang(lang)}
            getOptionLabel={(option) => option.key}
            renderInput={(params) => <TextField {...params} label="Inlang" variant="outlined" />}
          />
          <Autocomplete
            className="lang-combo-box"
            options={languages}
            value={outLang}
            onChange={(e, lang)=>setOutLang(lang)}
            getOptionLabel={(option) => option.key}
            renderInput={(params) => <TextField {...params} label="Outlang" variant="outlined" />}
          />
        </div>
      </div>
      <Reading file={acceptedFiles[0]} inLang={inLang ? inLang.key : ''} outLang={outLang ? outLang.key : ''}/>

    </section>
  );
})
