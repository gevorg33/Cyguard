import React, { FC, useCallback, useEffect, useState } from 'react';
import { Col, Row, Steps, Typography } from 'antd';
import SignUpStepOne from '../../../components/molecules/sign-up-steps/sign-up-step-one/sign-up-step-one';
import SignUpStepTwo from '../../../components/molecules/sign-up-steps/sign-up-step-two/sign-up-step-two';
import SignUpStepThree from '../../../components/molecules/sign-up-steps/sign-up-step-three/sign-up-step-three';
import { clearSignUpData } from '../../../store/user/action';
import { useDispatch } from 'react-redux';
import './sign-up-by-steps.scss';

const { Step } = Steps;

const SignUpBySteps: FC<any> = (): JSX.Element => {
  const [current, setCurrent] = useState<number>(0);
  const dispatch = useDispatch();

  const next = useCallback((): void => {
    setCurrent(current + 1);
  }, [current]);

  const steps = [
    {
      title: 'First',
      content: <SignUpStepOne next={next} />,
    },
    {
      title: 'Second',
      content: <SignUpStepTwo next={next} />,
    },
    {
      title: 'Last',
      content: <SignUpStepThree />,
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(clearSignUpData());
    };
  }, []);

  return (
    <Col xs={24} lg={24}>
      <Row justify='start'>
        <div className='sign-up-form'>

          <div className='title-section'>
            <Typography.Title level={1} className='welcome-title'>
              Sign Up to <span className='welcome-title c-green'>Cyguard</span>
            </Typography.Title>
          </div>

          <div className='steps-section'>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} />
              ))}
            </Steps>
            <div className='steps-content'>{steps[current].content}</div>
          </div>
        </div>
      </Row>
    </Col>
  );
};

export default SignUpBySteps;