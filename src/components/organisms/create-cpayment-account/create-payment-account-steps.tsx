import React, { FC, useCallback, useEffect, useState } from 'react';
import { removePaymentAccountData } from '../../../store/payment-account/action';
import GeneralInfo from '../../molecules/create-payment-account-steps/step-one/general-info';
import CreatePaymentAccount from '../../molecules/create-payment-account-steps/step-two/create-payment-account';
import UpdatePayeePhone from '../../molecules/create-payment-account-steps/step-three/update-payee-phone';
import VerifyGauth from '../../molecules/create-payment-account-steps/step-four/verify-gauth';
import UpdateSentence from '../../molecules/create-payment-account-steps/step-five/update-sentence';
import { useDispatch } from 'react-redux';
import './create-payment-account.scss';
import CreatePaymentAccountStepsContent
  from '../create-payment-account-steps-content/create-payment-account-steps-content';

const CreatePaymentAccountSteps: FC<any> = (): JSX.Element => {
  const [current, setCurrent] = useState<number>(0);
  const dispatch = useDispatch();

  const next = useCallback((): void => {
    setCurrent(current + 1);
  }, [current]);

  const steps: any[] = [
    {
      title: 'Step 1 - Your Credentials',
      content: <GeneralInfo next={next} />,
    },
    {
      title: 'Step 2 - Your Email Verification',
      content: <CreatePaymentAccount next={next} />,
    },
    {
      title: 'Step 3 - Your Phone Verification',
      content: <UpdatePayeePhone next={next} />,
    },
    {
      title: 'Step 4 - Google Account Verification',
      content: <VerifyGauth next={next} />,
    },
    {
      title: 'Step 5 - Secret Sentence',
      content: <UpdateSentence />,
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(removePaymentAccountData());
    };
  }, []);

  return (
    <CreatePaymentAccountStepsContent steps={steps} current={current} />
  );
};

export default CreatePaymentAccountSteps;