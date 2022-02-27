import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import routes from 'routes/routes';
import { ChevronRight } from '../../../assets/images';

import './auth-agreement.scss';

export interface AuthAgreementProps {
  variant: 'signUp' | 'signIn',
}

const AuthAgreement: React.FC<AuthAgreementProps> = ({ variant }) => {
  return (
    <Typography.Paragraph className='auth_agreement mt-15'>
      {variant === 'signUp' ? (
        <>
          By signing up I agree to the
          <Link to={routes.termsAndCondition.path}> terms & conditions </Link>
          and<Link to={routes.privacyPolicy.path}> privacy policy</Link>.
        </>
      ) : (
        <>
          no account? <Link to={routes.signUp.path} className='link-to-signup'> Sign Up <ChevronRight
          className='ml-5 v-a-mid' /> </Link>
        </>
      )}
    </Typography.Paragraph>
  );
};

export default AuthAgreement;
