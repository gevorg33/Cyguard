import React, { FC } from 'react';
import { Card } from 'antd';
import { FeatureOne, ChevronRight } from '../../../assets/images';
import './card-feature.scss';

const { Meta } = Card;

const CardFeature:FC<any> = ():JSX.Element => {
return(
  <div className="site-card-wrapper">
      <Card
        bordered={true}
        cover={<FeatureOne/>}
        className='card-component'
      >
        <Meta
          title="Feature 01"
          description={[
            <div key={1}>
              <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</p>
            </div>
          ]}
        />
        <span className='card-footer'> find out more <span className='ml-5 v-a-mid'><ChevronRight/></span></span>
      </Card>
  </div>
)
}

export default CardFeature;