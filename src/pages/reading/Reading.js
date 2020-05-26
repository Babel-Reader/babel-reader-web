import {withRouter} from 'react-router-dom';
import {Document, Page} from "react-pdf";
import React from "react";
import Translate from "../../translate-api/Translate";

const Reading = ()=>{
  const file = 'sample.pdf'

  const onClick = ({target})=>{
    if (target) {
      const text = target.textContent;

      if (text) {
        Translate(text, (res)=>{
          alert(res);
        });
      }
    }
  }

  return (
    <div>
      <div>
        <Document
          file={file}
          >
          <Page pageNumber={1} onClick={onClick}/>
        </Document>
      </div>
    </div>
  );
}

export default withRouter(Reading);
