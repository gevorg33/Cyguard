import React, { useState } from 'react';
import { Button, Typography, Input, Form } from 'antd';

import 'components/organisms/auth-form/auth-form.scss';

export interface ResetPasswordFormProps {
  loading?: boolean;
  onSubmit(values: any): void;
  extraError?: string | null;
  isReset: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  loading,
  extraError,
  isReset,
}) => {
  const [sendEmail, setSendEmail] = useState<string>('');
  const [error, setError] = useState<any>({});

  const onFinish = (data: any) => {
    onSubmit(data);
    setSendEmail(data.email);
  };

  return (
    <Form
      noValidate={true}
      className='auth_form forgot-password-form'
      onFinish={onFinish}
      initialValues={{ email: '' }}
      validateTrigger='onFinish'
      onValuesChange={() => {
        setError({});
      }}
      onFinishFailed={({ errorFields }) => {
        errorFields.map(({ name, errors }) => {
          const [field] = name;
          const [message] = errors;
          setError((state: Readonly<any>) => ({
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
          {isReset ? 'Check your emails' : 'Forgot your password?'}
        </Typography.Title>
      </Form.Item>
      {!isReset && (
        <>
          <Form.Item
            rules={[
              { required: true, message: 'Please input your emails address!.' },
              {
                type: 'email',
                message: 'Please enter a valid emails address.',
              },
            ]}
            name='email'
            validateStatus={!!extraError || error.email ? 'error' : undefined}
            help={extraError || error.email ? extraError || error.email : false}
          >
            <Input
              size='large'
              type='email'
              autoComplete='off'
              placeholder='Email'
              className='input-username'
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              className='auth_form__submit'
              type='primary'
              size='large'
              disabled={loading}
            >
              Reset password
            </Button>
          </Form.Item>
        </>
      )}
      <Form.Item>
        <Typography.Paragraph className='auth_form__info_text'>
          {isReset ? (
            <>
              We&apos;ve sent an email to {sendEmail}. Click the link in the email to
              reset your password.
              <br />
              If you don&apos;t see the email, check other places like your junk,
              spam, social or other folders.
            </>
          ) : (
            <>
              We&apos;ll send you an activation link to your registered email so you
              can come back to us. <br />
              We miss you!
            </>
          )}
        </Typography.Paragraph>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
