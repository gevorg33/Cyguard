import React, { useCallback, useState } from 'react';
import AuthForm from 'components/organisms/auth-form/auth-form';
import { useDispatch, useSelector } from 'react-redux';
import SignInMFA from '../../components/molecules/sign-in-mfa/sign-in-mfa';
import { push } from 'connected-react-router';
import routes from 'routes/routes';
import { useAppContext } from 'libs/context-lib';
import Auth from '@aws-amplify/auth';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { userSelector } from 'store/user/selectors';
import { awsErrorCodes } from '../../constants';

const SignIn: React.FC<any> = (): JSX.Element => {
  const { userHasAuthenticated } = useAppContext();
  const [fakeLoading, setFakeLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [extraError, setExtraError] = useState(null);
  const { sign_up_confirmed } = useSelector(userSelector);

  const dispatch = useDispatch();

  const handlePreviewCancel = () => setPreviewVisible(false);

  const onSubmit = useCallback(async (data: any) => {
    setFakeLoading(true);
    try {
      const user = await Auth.signIn(data.email, data.password);
      if (user.challengeName === 'SMS_MFA') {
        setUser(user);
        setPreviewVisible(true);
        setFakeLoading(false);
      } else {
        //userHasAuthenticated(true);
        //dispatch(push(routes.dashboard.path));
      }
    } catch (e) {
      if (e.code === awsErrorCodes.notConfirmed) {
        dispatch(push(routes.signUpSuccessful.path));
      } else {
        setFakeLoading(false);
        setExtraError(e.message);
      }
    }
  }, [dispatch, userHasAuthenticated]);

  const onMFAsubmit = useCallback(async (data: any) => {
    setFakeLoading(true);
    const { code } = data;
    try {
      await Auth.confirmSignIn(
        user,
        code,
        'SMS_MFA',
      );
      userHasAuthenticated(true);
      dispatch(push(routes.dashboard.path));
    } catch (err) {
      setExtraError(err.message);
      setFakeLoading(false);
    }
  }, [user]);

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
    user && previewVisible ?
      <SignInMFA
        onMFAsubmit={onMFAsubmit}
        handlePreviewCancel={handlePreviewCancel}
        previewVisible={previewVisible}
        extraError={extraError}
        fakeLoading={fakeLoading}
      />
      :
      <AuthForm
        signUpConfirmed={sign_up_confirmed}
        onClickGoogle={onClickGoogle}
        onChangeFields={() => setExtraError(null)}
        extraError={extraError}
        loading={fakeLoading}
        variant='signIn'
        onSubmit={onSubmit}
      />
  );
};

export default SignIn;