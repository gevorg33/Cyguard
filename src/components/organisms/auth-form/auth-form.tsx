import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Input, Form } from 'antd';
import { LOG_IN_PATTERN, PASSWORD_PATTERN } from '../../../constants';
import AuthAgreement from 'components/molecules/auth-agreement/auth-agreement';
import routes from 'routes/routes';

import './auth-form.scss';

export interface AuthFormProps {
  variant: 'signUp' | 'signIn';
  loading?: boolean;
  extraError?: string | null;
  signUpConfirmed?: boolean;
  onSubmit(values: any): void;
  onChangeFields?: () => void;
  onClickGoogle: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
         variant,
         loading,
         extraError,
         signUpConfirmed,
         onSubmit,
         onChangeFields
       }) => {
  const [scopeErrors, setScopeErrors] = useState<any>({});
  return (
    <Form
      noValidate={true}
      name={variant === 'signUp' ? 'register' : 'login'}
      className='auth_form'
      initialValues={{ email: '', password: '' }}
      onFinish={onSubmit}
      onFieldsChange={onChangeFields}
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
      <Form.Item>
        <Typography.Title className='auth_form__title' level={4}>
          {variant === 'signUp' ? 'Create a new account' : 'Log In'}
        </Typography.Title>
      </Form.Item>
      {signUpConfirmed && (
        <Typography.Paragraph className='auth_form__title'>
          Your account has been confirmed, please log in.
        </Typography.Paragraph>
      )}
      <Form.Item
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please, enter a valid emails address.',
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
          type='email'
          autoComplete='off'
          className='input-username mt-15'
          placeholder={variant === 'signIn' ? 'username' : 'Your Email'}
        />
      </Form.Item>
      <Form.Item
        rules={[
          variant === 'signUp' ? PASSWORD_PATTERN : LOG_IN_PATTERN
        ]}
        name='password'
        validateStatus={
          !!extraError || !!scopeErrors.password ? 'error' : undefined
        }
        help={
          extraError || scopeErrors.password
            ? extraError || scopeErrors.password
            : false
        }
        hasFeedback={true}
      >
        <Input.Password
          //prefix={<UnlockOutlined className='c-blue-primary' />}
          size='large'
          placeholder='password'
          className='input-password mt-30'
          autoComplete='off'
        />
      </Form.Item>
      {variant === 'signIn' && (
        <Form.Item>
          {/*<Form.Item name='remember' valuePropName='checked' noStyle>*/}
          {/*  <Checkbox>Remember me</Checkbox>*/}
          {/*</Form.Item>*/}
          <Link className='float-right c-white forgot-password' to={routes.resetPassword.path}>
            forgot password
          </Link>
        </Form.Item>
      )}
      <Form.Item>
        <Button
          htmlType='submit'
          className='auth_form__submit mt-20'
          type='primary'
          size='large'
          disabled={loading}
        >
          {variant === 'signUp' ? 'Sign up free' : 'LogIn'}
        </Button>
      </Form.Item>
      <Form.Item>
        <AuthAgreement variant={variant} />
      </Form.Item>
    </Form>
  );
};


export default AuthForm;
