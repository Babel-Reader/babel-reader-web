import React, { useContext } from 'react';
import { LibraryContext } from 'components/pages/library/Library';
import BookItem from 'components/pages/library/BookList/BookItem';
import BookItemUploading from 'components/pages/library/BookList/BookItemUploading';

const BookList =  ({list, showOptions=false})=>{
  const { setBooks } = useContext(LibraryContext);

  const deleteBook = (book)=>{
    book.delete().then(()=>{
      setBooks(prevBooks=>prevBooks.filter((v)=>v!==book));
    })
  }

  return (
    list.map((book) => (
      <BookItem
        key={`book-${book.location.path}`}
        {...{ book, showOptions, deleteBook }}
      />
    ))
  );

}

export const BookListUploading = ()=>{
  const {uploadingBooks } = useContext(LibraryContext)

  return (
    uploadingBooks.map((book) => {
        return (
          <BookItemUploading
            key={`book-${book.uploadUrl}`}
            book={book.file}
            uploadUrl={book.uploadUrl}
          />
        );
      },
    )
  );

}

export default BookList;
