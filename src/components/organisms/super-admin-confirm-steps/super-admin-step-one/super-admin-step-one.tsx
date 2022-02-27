import React, { FC, useCallback } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';

const SuperAdminStepOne: FC<any> = ({ next }) => {

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
          name='superAdminSteps'
          className='edit-company-step-one'
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
                message: 'Please, enter a valid SMS Code.',
              },
            ]}
            name='smsCode'
          >
            <Input
              size='large'
              type='string'
              autoComplete='off'
              className='input-username'
              placeholder='SMS Code'
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={onSubmit}
              className='auth_form__submit'
              type='primary'
              size='large'
            >
              Next
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Col>
  );
};
export default SuperAdminStepOne;