import React, { useState } from 'react';
import Reading from './reading/Reading';
import './Home.scss';
import Header from './header/Header';
import Footer from './footer/Footer';
import { withRouter } from 'react-router-dom';

export const ReadingContext = React.createContext({})

export default withRouter(({history}) => {
  const [pageCount, setPageCount] = useState();
  const [pageNb, setPageNb] = useState(1);
  const [pageScale, setPageScale] = useState(1);

  return (
    <ReadingContext.Provider value={{
      pageCount,
      setPageCount,
      pageNb,
      setPageNb,
      pageScale,
      setPageScale
    }} >
      <div className="container">
        <Header history={history}/>
        <Reading/>
        <Footer/>
      </div>
    </ReadingContext.Provider>
  );
});
