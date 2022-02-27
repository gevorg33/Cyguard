import React, { FC, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import GoogleAccountVerifyForm from './google-account-confirm-modal/google-account-verify-form';
import { useSelector } from 'react-redux';
import { paymentAccountSelector } from '../../../../store/payment-account/selectors';
import paymentAccountManagementApi from '../../../../api/payment-account-management-api';
import '../step-one/general-info.scss';

interface IVerifyGauth {
  next: () => void;
  selfId?: string | any;
  token?: any;
}

const VerifyGauth: FC<IVerifyGauth> = ({ next, selfId, token }): JSX.Element => {

  const [qrCode, setQrCode] = useState<string>('');
  const paymentAccountData = useSelector(paymentAccountSelector).paymentAccount;
  const { paymentAccountId } = paymentAccountData;

  useEffect(() => {
    const id = paymentAccountId | selfId;
      paymentAccountManagementApi
        .generateQrCode(id, token)
        .then(data => setQrCode(data.qrCode));
  }, []);

  return (
    <Col xs={24} lg={24}>
      <Row>
        <GoogleAccountVerifyForm
          next={next}
          token={token}
          visible={true}
          selfId={selfId}
          qrCode={qrCode}
        />
      </Row>
    </Col>
  );
};

export default VerifyGauth;