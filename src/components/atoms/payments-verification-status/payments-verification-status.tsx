import React, { FC, memo } from 'react';
import { Dropdown } from 'antd';
import { TickIcon } from '../../../assets/images';
import PaymentsVerificationStatusOverlay
  from '../../molecules/payments-verification-status-overlay/payments-verification-status-overlay';

interface Props {
  payeeStatus: string;
  businessLeaderStatus: string;
  sameAsLast: boolean;
}

const PaymentsVerificationStatus: FC<Props> = ({ payeeStatus, businessLeaderStatus, sameAsLast }): JSX.Element => (
  <Dropdown
    overlay={
      <PaymentsVerificationStatusOverlay
        payeeStatus={payeeStatus}
        businessLeaderStatus={businessLeaderStatus}
        sameAsLast={sameAsLast}
      />
    }
    placement='bottomCenter'>
    <div className='d-flex justify-around bordered-standard p-5 mb-25 cursor-pointer w-24'>
      <div>Verified bank account</div>
      <div className='d-flex align-start'>
        <span className={`${payeeStatus === 'pending' ? 'c-light-grey' : 'c-green'}`}><TickIcon /></span>
        <span className={`${businessLeaderStatus === 'pending' ? 'c-light-grey' : 'c-green'}`}><TickIcon /></span>
        <span className={`${!sameAsLast  ? 'c-light-grey' : 'c-green'}`}><TickIcon /></span>
      </div>
    </div>
  </Dropdown>
);

export default memo(PaymentsVerificationStatus);