import { Document, Page } from 'react-pdf';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Translate from '../../translate-api/Translate';

import './Reading.scss';
import { BookContext } from '../home/Home';
import TranslationPopup from './translation-popup/TranslationPopup';

const Reading = () => {
  const {
    languages,
    file,
    pageNb,
    setPageNb,
    pageCount,
    setPageCount,
    pageScale,
    setPageScale,
  } = useContext(BookContext);
  const [selected, setSelected] = useState();
  const [translation, setTranslation] = useState('');
  const ref = useRef();

  const { in: inLang, out: outLang } = languages;

  const select = (target) => {
    setTranslation('');
    if (selected) {
      selected.classList.remove('selected')
    }

    setSelected(target);
  };

  const onClick = ({ target }) => {
    let selection = null;

    if (target && target.parentElement.classList.contains('react-pdf__Page__textContent')) {
     target.classList.add("selected")
      const text = target.textContent;
      if (text) {
        selection = target;
        Translate(text, { inLang, outLang }, (res) => {
          setTranslation(res);
        });
      }
    }

    select(selection);
  };

  useEffect(() => {
    setPageScale(1);
  }, [pageNb, setPageScale]);

  return (
    <div className="reading-container" ref={ref}>
      {pageNb > 1 && 
      <div
        className="nav-btn-back"
        onClick={() => {
          setSelected(null);
          if (pageNb > 1) {
            setPageNb(pageNb - 1);
          }
        }}
      >
        {'<'}
      </div>}
      {pageNb <= 1 &&
      <div
        className="nav-btn-back-disabled"
      />}
      <Document
        className="reading-document"
        onLoadSuccess={({ numPages }) => {
          setPageCount(numPages);
        }}
        file={file}
      >
        <Page
          className={`reading-page`}
          pageNumber={pageNb}
          onClick={onClick}
          scale={pageScale}
          onLoadSuccess={(page) => {
            const widthRatio = ref.current.offsetWidth / page.width || 1;
            const heightRatio = ref.current.offsetHeight / page.height || 1;

            setPageScale(Math.min(widthRatio, heightRatio));
          }}
        >
          {selected && translation && (
          <TranslationPopup selected={selected} translation={translation}>
            {translation}
          </TranslationPopup>
          )}
        </Page>
      </Document>
      {pageNb < pageCount && 
      <div
        className="nav-btn-forward"
        onClick={() => {
          setSelected(null);
          if (!pageCount || pageNb < pageCount) {
            setPageNb(pageNb + 1);
          }
        }}
      >
        {'>'}
      </div>}
      {pageNb >= pageCount &&
      <div
        className="nav-btn-forward-disabled"
      />}
    </div>
  );
};

export default Reading;
