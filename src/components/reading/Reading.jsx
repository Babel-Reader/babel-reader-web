import {withRouter} from 'react-router-dom';
import {Document, Page} from "react-pdf";
import React, {useContext, useState} from "react";
import Translate from "../../translate-api/Translate";

import './Reading.scss'
import {BookContext} from "../home/Home";
import TranslationPopup from "./translation-popup/TranslationPopup";


const Reading = () => {
  const {languages, file, pageNb, setPageNb, pageCount, setPageCount} = useContext(BookContext);
  const [selected, setSelected] = useState();
  const [translation, setTranslation] = useState('')

  const {in: inLang, out: outLang} = languages;


  const select = (target) => {
    setTranslation('')
    if (selected) {
      selected.className = selected.className.split(' selected')[0]
    }

    if (target) {
      target.className += " selected";
    }
    setSelected(target);
  }

  const onClick = ({target}) => {
    let selection = null;
    if (target) {
      const text = target.textContent;
      if (text) {
        selection = target;
        Translate(text, {inLang, outLang}, (res) => {
          setTranslation(res);
        });
      }
    }
    select(selection)
  }

  return (
    <div className='reading-container'>
      <div className='nav-btn-back'
           onClick={() => {
             setSelected(null);
             if (pageNb > 1) {
               setPageNb(pageNb - 1)
             }
           }}
      >
        {'<'}
      </div>
      <Document
        className='reading-document'
        onLoadSuccess={({numPages}) => {
          setPageCount(numPages)
        }}
        file={file}>
        <Page pageNumber={pageNb} onClick={onClick}>
          {/*todo get page width?*/}
          {selected && (
            <TranslationPopup selected={selected} translation={translation}>
              {translation}
            </TranslationPopup>
          )}
        </Page>
      </Document>
      <div className='nav-btn-forward'
           onClick={() => {
             setSelected(null);
             if (!pageCount || pageNb < pageCount) {
               setPageNb(pageNb + 1);
             }
           }}
      >
        {'>'}
      </div>
    </div>
  );
}

export default withRouter(Reading);
