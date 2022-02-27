import { Typography } from 'antd';
import React, { FC } from 'react';

interface IPaymentAccountDetailsPreview {
  value: string | number;
  keyName: string | number;
}

const PaymentAccountDetailsPreview: FC<IPaymentAccountDetailsPreview> = ({ value, keyName }): JSX.Element => (
  <div className='d-flex justify-between mb-20'>
    <Typography.Title level={5}>
      {keyName}
    </Typography.Title>
    <Typography.Paragraph
      className='m-1 display-i-b'
    >
      {value || 'empty'}
    </Typography.Paragraph>
  </div>
);

export default PaymentAccountDetailsPreview;