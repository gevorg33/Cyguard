import { NotationIcon } from '../../../../assets/images';
import { Button, Typography } from 'antd';
import React from 'react';
import './background-content.scss'

const BackgroundContent:React.FC<any> = ():JSX.Element =>(
  <div className='background-content-section'>
    <div className='notation-icon'>
      <NotationIcon />
    </div>
    <div className='main-content-description'>
      <Typography.Title className='content-title'>
        Your payout information is secure with to <span className='c-green'>Cyguard</span>
      </Typography.Title>
    </div>

    <div className='action-button-section'>
      <Button
        size='large'
        className='call-to-action-button'>
        Call to action
      </Button>
    </div>
  </div>
)

export default BackgroundContent;