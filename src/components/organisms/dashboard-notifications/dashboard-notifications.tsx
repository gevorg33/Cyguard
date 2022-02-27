import React, { FC, memo, useState } from 'react';
import { Pagination, Table, Typography } from 'antd';
import { ChevronRight, NotifyIcon } from '../../../assets/images';
import { notification, columns } from '../../../constants';

import './dashboard-notifications.scss';

const DashboardNotifications: FC<any> = memo(() => {

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (skip: any): void => {
    console.log('dispatch the action to take or skip pages giving them count');
    setCurrentPage(skip);
  };

  return (
    <div className='dashboard-notifications'>

      <div className='mb-50'>
        <NotifyIcon className='notify-icon-large' />
        <Typography.Title level={4} className='d-i-block'>Notifications</Typography.Title>
      </div>

      <Table
        bordered={false}
        columns={columns}
        dataSource={notification}
        expandable={{
          expandedRowRender: record => {
            return (
              <p className='m-1'>{record.description}</p>
            );
          },
          expandIcon: ({ expanded, onExpand, record }) => (
            <span className={`c-green ${expanded ? 'rotate-icon' : ''} `}>
                        <ChevronRight onClick={(e: any) => onExpand(record, e)} />
                        </span>
          ),
        }}
        expandIconColumnIndex={2}
        pagination={false}
      />
      <Pagination
        onChange={handleChange}
        defaultCurrent={currentPage}
        total={notification?.length}
        showTotal={total => `Total ${total} notification`}
        locale={{ items_per_page: '' }}
      />
    </div>
  );
});

DashboardNotifications.displayName = 'DashboardNotifications';

export default DashboardNotifications;