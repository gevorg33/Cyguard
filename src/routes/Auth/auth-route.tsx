import AuthLayout from 'layouts/auth/auth-layout';
import React, { useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';
import { getUser, setUserData } from 'store/user/action';
import { push } from 'connected-react-router';
import routes from '../routes';
import { Route, RouteProps } from 'react-router-dom';
import { useAppContext } from 'libs/context-lib';
import { useDispatch } from 'react-redux';

export interface AuthRouteProps extends RouteProps {
  component: React.JSXElementConstructor<any>;
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  const dispatch = useDispatch();

  useEffect(() => {
    async function onLoad() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        dispatch(setUserData({ id: user.username, token: user.signInUserSession.accessToken.jwtToken }));
        userHasAuthenticated(true);
      }
      catch(e) {
        dispatch(push(routes.home.path));
      }
    }
    onLoad();
  }, [userHasAuthenticated, dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return isAuthenticated ? (
    <Route
      {...rest}
      render={(...renderProps) => (
        <AuthLayout>
          <Component {...renderProps} />
        </AuthLayout>
      ) }
    />
  ) : null;
};

export default AuthRoute;
