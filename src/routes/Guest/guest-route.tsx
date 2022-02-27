import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { Route, RouteProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import routes from 'routes/routes';
import { useAppContext } from 'libs/context-lib';
import { Auth } from '@aws-amplify/auth';
import GuestLayout from 'layouts/guest/guest-layout';

export interface GuestRouteProps extends RouteProps {
  component: React.JSXElementConstructor<any>;
}

const GuestRoute: React.FC<GuestRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const dispatch = useDispatch();

  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentAuthenticatedUser();
        userHasAuthenticated(true);
        setTimeout(() => {
          dispatch(push(routes.dashboard.path));
        }, 50);
      }
      catch(e) {
        console.log(e.message);
      }
    }
    onLoad();
  }, [userHasAuthenticated, dispatch, isAuthenticated]);



  return !isAuthenticated ? (
    <Route
      {...rest}
      render={(...renderProps) => (
        <GuestLayout>
          <Component {...renderProps} />
        </GuestLayout>
      )}
    />
  ) : null;
};

export default GuestRoute;
