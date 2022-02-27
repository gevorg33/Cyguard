import { Button, Col, Form, Input, Row } from 'antd';
import React, { FC, useCallback, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../store/user/selectors';
import { setSignUpDataStepOne, clearExtraError } from '../../../../store/user/action';
import { FIRST_NAME_PATTERN, LAST_NAME_PATTERN, PHONE_NUMBER_PATTERN } from '../../../../constants';
import './sign-up-step-one.scss';

const SignUpStepOne: FC<any> = ({ next }): JSX.Element => {

  const [scopeErrors, setScopeErrors] = useState<any>({});
  const { in_process, extraError } = useSelector(userSelector);
  const dispatch = useDispatch();

  const onSubmit = useCallback((data) => {
    dispatch(setSignUpDataStepOne(data, next));
  }, [dispatch]);

  return (
    <Col xs={24} lg={24}>
      <Row>
        <Form
          noValidate={true}
          name='sign-up'
          className='sign-up-form-step-one'
          initialValues={{
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: ''
          }}
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
            rules={[FIRST_NAME_PATTERN]}
            name='firstName'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15'
              placeholder='First Name'
            />
          </Form.Item>

          <Form.Item
            rules={[LAST_NAME_PATTERN]}
            name='lastName'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15'
              placeholder='Last Name'
            />
          </Form.Item>

          <Form.Item
            rules={[PHONE_NUMBER_PATTERN]}
            name='phoneNumber'
            validateStatus={extraError?.phoneNumber || scopeErrors?.phoneNumber ? 'error' : undefined}
            help={extraError?.phoneNumber || scopeErrors?.phoneNumber || false}
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15'
              placeholder='Phone Number'
            />
          </Form.Item>

          <Form.Item
            rules={[{
              required: true,
              type: 'email',
              message: 'Please, enter a valid emails address.',
            },
            ]}
            name='email'
            validateStatus={extraError?.email || scopeErrors?.email ? 'error' : undefined}
            help={extraError?.email || scopeErrors?.email || false}
          >
            <Input
              size='large'
              placeholder='Email'
              className='input-email mt-30'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              className='auth_form__submit'
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

export default memo(SignUpStepOne);