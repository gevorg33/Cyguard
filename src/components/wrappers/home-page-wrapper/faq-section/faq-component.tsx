import React, { FC } from 'react';
import { Typography } from 'antd';
import FaqDescription from './faq-description/faq-description';
import './faq-section.scss';

const FaqComponent:FC<any> = ():JSX.Element => {
  const arr = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div className='faq-section mt-60'>
        <Typography.Title className='faq-title' level={1}>
          FAQ
        </Typography.Title>
        {arr.map(item => <FaqDescription key={item} />)}
      </div>
    </>
  );
}

export default FaqComponent;