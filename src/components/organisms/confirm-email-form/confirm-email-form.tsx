import React from 'react';
import { Button, Typography, Form } from 'antd';

import 'components/organisms/auth-form/auth-form.scss';

const ConfirmEmailForm: React.FC<any> = () => {
  return (
    <div className='base_form'>
      <Form.Item>
        <Typography.Title className='auth_form__title' level={4}>
          Confirm emails address
        </Typography.Title>
      </Form.Item>
      <Form.Item className='mb-0'>
        <Typography.Paragraph className='auth_form__info_text'>
          In order to start using your Cyguard account, you need to
          confirm your email address.
        </Typography.Paragraph>
      </Form.Item>
      <div className='d-flex justify-between'>
        <Button
          className='auth_form__submit base_form__submit cursor-inherit c-gray-primary'
          size='large'
          type='text'
        >
          Check Your Email Box
        </Button>
      </div>
    </div>
  );
};

export default ConfirmEmailForm;
