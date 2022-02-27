import React, { FC, useCallback, useState, memo } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import paymentAccountManagementApi from '../../../../api/payment-account-management-api';
import PhoneVerifyForm from './phone-verify-form/phone-verify-form';
import CountryPhoneCode, { ConfigProvider } from 'antd-country-phone-input';
import en from 'world_countries_lists/data/en/world.json';
import { setPaymentAccountData } from '../../../../store/payment-account/action';
import { paymentAccountSelector } from '../../../../store/payment-account/selectors';
import '../step-one/general-info.scss';

interface IUpdatePayeePhone {
  next: () => void;
  selfId?: string;
  token?: any;
}

const UpdatePayeePhone: FC<IUpdatePayeePhone> = ({ next, selfId, token }): JSX.Element => {
  const [fakeLoading, setFakeLoading] = useState<boolean>(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string>('');
  const [isModalOpened, setModalOpen] = useState<boolean>(false);
  const [extraError, setExtraError] = useState('');

  const paymentAccountCurrentData = useSelector(paymentAccountSelector).paymentAccount;
  const { paymentAccountId } = paymentAccountCurrentData;

  const dispatch = useDispatch();

  const onSubmit = useCallback(async (formData) => {
    const { code, phone } = formData.phoneNumber;
    const phoneNumber = `+${code}${phone}`;
    setCurrentPhoneNumber(phoneNumber);
    const fmData = { phoneNumber };

    const id = selfId ? selfId : paymentAccountId;

    setFakeLoading(true);
    paymentAccountManagementApi.updatePayeePhone(fmData, id, token)
      .then(data => {
        if (data.status) {
          dispatch(setPaymentAccountData({ ...fmData }));
          setModalOpen(true);
          setFakeLoading(false);
        }
      }).catch(() => {
      setFakeLoading(false);
      setExtraError('Please input correct phone number!');
    });
  }, [dispatch]);

  return (
    <Col xs={24} lg={24}>
      <Row>
        <Form
          noValidate={true}
          name='enterPhoneNumber'
          className='edit-company-step-one'
          initialValues={{ phoneNumber: '' }}
          onFinish={onSubmit}
          validateTrigger='onFinish'
        >
          <ConfigProvider locale={en}>
            <Form.Item
              name='phoneNumber'
              validateStatus={extraError ? 'error' : undefined}
              help={extraError ? extraError : false}
            >
              <CountryPhoneCode
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60 phone-nmb'
                placeholder='12-345678'
              />
            </Form.Item>
          </ConfigProvider>
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
        <PhoneVerifyForm
          next={next}
          selfId={selfId}
          currentPhoneNumber={currentPhoneNumber}
          token={token}
          visible={isModalOpened}
          onCancel={() => setModalOpen(false)}
        />
      </Row>
    </Col>
  );
};

export default memo(UpdatePayeePhone);