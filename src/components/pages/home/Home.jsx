import React from 'react';
import Reading from './reading/Reading';
import './Home.scss';
import Header from './header/Header';
import Footer from './footer/Footer';
import { withRouter } from 'react-router-dom';


export default withRouter(({history}) => {

  return (
    <section className="container">
      <Header history={history}/>
      <Reading/>
      <Footer {...{}} />
    </section>
  );
});
