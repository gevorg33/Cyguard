import { Button, Col, Form, Input, Row, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paymentAccountSelector } from '../../../store/payment-account/selectors';
import { removePaymentAccountData } from '../../../store/payment-account/action';
import { useHistory } from 'react-router-dom';
import FloatLabel from '../../atoms/float-label/float-label';
import { UserIcon } from '../../../assets/images';
import '../../molecules/create-payment-account-steps/step-one/general-info.scss';
import './edit-company.scss'

const EditCompany:FC<any> = ():JSX.Element => {

  const [form] = Form.useForm();
  const [extraError, setExtraError] = useState<boolean | null>(null);
  const [scopeErrors, setScopeErrors] = useState<any>({});
  const dispatch = useDispatch();
  const history = useHistory();
  const paymentAccountData = useSelector(paymentAccountSelector).paymentAccount;

  const onSubmit = ():void => {
    dispatch(removePaymentAccountData());
    history.push('/payment-accounts')
  }

  useEffect(() => {
    form.setFieldsValue({
      firstName: paymentAccountData?.firstName,
      lastName: paymentAccountData?.lastName,
      companyName: paymentAccountData?.name,
      email: paymentAccountData?.email,
      phoneNumber: paymentAccountData?.phoneNumber,
      googleAccount: paymentAccountData?.email,
      secretSentence: paymentAccountData?.sentence,
    });
  },[])

  return(
    <Col xs={24} lg={24}>
      <Row>
        <div className='mb-50'>
          <UserIcon className='notify-icon-large' />
          <Typography.Title level={4} className='d-i-block'>Payment Accounts Setup / Edit</Typography.Title>
          <Typography.Paragraph className='ml-68'>Review account information</Typography.Paragraph>
        </div>
      </Row>
      <Row>
        <Form
          form={form}
          noValidate={true}
          name={'login'}
          className='edit-company-step-one'
          initialValues={{
            firstName: '',
            lastName: '',
            name: '',
            email: '',
            phoneNumber: '',
            googleAccount: '',
            sentence: ''
          }}
          onFinish={onSubmit}
          onFieldsChange={()=>setExtraError(null)}
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
          <FloatLabel label="First Name" name="firstName" value={'Your First Name'}>
          <Form.Item
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please, enter your First Name.',
              },
            ]}
            name='firstName'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15 c-black w-60'
              disabled={true}
            />
          </Form.Item>
          </FloatLabel>

          <FloatLabel label="Last Name" name="lastName" value={'Your Last Name'}>
            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter your Last Name.',
                },
              ]}
              name='lastName'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                disabled={true}
              />
            </Form.Item>
          </FloatLabel>

          <FloatLabel label="Company Name" name="companyName" value={'Company Name'}>
          <Form.Item
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please, enter your Company Name.',
              },
            ]}
            name='companyName'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15 c-black w-60'
              disabled={true}
            />
          </Form.Item>
          </FloatLabel>

          <FloatLabel label="Email" name="email">
          <Form.Item
            validateStatus={
              !!extraError || !!scopeErrors.email ? 'error' : undefined
            }
            help={!!scopeErrors.email && scopeErrors.email}
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please, enter a valid Email.',
              },
            ]}
            name='email'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-email mt-15 c-black w-60'
              disabled={true}
            />
          </Form.Item>
          </FloatLabel>

          <FloatLabel label="Phone" name="phoneNumber">
          <Form.Item
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please, enter a valid Phone Number.',
              },
            ]}
            name='phoneNumber'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15 c-black w-60'
              disabled={true}
            />
          </Form.Item>
          </FloatLabel>

          <FloatLabel label="Google ID" name="googleId">
          <Form.Item
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please, enter your Google account.',
              },
            ]}
            name='googleAccount'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15 c-black w-60'
              disabled={true}
            />
          </Form.Item>
          </FloatLabel>

          <FloatLabel label="Security Sentence" name="securitySentence">
          <Form.Item
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please, enter your secret sentence.',
              },
            ]}
            name='secretSentence'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15 c-black w-60'
              disabled={true}
            />
          </Form.Item>
          </FloatLabel>

          <Form.Item>
            <Button
              htmlType='submit'
              className='auth_form__submit submit-btn'
              type='primary'
              size='large'
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Col>
  )
}

export default EditCompany;