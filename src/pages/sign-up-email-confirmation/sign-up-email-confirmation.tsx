import React, { useEffect } from 'react';
import GlobalLoader from 'components/atoms/global-loader/global-loader';
import { Redirect } from 'react-router-dom';
import { parse } from 'query-string';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import routes from 'routes/routes';
import { signUpConfirmed } from 'store/user/action';
import { useAppContext } from 'libs/context-lib';

const SignUpEmailConfirmation: React.FC<any> = (): JSX.Element => {
  const queryParams: any = parse(window.location.search);
  const dispatch = useDispatch();
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  useEffect(() => {
    confirmAccount(queryParams.email, queryParams.code);

    function confirmAccount(email: string, code: string) {
      dispatch(signUpConfirmed({ email, code }));
      dispatch(push(routes.home.path));
    }
  }, [queryParams, dispatch, userHasAuthenticated]);

  return !isAuthenticated ? (
    <GlobalLoader />
  ) : <Redirect to={routes.dashboard.path} />;
};

export default SignUpEmailConfirmation;
