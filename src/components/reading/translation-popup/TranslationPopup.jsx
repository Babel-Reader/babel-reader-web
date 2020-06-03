import React from "react";

import './TranslationPopup.scss'

export default ({selected, children})=>{

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
