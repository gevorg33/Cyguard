import React, { FC, useCallback, useState } from 'react';
import { Button, Input, Modal, Typography, Form, Image, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paymentAccountSelector } from '../../../../../store/payment-account/selectors';
import { paymentsDataSelector } from '../../../../../store/payments/selectors';
import { approvePayment, declinePayment } from '../../../../../store/payments/action';
import paymentAccountManagementApi from '../../../../../api/payment-account-management-api';
import payeeApiService from '../../../../../api/payee-api-service';

interface IGoogleAccountVerifyForm {
  next?: () => void;
  visible: boolean;
  selfId?: string;
  token?: any;
  qrCode?: string | any;
  onCancel?: (arg: boolean) => void;
  payeeId?: string;
}

const GoogleAccountVerifyForm: FC<IGoogleAccountVerifyForm> = ({
                                                                 next,
                                                                 visible,
                                                                 selfId,
                                                                 payeeId,
                                                                 token,
                                                                 qrCode,
                                                                 onCancel,
                                                               }) => {

  const [fakeLoading, setFakeLoading] = useState<boolean>(false);
  const paymentAccountData = useSelector(paymentAccountSelector).paymentAccount;
  const { currentPayment, currentApproveId, currentDeclineId, in_process } = useSelector(paymentsDataSelector);
  const { paymentAccountId } = paymentAccountData;
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = useCallback(async (formData) => {
    const id = selfId || paymentAccountId;
    setFakeLoading(true);
    if (payeeId) {
      payeeApiService.verifyPayeeGauth(formData, payeeId, token, currentPayment)
        .then((data) => {
          setFakeLoading(false);
          if (data) {
            message.success('Processing complete!');
            onCancel && onCancel(false);
            history.push('/success');
          }
        }).catch(err => {
        setFakeLoading(false);
        console.log(err.message);
      });
    } else if (currentDeclineId || currentApproveId) {
      setFakeLoading(false);
      const { code } = formData;
      currentDeclineId && dispatch(declinePayment({ currentDeclineId, code }));
      currentApproveId && dispatch(approvePayment({ currentApproveId, code }));
      onCancel && onCancel(false);
    } else {
      paymentAccountManagementApi.verifyPayeeGauth(formData, id, token)
        .then(data => {
          if (data.status) {
            next && next();
          }
        }).catch(err => {
        setFakeLoading(false);
        console.log(err.message);
      });
    }
  }, [paymentAccountData, currentPayment, currentDeclineId, currentApproveId]);

  return (
    <Modal
      className='new-account-modal'
      visible={visible}
      onCancel={() => {
        onCancel && onCancel(false);
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
            Google Account</Typography.Title>
        </div>
        {qrCode &&
        <Image
          src='qr-code'
          fallback={qrCode}
        />
        }
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
            disabled={fakeLoading || in_process}
          >
            Verify
          </Button>
        </Form.Item>

      </Form>
    </Modal>
  );
};
export default GoogleAccountVerifyForm;