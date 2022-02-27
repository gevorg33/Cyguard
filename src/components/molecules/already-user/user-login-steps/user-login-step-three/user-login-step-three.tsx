import { Button, Form, Input, Typography } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppContext } from '../../../../../libs/context-lib';
import './user-login-step-three.scss';

const UserLoginStepThree:FC<any> = ({next}):JSX.Element => {

  const [fakeLoading, setFakeLoading] = useState<boolean>(false);
  const { userHasAuthenticated } = useAppContext();
  const dispatch = useDispatch();

  const onSubmit = useCallback( async () => {
    setFakeLoading(true);
    try {
      next();
    } catch (e) {
      console.log(e.message);
    }
  }, [dispatch, userHasAuthenticated]);

  return(
    <Form
      noValidate={true}
      name={'login'}
      className='login-modal-from-step-three'
      initialValues={{ email: '', password: '' }}
      onFinish={onSubmit}
      validateTrigger='onFinish'
    >
      <div className='already-user-title'>
        <Typography.Title className='google-auth-code'>
          Google authenticator
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
        name='googleAuth'
      >
        <Input
          size='large'
          type='text'
          autoComplete='off'
          className='input-username mt-15'
          placeholder={'Enter OTP'}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          className='auth_form__submit mt-20'
          type='primary'
          size='large'
          disabled={fakeLoading}
        >
          Next
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UserLoginStepThree;