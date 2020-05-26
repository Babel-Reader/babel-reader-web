import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {useDropzone} from 'react-dropzone'
import Button from "@material-ui/core/Button";

export default withRouter(()=>{

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({accept:'.pdf'});

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
      <Button component={Link} to={`/read`} disabled={!files.length}>
        sample.pdf
      </Button>

    </section>
  );
})
