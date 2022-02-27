import React, { FC, useCallback, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, Input, Row } from 'antd';
import { FIRST_NAME_PATTERN, LAST_NAME_PATTERN, COMPANY_NAME_PATTERN } from '../../../../constants';
import { setPaymentAccountData } from '../../../../store/payment-account/action';
import './general-info.scss';

const GeneralInfo: FC<any> = ({ next }): JSX.Element => {
  const [fakeLoading, setFakeLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const onSubmit = useCallback(async (formData: any) => {
    setFakeLoading(true);
    dispatch(setPaymentAccountData(formData));
    next();
  }, [dispatch]);

  return (
    <Col xs={24} lg={24}>
      <Row>
        <Form
          noValidate={true}
          name={'login'}
          className='edit-company-step-one'
          initialValues={{ firstName: '', lastName: '', name: '' }}
          onFinish={onSubmit}
          validateTrigger='onFinish'
        >
          <Form.Item
            rules={ [ FIRST_NAME_PATTERN ] }
            name='firstName'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15 c-black'
              placeholder='First Name'
            />
          </Form.Item>

          <Form.Item
            rules={ [ LAST_NAME_PATTERN ] }
            name='lastName'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15 c-black'
              placeholder='Last Name'
            />
          </Form.Item>

          <Form.Item
            rules={ [ COMPANY_NAME_PATTERN ] }
            name='name'
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15 c-black'
              placeholder='Company Name'
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              className='auth_form__submit submit'
              type='primary'
              size='large'
              disabled={fakeLoading}
            >
              Next
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Col>
  );
};

export default memo(GeneralInfo);