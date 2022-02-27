import React, { FC } from 'react';
import { HistoryOutlined, SafetyOutlined } from '@ant-design/icons';

interface IProps {
  record: any;
  type: string;
}

const PaymentAccountVerificationStatus: FC<IProps> = ({ record, type }): JSX.Element => {
  const isVerified = record[type];
  return (
    isVerified ?
      <SafetyOutlined className='approved-icon' /> :
      <HistoryOutlined className='pending-icon' />
  );
};

export default PaymentAccountVerificationStatus;