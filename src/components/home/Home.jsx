import React, { useEffect, useState } from 'react';
import Reading from '../reading/Reading';
import './Home.scss';
import Header from '../header/Header';
import { bookTitle } from '../../utils';
import Footer from '../footer/Footer';
import { getLanguageList } from '../../App';

export const BookContext = React.createContext({});


export default () => {
  const [file, setFile] = useState("ALICE'S ADVENTURES IN WONDERLAND.pdf");
  const [pageNb, setPageNb] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [pageScale, setPageScale] = useState(1);
  const [languages, setLanguages] = useState({
    'in': getLanguageList()[0],
    'out': getLanguageList()[2]
  });

  useEffect(()=>{
    const title = bookTitle(file);
    const pageTitle = 'Babel Reader'
    document.title = title ? `${pageTitle}: ${title}` : pageTitle;
  }, [file])

  return (
    <BookContext.Provider
      value={{
        file,
        setFile,
        pageNb,
        setPageNb,
        pageCount,
        setPageCount,
        languages,
        setLanguages,
        pageScale,
        setPageScale,
      }}
    >
      <section className="container">
        <Header />
        <Reading />
        <Footer {...{}} />
      </section>
    </BookContext.Provider>
  );
};
