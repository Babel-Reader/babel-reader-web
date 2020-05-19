import React from 'react';
import './App.css';
import { Document, Page } from 'react-pdf'

function App() {
  return (
    <div className="App">
      <div>
        <Document
          file="sample.pdf"
          renderMode="svg"
        >
          <Page pageNumber={1}
                onClick={(a)=>{
                  console.log("onclick:", a)
                  const b = a.target
                  console.log(b)
                  if(b){
                    console.log(b.innerHTML)
                  }
                }}
          />
        </Document>
        <p>Page {1} of {1}</p>
      </div>
    </div>
  );
}

export default App;
