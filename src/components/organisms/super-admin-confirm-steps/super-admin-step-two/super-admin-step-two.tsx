import React, { FC, useCallback } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';

const SuperAdminStepTwo: FC<any> = ({ next }) => {
  const dispatch = useDispatch();

  const onSubmit = useCallback(async () => {
    try {
      // await Auth.sign-in(data.email, data.password);
      // userHasAuthenticated(true);
      //dispatch(push(routes.designs.path));
      next();
    } catch (e) {
      console.log(e.message);
    }
  }, [dispatch]);

  return (
    <Col xs={24} lg={24}>
      <Row>
        <Form
          noValidate={true}
          name={'login'}
          className='edit-company-step-one'
          initialValues={{ email: '', password: '' }}
          onFinish={onSubmit}
          validateTrigger='onFinish'
        >

          <div className='already-user-title mb-60'>
            <Typography.Title className='verification-code' level={4}>
              Please confirm you are Avi
            </Typography.Title>
          </div>

          <Form.Item
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please, enter a valid OTP.',
              },
            ]}
            name='otpNumber'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username'
              placeholder='OTP'
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={onSubmit}
              className='auth_form__submit'
              type='primary'
              size='large'
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Col>
  );
};
export default SuperAdminStepTwo;