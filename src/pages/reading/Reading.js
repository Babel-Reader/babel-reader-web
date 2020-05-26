import {withRouter} from 'react-router-dom';
import {Document, Page} from "react-pdf";
import React from "react";
import Translate from "../../translate-api/Translate";

const Reading = ({file = 'sample.pdf', inLang = '', outLang = 'en'}) => {

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
    <>
      <Document
        file={file}>
        <Page pageNumber={1} onClick={onClick}/>
      </Document>
    </>
  );
}

export default withRouter(Reading);
