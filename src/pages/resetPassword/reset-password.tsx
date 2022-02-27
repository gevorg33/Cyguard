import React, { useCallback, useState } from 'react';
import ResetPasswordForm from 'components/organisms/reset-password-form/reset-password-form';
import Auth from '@aws-amplify/auth';
import GuestLayout from 'layouts/guest/guest-layout';

const ResetPassword: React.FC<any> = ():JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [extraError, setExtraError] = useState<any>(null);

  const onSubmit = useCallback(async (formData: any) => {
    setLoading(true);
    try {
      await Auth.forgotPassword(formData.email);
      setIsReset(true);
    } catch (e) {
      setExtraError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <GuestLayout>
      <ResetPasswordForm extraError={extraError} isReset={isReset} loading={loading} onSubmit={onSubmit} />
    </GuestLayout>
  );
};

export default ResetPassword;
