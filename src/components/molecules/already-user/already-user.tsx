import React, { useState } from 'react';
import { Typography } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import UserLogin from '../../organisms/login-modal/user-login';
import MobileSider from './mobile-sider/mobile-sider';
import routes from 'routes/routes';
import { HomeIcon, UserIcon } from '../../../assets/images';


import './already-user.scss';

const AlreadyUser: React.FC = ():JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div className='already_user'>

      <div className='navbar-visible'>
        <Typography.Text className='already_user__text'>LogIn</Typography.Text>
        {/*<RouterLink className='ml-10' to={routes.sign-in.path}>*/}
        {/*</RouterLink>*/}

        <span className='ml-10 c-green'>
         <UserIcon
           onClick={() => {
             setModalOpen(true);
           }}
         />
        </span>

        <UserLogin
          visible={isModalOpen}
          onCancel={() => {
            setModalOpen(false);
          }}
        />

        <RouterLink className='ml-41' to={routes.home.path}>
          <HomeIcon />
        </RouterLink>
      </div>

      <MobileSider setModalOpen={setModalOpen} />
    </div>
  );
};

export default AlreadyUser;
