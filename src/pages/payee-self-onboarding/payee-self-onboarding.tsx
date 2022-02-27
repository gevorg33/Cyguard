import React, { FC, useCallback, useEffect, useState } from 'react';
import useQuery from '../../hooks/useQuery';
import paymentAccountManagementApi from '../../api/payment-account-management-api';
import { removePaymentAccountData } from '../../store/payment-account/action';
import UpdatePayeePhone from '../../components/molecules/create-payment-account-steps/step-three/update-payee-phone';
import VerifyGauth from '../../components/molecules/create-payment-account-steps/step-four/verify-gauth';
import UpdateSentence from '../../components/molecules/create-payment-account-steps/step-five/update-sentence';
import CreatePaymentAccountStepsContent
  from '../../components/organisms/create-payment-account-steps-content/create-payment-account-steps-content';
import { useDispatch } from 'react-redux';
import GlobalLoader from '../../components/atoms/global-loader/global-loader';

const PayeeSelfOnboarding: FC<any> = ({ match }: any): JSX.Element => {
  const [current, setCurrent] = useState<number>(0);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const dispatch = useDispatch();
  const query = useQuery();
  const { id } = match.params;

  const token = query.get('token');
  const code = query.get('code');

  useEffect(() => {
    paymentAccountManagementApi.verifyPayeeEmail({ code }, id, token)
      .then(data => {
        if (data.status) {
          setIsVerified(true);
        }
      }).catch(err => {
      console.log(err.message);
    });
  }, []);

  const next = useCallback((): void => {
    setCurrent(current + 1);
  }, [current]);

  const steps: any[] = [
    {
      title: 'Step 1 - Your Phone Verification',
      content: <UpdatePayeePhone next={next} selfId={id} token={token} />,
    },
    {
      title: 'Step 2 - Google Account Verification',
      content: <VerifyGauth next={next} selfId={id} token={token} />,
    },
    {
      title: 'Step 3 - Secret Sentence',
      content: <UpdateSentence selfId={id} token={token} />,
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(removePaymentAccountData());
    };
  }, []);

  return (
    isVerified ?
      <CreatePaymentAccountStepsContent
        steps={steps}
        current={current}
        variant='payee'
      /> : <GlobalLoader />
  );
};

export default PayeeSelfOnboarding;