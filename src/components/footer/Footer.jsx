
import React, {useContext} from 'react'
import {BookContext} from "../home/Home";
import PageInput from "./page-input/PageInput";

import './Footer.scss'

export default ()=>{
  const {pageNb, setPageNb, pageCount} = useContext(BookContext);

  return (
    <footer className='home-footer'>
      <PageInput {...{pageNb, setPageNb, pageCount}}/>
    </footer>
  )
}
