import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { BookContext } from 'App';

export default ({book, history})=>{
  const [title, setTitle] = useState('')
  const { setFile } = useContext(BookContext);

  useEffect(()=>{
    book.getMetadata().then((res)=>{
      setTitle(res.name)
    })
  }, [book])

  return (
    <li>
      <Button
        onClick={() => {
          book.getDownloadURL().then(res => {
            setFile(res);
            history.push('/');
          });
        }}
      >{title}</Button>
    </li>
  )
}
