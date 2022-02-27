import React, { memo, useEffect, useState } from 'react';
import { Button, Pagination, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { paymentAccountsDataSelector } from '../../../store/payment-account/selectors';
import { getPaymentAccount } from '../../../store/payment-account/action';
import PaymentAccountVerificationStatus
  from '../../atoms/payment-account-verification-status/payment-account-verification-status';
import PaymentAccountExpandedRows from '../../molecules/payment-account-expanded-rows/payment-account-expanded-rows';
import { CURRENT_PAGE_LIMIT } from '../../../constants';
import routes from '../../../routes/routes';
import { ChevronRight, UserIcon } from '../../../assets/images';
import './dashboard-accounts.scss';
import { formatedDate } from '../../../utils';

const DashboardAccounts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const { paymentAccountData, in_process } = useSelector(paymentAccountsDataSelector);
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentAccount({ page: currentPage, limit: CURRENT_PAGE_LIMIT }));
  }, [currentPage]);

  const handleChange = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (width && width < 1025) {
      setColumns([
        {
          key: 'id',
          title: 'Company Name',
          dataIndex: 'name',
          width: '31%',
        },
        {
          key: 'id',
          title: 'Date Added',
          width: '31%',
          render: (record: any) => <span>{formatedDate(record.updatedAt)}</span>,
        },
        {
          key: 'id',
          title: 'Actions',
          width: '7%',
          render: () => (
            <Button
              className='edit-btn'
              size='small'
              type='primary'
              disabled={true}
            >
              edit
            </Button>
          ),
        },
      ]);
    } else {
      setColumns([
        {
          key: 'id',
          title: 'Company Name',
          dataIndex: 'name',
          width: '24%',
        },
        {
          key: 'id',
          title: 'Freshness',
          width: '24%',
          render: (record: any) => <span>{formatedDate(record.updatedAt)}</span>,
        },
        {
          key: 'id',
          title: 'Email Verification',
          width: '14%',
          render: (record: any) => <PaymentAccountVerificationStatus record={record} type='emailVerified' />,
        },
        {
          key: 'id',
          title: 'Phone Verification',
          width: '15%',
          render: (record: any) => <PaymentAccountVerificationStatus record={record} type='phoneVerified' />,
        },
        {
          key: 'id',
          title: 'Google Account Verification',
          width: '15%',
          render: (record: any) => <PaymentAccountVerificationStatus record={record} type='gAuthVerified' />,
        },
        // {
        //   key: 'id',
        //   title: 'Secret Sentence',
        //   width: '21%',
        //   render: ()=>{
        //     return <>
        // <span>
        //   secret sentence
        // </span>
        //     </>
        //   }
        // },
        {
          key: 'id',
          title: 'Actions',
          width: '7%',
          render: () => {
            return (
              <Button
                className='edit-btn'
                size='small'
                type='primary'
                disabled={true}
              >
                edit
              </Button>
            );
          },
        },
      ]);
    }
  }, [width]);

  return (
    <div className='dasboard-accounts'>
      <div className='d-flex justify-space-between'>
        <div className='mb-50'>
          <UserIcon className='notify-icon-large' />
          <Typography.Title level={4} className='d-i-block'>Payment Accounts</Typography.Title>
        </div>
        <div className='new-company-btn-area'>
          <Link to={{ pathname: `${routes.createCompany.path}` }}>
            <Button
              className='add-new-company-btn'
              type='primary'
              size='large'
            >
              Add New
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Table
          loading={in_process}
          bordered={false}
          columns={columns}
          dataSource={paymentAccountData.paymentAccounts}
          rowKey='id'
          expandable={{
            expandedRowRender: record => <PaymentAccountExpandedRows record={record} />,
            expandIcon: ({ expanded, onExpand, record }) => {
              return (
                <span className={`c-green ${expanded ? 'rotate-icon' : ''} `}>
                        <ChevronRight onClick={(e: any) => onExpand(record, e)} />
                  </span>
              );
            },
          }}
          expandIconColumnIndex={width && width < 1025 ? 3 : 6}
          pagination={false}
        />
        <Pagination
          className='pb-20'
          onChange={handleChange}
          defaultCurrent={currentPage}
          total={paymentAccountData.totalCount}
          showTotal={total => `Total ${total} company`} //
          locale={{ items_per_page: '' }}
        />
      </div>
    </div>
  );
};

export default memo(DashboardAccounts);