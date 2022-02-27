import Auth from '@aws-amplify/auth';
import AuthForm from 'components/organisms/auth-form/auth-form';
import React, { useCallback, useState } from 'react';
import routes from 'routes/routes';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const SignUp: React.FC<any> = ():JSX.Element => {
  const [fakeLoading, setFakeLoading] = useState(false);
  const [extraError, setExtraError] = useState(null);

  const dispatch = useDispatch();

  const onSubmit = useCallback(async (data: any) => {
    setFakeLoading(true);
    try {
      const { email, password } = data;
      await Auth.signUp(email, password);
      dispatch(push(routes.signUpSuccessful.path));
    } catch (e) {
      setExtraError(e.message);
      setFakeLoading(false);
    }
  }, [dispatch]);

  const onClickGoogle = useCallback(async () => {
    try {
      await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });
    } catch (e) {
      setExtraError(e.message);
    }
  }, []);

  return (
    <AuthForm
      onClickGoogle={onClickGoogle}
      onChangeFields={() => setExtraError(null)}
      extraError={extraError}
      loading={fakeLoading}
      variant='signUp'
      onSubmit={onSubmit}
    />
  );
};

export default SignUp;
