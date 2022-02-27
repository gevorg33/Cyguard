import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import ConfirmEmailForm from 'components/organisms/confirm-email-form/confirm-email-form';
import { useAppContext } from 'libs/context-lib';
import { Auth } from 'aws-amplify';
import routes from 'routes/routes';
import { useDispatch } from 'react-redux';


const ConfirmEmailPage: React.FC<any> = () => {
  const { userHasAuthenticated } = useAppContext();
  const dispatch = useDispatch();

  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
        setTimeout(() => {
          dispatch(push(routes.designs.path));
        }, 50);
      }
      catch(e) {
        console.log(e.message);
      }
    }
    onLoad();
  }, [userHasAuthenticated, dispatch]);


  return (
    <ConfirmEmailForm />
  );
};

export default ConfirmEmailPage;
