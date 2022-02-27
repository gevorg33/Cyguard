import { Col, Row, Steps, Typography } from 'antd';
import { UserIcon } from '../../../assets/images';
import React from 'react';

interface IProps {
  steps: any;
  current: number;
  variant?: string;
}

const { Step } = Steps;

const CreatePaymentAccountStepsContent = ({ steps, current, variant }: IProps) => {
  return (
    <Col xs={24} lg={24} className={variant==='payee' ? 'p-60' : ''}>
      <Row justify='start'>
        <div className='edit-company'>
          <div className='mb-50'>
            <UserIcon className='notify-icon-large' />
            <Typography.Title level={4} className='d-i-block'>Payment Accounts Setup / Edit</Typography.Title>
          </div>
          <div>
            <Steps current={current}>
              {steps.map((item: any) => (
                <Step key={item.title} />
              ))}
            </Steps>
            <div className='steps-content'>
              <Typography.Paragraph className='mt-30 ml-60'>{steps[current].title}</Typography.Paragraph>
              {steps[current].content}
            </div>
          </div>
        </div>
      </Row>
    </Col>
  );
};

export default CreatePaymentAccountStepsContent;