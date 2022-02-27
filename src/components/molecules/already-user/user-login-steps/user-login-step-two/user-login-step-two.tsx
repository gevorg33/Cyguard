import { Button, Form, Input, Typography } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppContext } from '../../../../../libs/context-lib';
import './user-login-step-two.scss';

const UserLoginStepTwo:FC<any> = ({next}):JSX.Element => {

  const [fakeLoading, setFakeLoading] = useState<boolean>(false);
  const [extraError, setExtraError] = useState<boolean | null>(null);
  const [scopeErrors, setScopeErrors] = useState<any>({});
  const { userHasAuthenticated } = useAppContext();
  const dispatch = useDispatch();

  const onSubmit = useCallback( async () => {
    setFakeLoading(true);
    try {
      next()
    } catch (e) {
      console.log(e.message);
    }
  }, [dispatch, userHasAuthenticated]);

  return(
    <Form
      noValidate={true}
      name={'login'}
      className='login-modal-from-step-two'
      initialValues={{ email: '', password: '' }}
      onFinish={onSubmit}
      onFieldsChange={() => setExtraError(null)}
      validateTrigger='onFinish'
      onValuesChange={() => {
        setScopeErrors({});
      }}
      onFinishFailed={({ errorFields }) => {
        errorFields.map(({ name, errors }) => {
          const [field] = name;
          const [message] = errors;
          setScopeErrors((state: Readonly<any>) => ({
            ...state,
            [field]: message,
          }));
          return {
            name,
            errors,
          };
        });
      }}
    >
      <div className='already-user-title'>
        <Typography.Title className='verification-title'>
          We have sent you the verification code to
        </Typography.Title>
        <Typography.Paragraph className='verification-code'>
          44 7038 2736423
        </Typography.Paragraph>
      </div>

      <Form.Item
        rules={[
          {
            required: true,
            message: 'Please, enter a valid code.',
          },
        ]}
        name='email'
        validateStatus={
          !!extraError || !!scopeErrors.email ? 'error' : undefined
        }
        help={!!scopeErrors.email && scopeErrors.email}
      >
        <Input
          size='large'
          type='text'
          autoComplete='off'
          className='input-username mt-15'
          placeholder={'Enter Code'}
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

export default UserLoginStepTwo;