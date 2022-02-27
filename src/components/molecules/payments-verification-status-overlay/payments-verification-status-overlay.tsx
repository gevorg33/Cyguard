import React, { FC } from 'react';
import { TickIcon } from '../../../assets/images';

interface Props {
  payeeStatus: string;
  businessLeaderStatus: string;
  sameAsLast: boolean;
}

const PaymentsVerificationStatusOverlay: FC<Props> = ({ payeeStatus, businessLeaderStatus, sameAsLast }): JSX.Element => (
  <div className='bordered-standard bg-white p-5 mb-25'>
    <div className='d-flex justify-between '>
      <div>Verified bank account</div>
      <div
        className={`${payeeStatus === 'pending' ? 'c-light-grey' : 'c-green'}`}
      >
        <TickIcon />
      </div>
    </div>
    <div className='d-flex justify-between '>
      <div>Manager Approval</div>
      <div className={`${businessLeaderStatus === 'pending' ? 'c-light-grey' : 'c-green'}`}>
        <TickIcon />
      </div>
    </div>
    <div className='d-flex justify-between '>
      <div>Same bank account</div>
      <div className={`${!sameAsLast ? 'c-light-grey' : 'c-green'}`}>
        <TickIcon />
      </div>
    </div>
  </div>
);

export default PaymentsVerificationStatusOverlay;