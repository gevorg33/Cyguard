import React, { FC, useState } from 'react';
import { Typography, Modal, Steps, message } from 'antd';
import UserLoginStepOne from '../../molecules/already-user/user-login-steps/user-login-step-one/user-login-step-one';
import UserLoginStepTwo from '../../molecules/already-user/user-login-steps/user-login-step-two/user-login-step-two';
import UserLoginStepThree from '../../molecules/already-user/user-login-steps/user-login-step-three/user-login-step-three';
import "./user-login.scss";

const { Step } = Steps;

const UserLogin:FC<any> = (props):JSX.Element => {
  const [current, setCurrent] = useState<number>(0);

  const next:()=>void = () => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: 'First',
      content: <UserLoginStepOne next={next}/>,
    },
    {
      title: 'Second',
      content: <UserLoginStepTwo next={next}/>,
    },
    {
      title: 'Last',
      content: <UserLoginStepThree next={() => message.success('Processing complete!')}/>
    },
  ];

  return(
      <Modal
        className='already-user-modal'
        visible={props.visible}
        onCancel={() => {
          props.onCancel(false);
        }}
        footer={[]}
      >

        <div className='already-user-title'>
          <Typography.Title level={3}>
            Log In
          </Typography.Title>
        </div>

        <>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </>

      </Modal>
  )
}

export default UserLogin;