import React from 'react';
import { Layout, Row } from 'antd';
import Copyright from 'components/atoms/copyright/Copyright';
import './auth-layout.scss';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ():JSX.Element => {

  return (
    <Layout className='auth_layout'>
      <Layout.Header className='auth_layout__header'>
        Header
      </Layout.Header>
      <Layout.Content className='auth_layout__content test d-flex flex-col'>
        Content
      </Layout.Content>
      <Layout.Footer className='auth_layout__footer'>
        <Row justify='center'>
          <Copyright />
        </Row>
      </Layout.Footer>
    </Layout>
  );
};

export default AuthLayout;
