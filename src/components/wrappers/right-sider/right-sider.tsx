import React from 'react';
import { Divider } from 'antd';
import csx from 'classnames';
import GlobalLoader from 'components/atoms/global-loader/global-loader';
import './right-sider.scss';

export interface RightSiderProps {
  children: React.ReactNode | React.ReactNodeArray;
  loading?: boolean;
  title?: React.ReactNode | string;
  subTitle?: React.ReactNode | string;
  actions?: React.ReactNode | React.ReactNodeArray;
}

const RightSider: React.FC<RightSiderProps> = ({
  loading,
  children,
  actions,
}) => (
  <div className='pr-24 d-flex flex-col min-h-full'>
    <div
      className={csx({
        'd-flex flex-wrap mt-19 justify-flex-end': true,
      })}
    >
      {!!actions && (
        <>
          <div className='mb-6'>
            {actions}
          </div>
          <Divider className='m-0' />
        </>
      )}
    </div>
    {loading ? (
      <div className='w-full h-full relative flex-1'>
        <GlobalLoader />
      </div>
    ) : (
      children
    )}
  </div>
);

export default RightSider;
