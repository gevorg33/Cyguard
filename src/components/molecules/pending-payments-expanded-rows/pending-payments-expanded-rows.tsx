import { Empty, Typography } from 'antd';
import { MentionIcon, PdfIcon } from '../../../assets/images';
import { formatedDate } from '../../../utils';
import PaymentsVerificationStatusOverlay
  from '../payments-verification-status-overlay/payments-verification-status-overlay';
import NudgeDoneButtons from '../../atoms/pop-confirm-buttons/nudge-done-buttons';
import PaymentAccountDetailsPreview from '../../atoms/payment-account-details-preview/payment-account-details-preview';
import React, { FC } from 'react';
import PaymentAccountDetailsOverview from '../payment-account-details-overview/payment-account-details-overview';

interface Props {
  record: any;
  handleNudge: (id: string) => void;
  handleDone: (id: string) => void;
  handleDownload: (id: string) => void;
}

const PendingPaymentsExpandedRows: FC<Props> = ({ record, handleNudge, handleDone, handleDownload }): JSX.Element => {
  const { updatedAt, payeeStatus, businessLeaderStatus, invoiceIdentifier, paymentAccountDetails: details, attachments } = record;
  const [attachment] = attachments;

  return (
    <>
      {details ?
        <PaymentAccountDetailsOverview accountDetails={details} /> :
        <Empty description={<span>No Payment Account Details Data</span>} />
      }
      <div className='display-none-for-desktop'>
        <PaymentAccountDetailsPreview value={formatedDate(updatedAt)} keyName={'Freshness'} />
        <PaymentAccountDetailsPreview value={invoiceIdentifier} keyName={'Invoice Identifier'} />
        <div className='d-flex justify-between mb-20'>
          <MentionIcon />
          <Typography.Paragraph
            className='m-1 display-i-b'
          >
            <span className='mr-10'>payment confirmation(...)</span>
            {
              attachment ?
                <span
                  className='c-green'
                  onClick={() => handleDownload(attachment.id)}
                >
                  <PdfIcon className='vertical-middle' />
                </span> :
                <PdfIcon className='vertical-middle c-light-grey' />
            }
          </Typography.Paragraph>
        </div>
        <PaymentsVerificationStatusOverlay
          payeeStatus={payeeStatus}
          businessLeaderStatus={businessLeaderStatus}
          sameAsLast={details?.sameAsLast}
        />
        <div className='d-flex justify-flex-end mb-20'>
          <NudgeDoneButtons
            record={record}
            handleDone={handleDone}
            handleNudge={handleNudge}
          />
        </div>
      </div>
    </>
  );
};

export default PendingPaymentsExpandedRows;