import React, { useContext, useState } from 'react';
import Reading from './reading/Reading';
import './Home.scss';
import Header from './header/Header';
import Footer from './footer/Footer';
import { withRouter, useParams } from 'react-router-dom';
import { BookContext } from 'App';
import { storage } from 'services/firebase/firebase';


export const ReadingContext = React.createContext({})

export default withRouter(({history, isSample = false}) => {
  const [pageCount, setPageCount] = useState();
  const [pageNb, setPageNb] = useState(1);
  const [pageScale, setPageScale] = useState(1);
  const { file, setFile, user } = useContext(BookContext);
  const { bookName } = useParams();

  if (!file) {
    const url = (isSample ?
      "public/" :
      `data/${user?.id}/`)
      + bookName;
    const ref = storage.ref().child(url);

    if (ref) {
      ref.getDownloadURL().then(res => setFile({ url: res, name: bookName })).catch(() => history.push('/'));
      //todo: 404
    }else{
      history.push('/');
    }
  }

  return (
    <ReadingContext.Provider value={{
      pageCount,
      setPageCount,
      pageNb,
      setPageNb,
      pageScale,
      setPageScale,
    }} >
      <div className="container">
        <Header history={history}/>
        {!!file && <Reading file={file}/>}
        <Footer/>
      </div>
    </ReadingContext.Provider>
  );
});
