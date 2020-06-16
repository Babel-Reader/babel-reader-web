import React from 'react';
import { useDropzone } from 'react-dropzone';
import "./Dropzone.scss"

export default (props)=>{
  const { onDrop=()=>{}, accept='.pdf', children } = props;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept
  });

  return (
    <section {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <div>
        {children}
      </div>
    </section>
  )
}
