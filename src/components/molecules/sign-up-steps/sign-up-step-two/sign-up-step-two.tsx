import { Button, Col, Form, Input, Row } from 'antd';
import React, { FC, useCallback, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../store/user/selectors';
import { setSignUpDataStepTwo, clearExtraError } from '../../../../store/user/action';
import { PASSWORD_PATTERN } from '../../../../constants';
import './sign-up-step-two.scss';

const SignUpStepTwo: FC<any> = ({ next }): JSX.Element => {

  const [scopeErrors, setScopeErrors] = useState<any>({});
  const { in_process, extraError } = useSelector(userSelector);
  const dispatch = useDispatch();

  const onSubmit = useCallback( (data) => {
      dispatch(setSignUpDataStepTwo(data, next));
  }, [dispatch]);

  return (
    <Col xs={24} lg={24}>
      <Row>
        <Form
          noValidate={true}
          name={'login'}
          className='sign-up-form-step-two'
          initialValues={{ password: '', confirmPassword: '' }}
          onFinish={onSubmit}
          onFieldsChange={() => extraError && dispatch(clearExtraError())}
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
            rules={[{
              required: true,
              type: 'string',
              message: 'Please, enter your password.',
            },
            ]}
            name='password'
            validateStatus={extraError?.password || scopeErrors?.password ? 'error' : undefined}
            help={extraError?.password || scopeErrors?.password || false}
          >
            <Input.Password
              size='large'
              placeholder='Password'
              className='input-password mt-30'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item
            rules={[PASSWORD_PATTERN]}
            name='confirmPassword'
            validateStatus={extraError?.confirmPassword || scopeErrors?.confirmPassword ? 'error' : undefined}
            help={extraError?.confirmPassword || scopeErrors?.confirmPassword || false}
          >
            <Input.Password
              size='large'
              placeholder='Retype Password'
              className='input-password mt-30'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              className='submit mt-20'
              type='primary'
              size='large'
              disabled={in_process}
            >
              Next
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Col>
  );
};

export default memo(SignUpStepTwo);