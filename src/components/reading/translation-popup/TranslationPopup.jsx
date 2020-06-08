import React, {useEffect, useState} from "react";

import './TranslationPopup.scss'

export default ({selected, children, maxWidth})=>{
  const [animate, setAnimate] = useState(true)

  useEffect(()=>{
    setAnimate(true);
  }, [selected])

  return (
    <div className={`translation-popup ${animate ? 'animate' : ''}`}
         onAnimationEnd={() => setAnimate(false)}
         onClick={(e)=>{
           e.stopPropagation();
         }}

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
