import React from 'react';
import {Footer, Header} from '../../components';
import {Banner, Contact, Feature, Figure, Hero, Services, Works,} from './components';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Feature />
      <Figure />
      <Works />
      <Contact />
      <Banner />
      <Footer />
    </>
  );
};

export default Home;
