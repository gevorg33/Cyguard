import React, { FC, useCallback, useState } from 'react';
import { Button, Form, Input, Modal, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { paymentAccountSelector } from '../../../../../store/payment-account/selectors';
import paymentAccountManagementApi from '../../../../../api/payment-account-management-api';

interface IEmailConfirmForm {
  next?: () => void;
  visible: boolean;
  onCancel?: (arg: boolean) => void;
  currentEmail?: string;
}

const EmailConfirmForm: FC<IEmailConfirmForm> = ({ next, visible, onCancel, currentEmail }): JSX.Element => {

  const [fakeLoading, setFakeLoading] = useState<boolean>(false);

  const { paymentAccount } = useSelector(paymentAccountSelector);
  const { paymentAccountId } = paymentAccount;

  const onSubmit = useCallback(async (formData) => {
    setFakeLoading(true);
    if (next) {
      paymentAccountManagementApi.verifyPayeeEmail(formData, paymentAccountId)
        .then(data => {
          if (data.status) {
            next();
          }
        }).catch(err => {
        setFakeLoading(false);
        console.log(err.message);
      });
    }
  }, [paymentAccount]);

  return (
    <Modal
      className='new-account-modal'
      visible={visible}
      onCancel={() => {
        if (onCancel) {
          onCancel(false);
        }
      }}
      footer={[]}
    >
      <Form
        noValidate={true}
        name='confirmEmail'
        initialValues={{ emailVerificationCode: '' }}
        onFinish={onSubmit}
        validateTrigger='onFinish'
      >
        <div className='already-user-title'>
          <Typography.Title className='verification-code f-size-18' level={3}>Please confirm your
            Email</Typography.Title>
          <Typography.Title className='verification-title'>
            We have sent you the verification code to
          </Typography.Title>
          <Typography.Paragraph className='verification-code'>
            {currentEmail}
          </Typography.Paragraph>
        </div>

        <Form.Item
          rules={[
            {
              required: true,
              type: 'string',
              message: 'Please, enter a valid Code.',
            },
          ]}
          name='code'
        >
          <Input
            size='large'
            type='text'
            autoComplete='off'
            className='input-username mt-15'
            placeholder='Enter Code'
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType='submit'
            className='auth_form__submit'
            type='primary'
            size='large'
            disabled={fakeLoading}
          >
            Verify
          </Button>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default EmailConfirmForm;