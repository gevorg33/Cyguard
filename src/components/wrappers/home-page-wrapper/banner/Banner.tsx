import React, { FC } from 'react';
import { Row, Typography, Col, Button } from 'antd';
import HelpComponent from '../../../atoms/help-component/help-component';
import SignIn from '../../../../pages/sign-in/sign-In';
import './banner.scss';

const Banner: FC<any> = (): JSX.Element => {
  return (
    <div className='banner__wrapper'>

      <div className='content-wrapper'>
        <Col className='content-description'>
          <Row justify='start'>

            <div className='title-section'>
              <Typography.Title level={1} className='welcome-title'>
                Welcome to <span className='welcome-title c-green'>Cyguard</span>
              </Typography.Title>
              <Typography.Title level={2} className='main-title c-green'>
                secure payout services
              </Typography.Title>
            </div>

            <div className='paragraph-section'>
              <Typography.Paragraph className='paragraph-txt c-white'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
                Morbi a bibendum metus. Donec scelerisque sollicitudin enim eus
                venenatis.
              </Typography.Paragraph>
            </div>

            <div className='action-button-section'>
              <Button
                size='large'
                className='call-to-action-button'>
                Call to action
              </Button>
            </div>
          </Row>

          <HelpComponent />

        </Col>
        <Col className='login-section'>
          <Row justify='end'>
            <div>
              <SignIn />
            </div>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default Banner;