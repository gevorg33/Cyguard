import React from 'react';
import { Typography } from 'antd';
import CardFeature from '../../../organisms/card-feature/card-feature';
import './features-section.scss';

const FeaturesComponent:React.FC<any> = ():JSX.Element => (
  <div className='features-section'>
    <Typography.Title className='feature-title' level={1}>
      Key Features
    </Typography.Title>
    <div className='card-section'>
      <CardFeature />
      <CardFeature />
      <CardFeature />
    </div>
  </div>
)

export default FeaturesComponent;