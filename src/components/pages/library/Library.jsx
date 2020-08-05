import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from 'services/firebase/firebase';
import { withRouter } from 'react-router-dom';
import Dropzone from 'components/dropzone';
import { BookContext } from 'App';
import './Library.scss';
import Header from 'components/pages/library/header';
import BookList, { BookListUploading } from 'components/pages/library/BookList/BookList';
import IconButton from '@material-ui/core/IconButton';
import { Refresh } from '@material-ui/icons';

export const LibraryContext = createContext({})

export default withRouter(({ history }) => {
  const { user, setFile } = useContext(BookContext);
  const [books, setBooks] = useState([]);
  const [sampleBooks, setSampleBooks] = useState([]);
  const [uploadingBooks, setUploadingBooks] = useState([]);

  const fetchBooks = () => {
    if (user) {
      const id = user.uid;
      const ref = storage.ref().child(`data/${id}/`);
      ref.listAll().then((res) => {
        setBooks(res.items);
      });
    } else {
      setBooks([]);
    }

    const sampleRef = storage.ref().child('public/');
    sampleRef.listAll().then((res) => {
      setSampleBooks(res.items);
    });
  };

  useEffect(fetchBooks, [user]);

  const openBook = (url, name)=>{
    setFile({
      name,
      url,
    })
    history.push(`/reading/${name}`);
  }

  const uploadBooks = (books)=>{
    setUploadingBooks(books.map(book => {
        return {
          file: book,
          uploadUrl: `/data/${user.uid}/${book.path}`,
        };
      },
    ));
  }

  return (
    <LibraryContext.Provider value={{
      books,
      setBooks,
      uploadingBooks,
      setUploadingBooks,
      sampleBooks,
      setSampleBooks,
      fetchBooks,//todo
      openBook
    }    }>

      <div className='library'>
        <Header {...{ history }}/>
        <div className='library-content'>
          <Dropzone {...{
            onDrop: (files) => {
              if (files[0]) {
                user ?
                  uploadBooks(files) :
                  openBook(files[0]);
              }
            },
          }}>
            Drop a PDF book here or click to open
          </Dropzone>
          <IconButton onClick={fetchBooks}>
            <Refresh/>
          </IconButton>
          <ul className='book-list'>
            <BookListUploading />
          </ul>
          {user && (
            <div>
              <h2>Your books:</h2>
              <ul className='book-list'>
                <BookList list={books} />
              </ul>
            </div>
          )}
          <h2>Sample Books:</h2>
          <ul className='book-list'>
            <BookList list={sampleBooks} readOnly/>
          </ul>

        </div>
      </div>
    </LibraryContext.Provider>
  );
});
