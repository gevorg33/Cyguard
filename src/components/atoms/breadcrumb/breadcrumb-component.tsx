import React, { FC } from 'react';
import { Breadcrumb } from 'antd';
import './breadcrumb.scss';

const BreadcrumbComponent:FC = ():JSX.Element => {
  return(
    <div className='navbar-footer'>

      <Breadcrumb>
        <Breadcrumb.Item>Accounts</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href=''>Payments</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href=''>Notifications</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Contact</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

export default BreadcrumbComponent;