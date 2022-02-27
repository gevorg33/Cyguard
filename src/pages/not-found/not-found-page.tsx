import React from 'react';
import { Layout, Row, Button, Typography, Col } from 'antd';
import Copyright from 'components/atoms/copyright/Copyright';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import routes from 'routes/routes';

import './not-found.scss';

const NotFoundPage: React.FC<any> = ():JSX.Element => {
  const dispatch: Dispatch = useDispatch();

  const onClickButton = () => {
    dispatch(push(routes.dashboard.path));
  };

  return (
    <Layout className='not_found_layout'>
      <Layout.Content className='d-flex'>
        <Row className='flex-1' align='middle' justify='center'>
          <Col xs={ 24 } lg={12}>
            <Typography.Title className='text-center'>
              Sorry, page not found
            </Typography.Title>
            <div className='d-flex justify-center'>
              <Button
                type='primary'
                size='large'
                onClick={onClickButton}
              >
                Go dashboard
              </Button>
            </div>
          </Col>
        </Row>

      </Layout.Content>
      <Layout.Footer className='guest_layout__footer'>
        <Row justify='center'>
          <Copyright />
        </Row>
      </Layout.Footer>
    </Layout>
  );
};

export default NotFoundPage;
