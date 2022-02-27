import { Result, Button } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const SuccessPage: FC = (): JSX.Element => (
  <Result
    status='success'
    title='Your operation has been executed!'
    extra={[
      <Link to='/' key='homepage'>
        <Button type='primary' key='console'>
          Go Home
        </Button>
      </Link>,
    ]}
  />
);

export default SuccessPage;