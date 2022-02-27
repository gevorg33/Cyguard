import { Typography, Empty } from 'antd';
import PaymentAccountVerificationStatus
  from '../../atoms/payment-account-verification-status/payment-account-verification-status';
import React, { FC } from 'react';
import PaymentAccountDetailsOverview from '../payment-account-details-overview/payment-account-details-overview';

const PaymentAccountExpandedRows: FC<any> = ({ record }): JSX.Element => {

  const [accountDetails] = record.paymentAccountDetails;

  return (
    <>
      <div className='display-none-for-desktop'>
        <div className='d-flex justify-between mb-20'>
          <Typography.Title level={5}>
            Email Verification
          </Typography.Title>
          <Typography.Paragraph
            className='m-1 display-i-b'
          >
            <PaymentAccountVerificationStatus record={record} type='emailVerified' />
          </Typography.Paragraph>
        </div>
        <div className='d-flex justify-between mb-20'>
          <Typography.Title level={5}>
            Phone Verification
          </Typography.Title>
          <Typography.Paragraph
            className='m-1 display-i-b'
          >
            <PaymentAccountVerificationStatus record={record} type='phoneVerified' />
          </Typography.Paragraph>
        </div>

        <div className='d-flex justify-between mb-20'>
          <Typography.Title level={5}>
            Google Account Verification
          </Typography.Title>
          <Typography.Paragraph
            className='m-1 display-i-b'
          >
            <PaymentAccountVerificationStatus record={record} type='gAuthVerified' />
          </Typography.Paragraph>
        </div>

        <div className='d-flex justify-between mb-20'>
          <Typography.Title level={5}>
            Secrtet Sentence
          </Typography.Title>
          <Typography.Paragraph
            className='m-1 display-i-b'
          >
            {record.updatedAt}
          </Typography.Paragraph>
        </div>
      </div>
      {accountDetails ?
        <PaymentAccountDetailsOverview accountDetails={accountDetails} /> :
        <Empty description={<span>No Payment Account Details Data</span>} />
      }
    </>
  );
};
export default PaymentAccountExpandedRows;