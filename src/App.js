import React, {useState} from 'react';
import './App.css';
import { Document, Page } from 'react-pdf'
import Translate from "./translate-api/Translate";

function App() {
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
      <Document
        file="sample.pdf">
        <Page pageNumber={1} onClick={onClick}/>
      </Document>
    </div>
  );
}

export default App;
