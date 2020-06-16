import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './PageInput.scss';

export default ({ pageNb, setPageNb, pageCount }) => {
  const [value, setValue] = useState(pageNb);

  useEffect(() => {
    setValue(pageNb);
  }, [pageNb]);

  const validate = (newValue) => {
    const numValue = parseInt(newValue);
    if (!numValue || numValue <= 0) {
      return false;
    }
    if (pageCount && numValue > pageCount) {
      return false;
    }
    return true;
  };

  const onSubmit = (event) => {
    if (validate(value)) {
      setPageNb(parseInt(value));
    } else {
      setValue(pageNb);
    }
    event.preventDefault();
  };
  return (
    <div className="page-input">
      <form onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={() => setValue(pageNb)}
          inputProps={{ style: { textAlign: 'right' } }}
        />
      </form>
      <div className="page-input-total">
        {pageCount ? ` / ${pageCount}` : ''}
      </div>
    </div>
  );
};
