import React, { FC, useState } from 'react';
import { Modal, Steps, message } from 'antd';
import SuperAdminStepOne from './super-admin-step-one/super-admin-step-one';
import SuperAdminStepTwo from './super-admin-step-two/super-admin-step-two';

import './super-admin-modal.scss';

const { Step } = Steps;

const SuperAdminConfirmModal:FC<any> = (props) => {
  const [current, setCurrent] = useState<number>(0);

  const next = ():void => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: 'First',
      content: <SuperAdminStepOne next={next}/>,
    },
    {
      title: 'Last',
      content: <SuperAdminStepTwo next={() => message.success('Processing complete!')}/>
    },
  ];

  return(
    <Modal
      className='super-admin-modal'
      visible={props.visible}
      onCancel={() => {
        props.onCancel(false);
      }}
      footer={[]}
    >
      <>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} />
          ))}
        </Steps>
        <div className='steps-content'>{steps[current].content}</div>
      </>

    </Modal>
  )
}

export default SuperAdminConfirmModal;