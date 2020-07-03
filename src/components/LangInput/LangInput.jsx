import React, { useContext } from 'react';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { BookContext } from 'App';

export default ({ value, onChange, options, label }) => {
  const { languageList } = useContext(BookContext);
  if (!options) {
    options = languageList;
  }

  return (
    <Autocomplete
    className="lang-combo-box"
    options={options}
    value={value}
    onChange={(e, lang)=>lang && onChange(e, lang)}
    getOptionLabel={(option) => option.nativeName || option.name || option.key}
    renderInput={(params) => <TextField {...params} label={label}/>}
  />
  );
};
