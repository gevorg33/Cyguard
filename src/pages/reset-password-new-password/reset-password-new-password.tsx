import React, { useCallback, useState } from 'react';
import NewPasswordForm from 'components/organisms/new-passwor-form/NewPasswordForm';
import Auth from '@aws-amplify/auth';
import { parse } from 'query-string';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import routes from '../../routes/routes';
import GuestLayout from 'layouts/guest/guest-layout';

const ResetPasswordNewPassword: React.FC<any> = ():JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [extraError, setExtraError] = useState<any>(null);
  const [isReset, setIsReset] = useState<boolean>(false);

  const dispatch = useDispatch();

  const onSubmit = useCallback(async (formData: any) => {
    setLoading(true);
    try {
      const { location: { search } } = window;
      const queryData: any = parse(search);
      await Auth.forgotPasswordSubmit(queryData.email, queryData.code, formData.password);
      setIsReset(true);
    } catch (e) {
      setExtraError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onGoToLogin = () => dispatch(push(routes.signIn.path));

  return (
    <GuestLayout>
      <NewPasswordForm isReset={isReset} onClickGoToLogin={onGoToLogin} extraError={extraError} loading={loading} onSubmit={onSubmit} />
    </GuestLayout>
  );
};

export default ResetPasswordNewPassword;
