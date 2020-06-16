import React, { useContext, useEffect, useState } from 'react';
import { storage, upload } from 'services/firebase/firebase';
import { withRouter } from 'react-router-dom';
import Dropzone from 'components/dropzone';
import BookItem from 'components/pages/library/BookItem';
import { BookContext } from 'App';
import './Library.scss';
import Header from 'components/pages/library/header';

export default withRouter(({ history }) => {
  const { user, setFile } = useContext(BookContext);
  const [books, setBooks] = useState([]);
  const [sampleBooks, setSampleBooks] = useState([]);

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

  const openBook = (book)=>{
    setFile(book);
    history.push('/');
  }

  const uploadBook = (book)=>{
    const task = upload(book, `/data/${user.uid}/${book.path}`);
    task.on('state_changed', ()=>{
      //todo: progress bar
    }, (err)=>{
      console.error(err)
    }, fetchBooks);
  }

  const bookList = (books = []) => (
    books.map((book) => {
        return (
          <BookItem
            key={`book-${book.location.path}`}
            book={book}
            openBook={openBook}
          />
        );
      },
    )
  );

  return (
    <div className='library'>
      <Header {...{ history }}/>
      <div className='library-content'>
        <Dropzone {...{
          onDrop: (files) => {
            if (files[0]) {
              user ?
                files.forEach(uploadBook) :
                openBook(files[0]);
            }
          },
        }}>
          Drop a PDF book here or click to open
        </Dropzone>
        {user && (
          <div>
            <h2>Your books:</h2>
            <ul className='book-list'>
              {bookList(books)}
            </ul>
          </div>
        )}
        <h2>Sample Books:</h2>
        <ul className='book-list'>
          {bookList(sampleBooks)}
        </ul>

      </div>
    </div>
  );
});
