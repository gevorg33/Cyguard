import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'antd';
import { getUser } from 'store/user/action';
import HomePageWrapper from '../../components/wrappers/home-page-wrapper';

const Home: React.FC<any> = ():JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Row justify='center' >
      <HomePageWrapper/>
    </Row>
  );
};

export default Home;
