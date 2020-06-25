import { Document, Page } from 'react-pdf';
import React, { useContext, useEffect, useRef, useState } from 'react';

import './Reading.scss';
import TranslationPopup from './translation-popup/TranslationPopup';
import Button from '@material-ui/core/Button';
import translate from 'services/TranslateApi';
import { BookContext } from 'App';

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
        translate(text, { inLang, outLang }, (res) => {
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
      <Button
        className="nav-btn-back"
        disabled={pageNb<=1}
        onClick={() => {
          setSelected(null);
          setPageNb(pageNb - 1);
        }}
      >
        {'<'}
      </Button>
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
      <Button
        className="nav-btn-forward"
        disabled={pageNb >= pageCount}
        onClick={() => {
          setSelected(null);
          setPageNb(pageNb + 1);
        }}
      >
        {'>'}
      </Button>
    </div>
  );
};

export default Reading;
