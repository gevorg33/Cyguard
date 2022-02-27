import { Button, Form, Input } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppContext } from '../../../../../libs/context-lib';
import './user-login-step-one.scss';

const UserLoginStepOne:FC<any> = ({next}):JSX.Element => {

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
      className='login-modal-from'
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
          placeholder={'username'}
        />
      </Form.Item>
      <Form.Item
        rules={[{
          required: true,
          type: 'string',
          message: 'Please, enter your password.',
        },
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
          size='large'
          placeholder='password'
          className='input-password mt-30'
          autoComplete='off'
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          className='auth_form__submit mt-20'
          //className='login-modal-from__submit mt-20'
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

export default UserLoginStepOne;