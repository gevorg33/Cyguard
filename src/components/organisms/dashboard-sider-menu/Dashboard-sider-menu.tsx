import { Menu } from 'antd';
import routes from '../../../routes/routes';
import { CreditCardIcon, LogOutIcon, SettingsIcon, UserMenuIcon } from '../../../assets/images';
import { FileDoneOutlined, TeamOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/user/selectors';
import { Link } from 'react-router-dom';
import HelpComponent from '../../atoms/help-component/help-component';
import React, { memo } from 'react';

const menuItems: any = {};
menuItems[routes.dashboard.path] = 'dashboard';
menuItems[routes.dashboardAccounts.path] = 'dashboardAccounts';
menuItems[routes.dashboardPayments.path] = 'dashboardPayments';
// menuItems[routes.dashboardNotifications.path] = 'dashboardNotifications';
menuItems[routes.dashboardSettings.path] = 'dashboardSettings';
menuItems[routes.dashboardPaymentsApproval.path] = 'dashboardPaymentsApproval';
menuItems[routes.dashboardTeamMembers.path] = 'dashboardTeamMembers';
menuItems['profile'] = 'profile';

const DashboardSiderMenu = (): JSX.Element => {
  const { roles } = useSelector(userSelector).user;
  const isAdmin = () => roles?.find((role: any) => role.name === 'Business Leader');
  return (
    <Menu
      mode='inline'
      className='sidebar-menu'
    >
      <span className='description mb-25'>dashboard</span>

      <Menu.Item
        key={menuItems[routes.dashboardAccounts.path]}
        icon={<UserMenuIcon />}
      >
        <Link to={`/payment-accounts`}>
          <span className='menu-item'>Accounts</span>
        </Link>
      </Menu.Item>

      <Menu.Item
        key={menuItems[routes.dashboardPayments.path]}
        icon={<CreditCardIcon />}
      >
        <Link to={`/payments`}>
          <span className='menu-item'>Payments</span>
        </Link>
      </Menu.Item>

      <Menu.Item
        key={menuItems[routes.dashboardTeamMembers.path]}
        icon={<span className='c-green'><TeamOutlined className='v-a-mid payments-approval-icon'/></span>}
      >
        <Link to={`/team-members`}>
          <span className='menu-item'>Team Members</span>
        </Link>
      </Menu.Item>

      {isAdmin() && <Menu.Item
        key={menuItems[routes.dashboardPaymentsApproval.path]}
        icon={<span className='c-green'><FileDoneOutlined className='v-a-mid payments-approval-icon' /></span>}
      >
        <Link to={`/payment-approvals`}>
          <span className='menu-item'>Payments Approval</span>
        </Link>
      </Menu.Item>}

      {/*<Menu.Item*/}
      {/*  key={menuItems[routes.dashboardNotifications.path]}*/}
      {/*  icon={<span className='c-green'><NotifyIcon className='v-a-mid' /></span>}*/}
      {/*>*/}
      {/*  <Link to={`/notifications`}>*/}
      {/*    <span className='menu-item'>Notifications</span>*/}
      {/*  </Link>*/}
      {/*</Menu.Item>*/}

      <Menu.Item
        key={menuItems[routes.dashboardSettings.path]}
        icon={<SettingsIcon />}
      >
        <Link to={`/settings`}>
          <span className='menu-item'>Settings</span>
        </Link>
      </Menu.Item>

      <div className='sider-footer'>
        <Link to={`/help`}>
          <HelpComponent />
        </Link>

        <Link to={`/`}>
          <div className='c-white mt-40 ml-18'>
            <LogOutIcon />
            <span className='menu-item'>Log out</span>
          </div>
        </Link>
      </div>
    </Menu>
  );
};

export default memo(DashboardSiderMenu);