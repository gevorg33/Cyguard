import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Typography, InputNumber } from 'antd';
import useQuery from '../../hooks/useQuery';
import payeeApiService from '../../api/payee-api-service';
import { setCurrentPayment } from '../../store/payments/action';
import { useDispatch } from 'react-redux';
import PhoneVerifyForm
  from '../../components/molecules/create-payment-account-steps/step-three/phone-verify-form/phone-verify-form';
import { AttentionIcon } from '../../assets/images';
import GlobalLoader from '../../components/atoms/global-loader/global-loader';
import GoogleAccountVerifyForm
  from '../../components/molecules/create-payment-account-steps/step-four/google-account-confirm-modal/google-account-verify-form';

const PayeeApprovePayment: FC<any> = ({ match }: any): JSX.Element => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isGauthModalOpened, setGauthModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const query = useQuery();
  const [form] = Form.useForm();
  const token = query.get('token');
  const { id } = match.params;

  const handleSetPaymentData = useCallback(data => {
    setPaymentData(data);
  }, []);

  const handleVerify = useCallback(value => {
    setIsVerified(value);
  }, []);

  const onSubmit = useCallback(async (formData) => {
    const { amount, invoiceIdentifier, ...data } = formData;
    dispatch(setCurrentPayment({ ...data, bankNumber: parseInt(data.bankNumber) }));
    setGauthModalOpen(!isGauthModalOpened);
  }, []);

  useEffect(() => {
    payeeApiService.sendPhoneVerification(id, token)
      .then(data => {
        if (data) {
          setIsModalOpened(true);
          setPhoneNumber(data?.to);
        }
      }).catch(e => {
      console.log(e.message);
    });
  }, []);

  useEffect(() => {
    if (paymentData) {
      const { payment } = paymentData;
      form.setFieldsValue({
        amount: payment.amount,
        invoiceIdentifier: payment.invoiceIdentifier,
      });
      if (payment.bankDetails) {
        const { bankDetails } = payment;
        form.setFieldsValue({
          name: bankDetails.name,
          bankName: bankDetails.bankName,
          bankNumber: bankDetails.bankNumber,
          swiftCode: bankDetails.swiftCode,
          branch: bankDetails.branch,
          branchAddress: bankDetails.branchAddress,
          accountNumber: bankDetails.accountNumber,
          iban: bankDetails.iban,
          beneficiary: bankDetails.beneficiary,
        });
      }
      setIsModalOpened(false);
    }
  }, [paymentData]);

  return (
    <Col xs={24} lg={24} className='p-60'>
      <Row>
        <div className='mb-50 d-flex justify-between heading-attention'>
          <div>
            <Typography.Title level={4} className='d-i-block'>Renata needs you to confirm your bank
              details</Typography.Title>
            <Typography.Paragraph className='ml-23'>Please enter your details below and confirm your payment is
              secure</Typography.Paragraph>
          </div>
          <div>
            <AttentionIcon />
          </div>
        </div>
      </Row>
      <Row>
        {isVerified ?
          <Form
            noValidate={true}
            form={form}
            onFinish={onSubmit}
            name={'login'}
            className='edit-company-step-one'
            validateTrigger='onFinish'
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'number',
                },
              ]}
              name='amount'
            >
              <InputNumber
                size='large'
                type='number'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Amount'
                disabled={true}
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                },
              ]}
              name='invoiceIdentifier'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Invoice Identifier'
                disabled={true}
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter your Details Name.',
                },
              ]}
              name='name'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-email mt-15 c-black w-60'
                placeholder='Details Name'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter your Bank Name.',
                },
              ]}
              name='bankName'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-email mt-15 c-black w-60'
                placeholder='Bank Name'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please, enter your Bank Number.',
                },
              ]}
              name='bankNumber'
            >
              <Input
                size='large'
                type='number'
                autoComplete='off'
                className='input-email mt-15 c-black w-60'
                placeholder='Bank Number'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter your Swift Code.',
                },
              ]}
              name='swiftCode'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Your Swift Code'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter Branch.',
                },
              ]}
              name='branch'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Branch'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter Branch Address.',
                },
              ]}
              name='branchAddress'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Branch Address'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter Account Number.',
                },
              ]}
              name='accountNumber'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Account Number'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter iBan.',
                },
              ]}
              name='iban'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='iBan'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter the Beneficiary.',
                },
              ]}
              name='beneficiary'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Beneficiary'
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                className='auth_form__submit submit-btn confirm-account-btn'
                type='primary'
                size='large'
              >
                Confirm
              </Button>
            </Form.Item>
          </Form> : <GlobalLoader />}
        <PhoneVerifyForm
          visible={isModalOpened}
          onCancel={() => setIsModalOpened(false)}
          currentPhoneNumber={phoneNumber}
          handleVerify={handleVerify}
          handleSetPaymentData={handleSetPaymentData}
          payeeId={id}
          token={token}
        />
        <GoogleAccountVerifyForm
          visible={isGauthModalOpened}
          onCancel={() => {
            setGauthModalOpen(false);
          }}
          payeeId={id}
          token={token}
        />
      </Row>
    </Col>
  );
};

export default PayeeApprovePayment;