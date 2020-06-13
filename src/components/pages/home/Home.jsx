import React from 'react';
import Reading from './reading/Reading';
import './Home.scss';
import Header from './header/Header';
import Footer from './footer/Footer';


export default () => {

  return (
    <section className="container">
      <Header/>
      <Reading/>
      <Footer {...{}} />
    </section>
  );
};
