import React, { FC } from 'react';
import routes from '../../../routes/routes';
import { Layout, Row, Col } from 'antd';
import AllReadyUser from '../../molecules/already-user/already-user';
import { Link, useHistory } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Logo } from '../../../assets/images';

const { Header } = Layout;
const HeaderWrapper:FC<any> = ():JSX.Element => {
  const history = useHistory();
  const { location } = useSelector((state: RootStateOrAny) => state.router);
  const path = history.location.pathname;

  return(
    <Header className={`guest_layout__header ${path === '/sign-up/successful' ? 'bg-secondary' : ''}`}>

      {location.pathname !== routes.signIn.path && (
        <>
          <Col xs={12} lg={12}>
            <Row justify='start'>
              <Link to='/'><Logo/></Link>
            </Row>
          </Col>

          <Col xs={12} lg={12}>
            <Row justify='end'>
              <AllReadyUser />
            </Row>
          </Col>
        </>
      )}
    </Header>
  )
}

export default HeaderWrapper