import React, { FC } from 'react';
import { Col, Row, Typography } from 'antd';
import { AttentionIcon } from '../../../assets/images';

const DashboardSettings:FC<any> = () =>{

  return(
    <Col xs={24} lg={24}>
      <Row>
        <div className='mb-50 d-flex justify-between heading-attention'>
          <div>
            <Typography.Title level={4} className='d-i-block'>Your Settings</Typography.Title>
          </div>
          <div>
            <AttentionIcon />
          </div>
        </div>
      </Row>
      <Row>
      </Row>
    </Col>
  )
}

export default DashboardSettings;