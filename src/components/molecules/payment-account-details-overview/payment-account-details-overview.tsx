import PaymentAccountDetailsPreview from '../../atoms/payment-account-details-preview/payment-account-details-preview';
import React, { FC } from 'react';

const PaymentAccountDetailsOverview: FC<any> = ({ accountDetails }): JSX.Element => {
  const details: any = {};
  details['Details Name'] = accountDetails?.name;
  details['Bank Name'] = accountDetails?.bankName;
  details['Bank Number'] = accountDetails?.bankNumber;
  details['Branch'] = accountDetails?.branch;
  details['Branch Address'] = accountDetails?.branchAddress;
  details['Account Number'] = accountDetails?.accountNumber;
  details['Swift Code'] = accountDetails?.swiftCode;
  details['iBan'] = accountDetails?.iban;
  details['Beneficiary Name'] = accountDetails?.beneficiary;

  return (
    <>
      {Object.keys(details).map((keyName: string) =>
        <PaymentAccountDetailsPreview
          value={details[keyName]}
          key={keyName}
          keyName={keyName}
        />,
      )}
    </>
  );
};

export default PaymentAccountDetailsOverview;