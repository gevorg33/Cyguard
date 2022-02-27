import React from 'react';
import { Typography } from 'antd';
import { UserIcon } from '../../../../assets/images';
import './mobile-sider.scss';

const MobileSider:React.FC<any> = ({setModalOpen}):JSX.Element => {
  return(
  <div className='navbar-sider'>
    <input type="checkbox" id="active"/>
    <label htmlFor="active" className="menu-btn"><span></span></label>
    <label htmlFor="active" className="close"></label>
    <div className="wrapper">
      <ul>
        <li>
        <Typography.Text className='already_user__text'>LogIn</Typography.Text>
        {/*<RouterLink className='ml-10' to={routes.sign-in.path}>*/}
        {/*</RouterLink>*/}
        <span className='ml-10 c-green'>
         <UserIcon
           onClick={() => {
             setModalOpen(true)
           }}
         />
        </span>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default MobileSider;