import React from 'react';
import { Typography } from 'antd';
import { LogoFooter } from '../../../assets/images';
import './copyright.scss'

const { Text, Title } = Typography;

const Copyright: React.FC = ():JSX.Element => {
  return (
    <div className='homepage-footer'>
      <div className='footer-logo'>
        <LogoFooter />
      </div>
      <Title level={3} className='homepage-footer-title mt-18'>
        Secured Transactions
      </Title>
      <Text type='secondary' className='homepage-footer-content mt-18'>
        Copyright © <strong>Cyguard</strong> {(new Date()).getFullYear()}. All Rights Reserved
      </Text>
    </div>
  );
};

export default Copyright;
