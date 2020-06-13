import React, { useContext, useEffect, useState } from 'react';
import { signIn, signOut, storage, upload } from 'services/firebase/firebase';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Dropzone from 'components/dropzone';
import BookItem from 'components/pages/library/BookItem';
import { BookContext } from 'App';

export default withRouter(({ history }) => {
  const { user, setUser } = useContext(BookContext);
  const [books, setBooks] = useState([]);
  const [sampleBooks, setSampleBooks] = useState([]);

  const fetchBooks = ()=>{
    if (user) {
      const id = user.uid;
      const ref = storage.ref().child(`data/${id}/`);
      ref.listAll().then((res) => {
        setBooks(res.items);
      });
    }

    const sampleRef = storage.ref().child('public/');
    sampleRef.listAll().then((res)=>{
      setSampleBooks(res.items);
    })
  }

  useEffect(() => {
    fetchBooks();
  }, [user]);


  const bookList = (books = []) => (
    books.map((book) => {
        return (
          <BookItem
            key={`book-${book.location.path}`}
            book={book}
            history={history}
          />
        );
      },
    )
  );

  return (
    <>
      <p>Library</p>
      {user && (
        <p>
          Signed in as: {user.displayName}
        </p>
      )}
      <Button onClick={() => {
        signIn(setUser).then(() => {
          fetchBooks();
        });
      }}>
        sign in
      </Button>
      <Button onClick={() => {
        signOut(setUser);
        setBooks([]);
      }}>
        Sign out
      </Button>

      <Dropzone {...{
        onDrop: (files) => {
          const id = user.uid;
          upload(files[0], `/data/${id}/${files[0].path}`).then(() => {
            fetchBooks();
          });
        },
      }}>
        Drop here
      </Dropzone>

      <p>Your books:</p>
      <ul>
        {bookList(books)}
      </ul>
      <p>Sample Books:</p>
      <ul>
        {bookList(sampleBooks)}
      </ul>
    </>
  );
});
