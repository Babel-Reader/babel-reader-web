import React from "react";

import './TranslationPopup.scss'

export default ({selected, children})=>{
  //todo: center on sentence and resize

  return (
    <div className='translation-popup'
         style={{
           top: selected ? selected.style.top : '',
         }}
    >
      <span className='translation-popup-content'>
        {children}
      </span>
    </div>
  );
}
