import React, { FC } from 'react';
import Banner from './banner/Banner';
import FaqComponent from './faq-section/faq-component';
import AboutComponent from './about-section/about-component';
import FeaturesComponent from './features-section/features-component';
import BackgroundContent from './backrgound-content/background-content';
import FormComponent from './form-section/form-component';
import './home-page-wrapper.scss';

const HomePageWrapper: FC<any> = ():JSX.Element => {

  return (
    <>
      <Banner />
      <AboutComponent />
      <FeaturesComponent />
      <BackgroundContent />
      <FaqComponent />
      <FormComponent />
    </>
  );
};

export default HomePageWrapper;