import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import './BookItem.scss';

export default ({book, openBook})=>{
  const [title, setTitle] = useState('')

  useEffect(()=>{
    book.getMetadata().then((res)=>{
      setTitle(res.name)
    })
  }, [book])

  return (
    <li className='book-list-item'>
      <Button
        onClick={() => {
          book.getDownloadURL().then(res => {
            openBook(res)
          });
        }}
        fullWidth
      >{title}</Button>
    </li>
  )
}
