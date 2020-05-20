import React from 'react';
import './App.css';
import { Document, Page } from 'react-pdf'
import Translate from "./translate-api/Translate";

function App() {
  const onClick = ({target})=>{
    if (target) {
      const text = target.textContent;
      Translate(text, (res)=>{
        console.log(res);
      });
    }
  }

  return (
    <div className="App">
      <div>
        <Document
          file="sample.pdf"
          renderMode="svg"
        >
          <Page pageNumber={1}
                onClick={onClick}
          />
        </Document>
        <p>Page {1} of {1}</p>
      </div>
    </div>
  );
}

export default App;
