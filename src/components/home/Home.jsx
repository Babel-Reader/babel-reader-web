import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import Reading from "../reading/Reading";
import './Home.scss'
import Header from "../header/Header";
import {languageList} from "../../utils";
import Footer from "../footer/Footer";

export const BookContext = React.createContext()

export default withRouter(()=>{
  const [file, setFile] = useState("ALICE'S ADVENTURES IN WONDERLAND.pdf");
  const [pageNb, setPageNb] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [pageScale, setPageScale] = useState(1);
  const [languages, setLanguages] = useState({
    in: {
      key: 'auto'
    },
    out: languageList[1]
  })

  return (
    <BookContext.Provider value={{
      file,
      setFile,
      pageNb,
      setPageNb,
      pageCount,
      setPageCount,
      languages,
      setLanguages,
      pageScale,
      setPageScale
    }}>
      <section className="container">
        <Header />
        <Reading/>
        <Footer {...{}}/>

      </section>
    </BookContext.Provider>
  );
})
