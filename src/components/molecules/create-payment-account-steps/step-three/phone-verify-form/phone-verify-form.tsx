import React, { FC, useCallback, useState } from 'react';
import { Button, Input, Modal, Typography, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentAccountData } from '../../../../../store/payment-account/action';
import { paymentAccountSelector } from '../../../../../store/payment-account/selectors';
import paymentAccountManagementApi from '../../../../../api/payment-account-management-api';
import payeeApiService from '../../../../../api/payee-api-service';

interface IPhoneVerifyForm {
  next?: () => void;
  visible: boolean;
  onCancel: (arg: boolean) => void;
  currentPhoneNumber?: string;
  selfId?: string;
  payeeId?: string;
  token?: string | null;
  handleVerify?: any;
  handleSetPaymentData?: any;
}

const PhoneVerifyForm: FC<IPhoneVerifyForm> = ({ next, visible, onCancel, currentPhoneNumber,selfId, payeeId,token, handleVerify, handleSetPaymentData }) => {

  const [fakeLoading, setFakeLoading] = useState<boolean>(false);
  const paymentAccountData = useSelector(paymentAccountSelector).paymentAccount;
  const { paymentAccountId } = paymentAccountData;
  const dispatch = useDispatch()

  const onSubmit = useCallback(async (formData) => {

    const id = selfId ? selfId : paymentAccountId;

    setFakeLoading(true);

    if (!payeeId) {
      paymentAccountManagementApi.verifyPayeePhone(formData, id, token)
        .then(data => {
          if (data.status) {
            dispatch(setPaymentAccountData({ qrCode: data.qrCode }));
            if (next)
              next();
          }
        }).catch(err => {
        setFakeLoading(false);
        console.log(err.message);
      });
    } else {
      payeeApiService.verifyPayeePhone(payeeId, token, formData)
        .then(data => {
          if (data) {
            handleVerify(true);
            handleSetPaymentData(data);
          }
          setFakeLoading(false);
        })
    }
  }, [paymentAccountData]);

  return (
    <Modal
      className='new-account-modal'
      visible={visible}
      onCancel={() => {
        onCancel(false);
      }}
      footer={[]}
    >
      <Form
        noValidate={true}
        name='confirmPhone'
        initialValues={{ code: '' }}
        onFinish={onSubmit}
        validateTrigger='onFinish'
      >
        <div className='already-user-title'>
          <Typography.Title className='verification-code f-size-18' level={3}>Please confirm your
            Phone</Typography.Title>
          <Typography.Title className='verification-title'>
            We have sent you the verification code to
          </Typography.Title>
          <Typography.Paragraph className='verification-code'>
            {currentPhoneNumber}
          </Typography.Paragraph>
        </div>

        <Form.Item
          rules={[
            {
              required: true,
              type: 'string',
              message: 'Please, enter the Code.',
            },
          ]}
          name='code'
        >
          <Input
            size='large'
            type='email'
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
export default PhoneVerifyForm;