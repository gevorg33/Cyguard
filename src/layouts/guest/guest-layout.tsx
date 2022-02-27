import React from 'react';
import { Col, Layout, Row } from 'antd';
import Copyright from 'components/atoms/copyright/Copyright';
import BreadcrumbComponent from '../../components/atoms/breadcrumb/breadcrumb-component';
import SignUpBySteps from '../../pages/sign-up/sign-up-by-steps/sign-up-by-steps';
import { useHistory } from 'react-router-dom';
import './guest-layout.scss';

import HeaderWrapper from '../../components/wrappers/header/header-wrapper';

export interface GuestLayoutProps {
  children: React.ReactNode;
}

const { Footer, Content } = Layout;

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <Layout
      className={`guest_layout ${path === '/sign-up' ? 'my-layout' : ''}`}
    >
      <HeaderWrapper/>

      <Content>
        <Row className='guest_layout__row'>
          {path === '/sign-up' ?
            <SignUpBySteps /> :
            children
          }
        </Row>
      </Content>

      { path === '/sign-up' ||
        <Footer className='guest_layout__footer'>
          <Col>
            <Row justify='center'>
              <BreadcrumbComponent />
            </Row>
          </Col>

          <Col>
            <Row justify='center'>
              <Copyright />
            </Row>
          </Col>
        </Footer>
      }

    </Layout>
  );
};

export default GuestLayout;
