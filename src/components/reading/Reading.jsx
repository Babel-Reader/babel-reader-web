import {withRouter} from 'react-router-dom';
import {Document, Page} from "react-pdf";
import React, {useContext} from "react";
import Translate from "../../translate-api/Translate";

import './Reading.scss'
import {BookContext} from "../home/Home";

const Reading = () => {
  const {languages, file, pageNb, setPageNb, pageCount, setPageCount} = useContext(BookContext);


  const {in: inLang, out: outLang} = languages;

  const onClick = ({target}) => {
    if (target) {
      const text = target.textContent;
      if (text) {
        Translate(text, {inLang, outLang}, (res) => {
          alert(res);
        });
      }
    }
  }

  return (
    <div className='reading-container'>
      <div className='nav-btn-back'
           onClick={()=>{
             if (pageNb > 1) {
               setPageNb(pageNb - 1)
             }
           }}
      >
        {'<'}
      </div>
      <Document
        className='reading-document'
        onLoadSuccess={({numPages})=>{
          setPageCount(numPages)
        }}
        file={file}>
        <Page pageNumber={pageNb} onClick={onClick}/>
      </Document>
      <div className='nav-btn-forward'
           onClick={()=>{
             if (!pageCount || pageNb < pageCount) {
               setPageNb(pageNb+1);
             }
           }}
      >
        {'>'}
      </div>
    </div>
  );
}

export default withRouter(Reading);
