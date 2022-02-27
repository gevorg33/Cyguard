import React, { FC } from 'react';
import { Spin } from 'antd';

import './global-loader.scss';

const GlobalLoader:FC = ():JSX.Element => (
  <div className='absolute w-full h-full d-flex justify-center align-center'>
    <Spin tip='Loading...' size='large' className='' />
  </div>
);

export default GlobalLoader;
