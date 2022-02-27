import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { PASSWORD_PATTERN } from '../../../constants';
import { validStatus, helperMessage } from '../../../utils';

import 'components/organisms/auth-form/auth-form.scss';

export interface NewPasswordFormProps {
  loading?: boolean;
  extraError?: string | null;
  isReset?: boolean;

  onSubmit(values: any): void;

  onChangeFields?: () => void;
  onClickGoToLogin?: () => void;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({
                                                           loading,
                                                           extraError,
                                                           isReset,
                                                           onSubmit,
                                                           onChangeFields,
                                                           onClickGoToLogin,
                                                         }): JSX.Element => {
  const [scopeErrors, setScopeErrors] = useState<any>({});

  return (
    <Form
      name='reset_password'
      className='auth_form'
      initialValues={{ password: '', remember: false }}
      onFinish={onSubmit}
      validateTrigger='onFinish'
      onFieldsChange={onChangeFields}
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
          {isReset ? 'Your password has been changed' : 'Write new password'}
        </Typography.Title>
      </Form.Item>
      {isReset ? (
        <>
          <div className='d-flex justify-center'>
            <Button
              type='primary'
              size='large'
              onClick={onClickGoToLogin}
            >
              Go to login
            </Button>
          </div>
        </>
      ) : (
        <>
          <Form.Item
            rules={[PASSWORD_PATTERN]}
            name='password'
            hasFeedback={true}
            validateStatus={ validStatus(extraError, scopeErrors.password) }
            help={ helperMessage(extraError, scopeErrors.password) }
          >
            <Input.Password
              size='large'
              placeholder='Password'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item
            name='confirm'
            dependencies={['password']}
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please, confirm password.',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Password does not match!');
                },
              }),
            ]}
            hasFeedback={true}
            validateStatus={ validStatus(extraError, scopeErrors.password) }
            help={ helperMessage(extraError, scopeErrors.confirm) }
          >
            <Input.Password
              size='large'
              placeholder='Confirm password'
              autoComplete='off'
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
              Save
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export default NewPasswordForm;
