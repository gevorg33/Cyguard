import React, { FC, useState, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import LayoutContentHeader from '../../components/atoms/layout-content-header/layout-content-header';
import DashboardSiderMenu from '../../components/organisms/dashboard-sider-menu/Dashboard-sider-menu';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Logo, MenuIcon, CloseIcon } from '../../assets/images';
import './dashboard.scss';

interface Props {
  children: React.ReactNode;
}

const Dashboard: FC<Props> = (props): JSX.Element => {
  const history = useHistory();
  const { width } = useWindowSize();

  const [showCloseIcon, setShowCloseIcon] = useState<boolean>(false);

  return (
    <Layout className='dashboard'>
      <Layout.Header className='dashboard-layout-header'>
        <div
          onClick={() =>
            history.push(`/`)
          }
          className='sider-logo-layout-header'>
          <Logo />
        </div>
      </Layout.Header>
      <Layout>
        <div>
          <Layout.Sider
            trigger={showCloseIcon ? <MenuIcon /> : <CloseIcon />}
            width={width && width < 1025 ? 300 : 361}
            className='left-sidebar'
            breakpoint='sm'
            collapsedWidth='0'
            onCollapse={() => {
              setShowCloseIcon(!showCloseIcon);
            }}
          >
            <div onClick={() => history.push(`/`)} className='sider-logo'><Logo /></div>
            <DashboardSiderMenu />
          </Layout.Sider>

        </div>
        <Layout className='bg-dark'>
          <Layout.Header className='dashboard-layout-content-header'>
            <LayoutContentHeader />
          </Layout.Header>

          <Layout.Content className='layout-content-override'>
            {props.children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default memo(Dashboard);
