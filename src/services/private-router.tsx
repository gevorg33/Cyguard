import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import AuthLayout from '../layouts/auth/auth-layout';
import Auth from 'services/auth';
import axios from 'axios';
import { setUserData } from '../store/user/action';
import { useDispatch } from 'react-redux';
import PrivateLayout from '../layouts/private';

export const PrivateRoute = ({ component: Component, ...rest }: any) => {

  const Layout = rest.layout || AuthLayout;
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchMe = async () => {
    const token = Auth.getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}users/me`);
        response && dispatch(setUserData(response.data.user));
      }catch (err){
        history.push('/')
      }
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
      <Route
        {...rest}
        render={props => (
          <PrivateLayout match={props.match}>
            <Layout match={props.match}>
              <Component {...props} />
            </Layout>
          </PrivateLayout>
        )}
      />
  );
};
