import React, { FC, useEffect, useState, memo } from 'react';
import { Table, Typography, Pagination } from 'antd';
import { CURRENT_PAGE_LIMIT } from '../../../constants';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { formatedDate } from '../../../utils';
import { getPaymentsForLeader, setApprovePaymentId, setDeclinePaymentId } from '../../../store/payments/action';
import { paymentsDataSelector } from '../../../store/payments/selectors';
import PopConfirmButtons from '../../atoms/pop-confirm-buttons/pop-confirm-buttons';
import PaymentsVerificationStatusOverlay
  from '../../molecules/payments-verification-status-overlay/payments-verification-status-overlay';
import { ChevronRight, PaymentsIcon, PdfIcon } from '../../../assets/images';
import './dashboard-payments.scss';
import PaymentsVerificationStatus from '../../atoms/payments-verification-status/payments-verification-status';
import GoogleAccountVerifyForm
  from '../../molecules/create-payment-account-steps/step-four/google-account-confirm-modal/google-account-verify-form';

const DashboardPayments: FC<any> = (): JSX.Element => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const {
    paymentsForLeader,
    totalCount,
    in_process,
    currentApproveId,
    currentDeclineId,
  } = useSelector(paymentsDataSelector);

  const handleDecline = (id: string) => {
    if (currentApproveId) {
      dispatch(setApprovePaymentId(''));
    }
    dispatch(setDeclinePaymentId(id));
    setIsModalOpened(true);
  };

  const handleApprove = (id: string) => {
    if (currentDeclineId) {
      dispatch(setDeclinePaymentId(''));
    }
    dispatch(setApprovePaymentId(id));
    setIsModalOpened(true);
  };

  const handleChange = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getPaymentsForLeader({ page: currentPage, limit: CURRENT_PAGE_LIMIT }));
  }, [currentPage]);

  useEffect(() => {
    if (width && width < 1025) {
      setColumns([
        {
          key: '1',
          title: 'Company Name',
          dataIndex: ['paymentAccount', 'name'],
          width: '31%',
        },
        {
          key: '2',
          title: 'Date Added',
          width: '31%',
          render: (record: any) => <span>{formatedDate(record.createdAt)}</span>,
        },
        {
          key: '3',
          title: 'Amount',
          dataIndex: 'amountUsd',
          width: '31%',
        },
      ]);
    } else {
      setColumns([
          {
            key: '1',
            title: 'Company Name',
            dataIndex: ['paymentAccount', 'name'],
            width: '17%',
          },
          {
            key: '2',
            title: 'Date Added',
            width: '17%',
            render: (record: any) => <span>{formatedDate(record.createdAt)}</span>,
          },
          {
            key: '3',
            title: 'Amount',
            dataIndex: 'amountUsd',
            width: '17%',
          },
          {
            key: '4',
            title: 'Check List',
            width: '11.5%',
            render: (record: any) => {
              return (
                <PaymentsVerificationStatus
                  payeeStatus={record.payeeStatus}
                  businessLeaderStatus={record.businessLeaderStatus}
                  sameAsLast={record.paymentAccountDetails?.sameAsLast}
                />
              );
            },
          },
          {
            key: '5',
            title: 'Attachments',
            dataIndex: 'attachments',
            width: '17%',
            render: () => (
              <>
                <span className='mr-10'>payment(...)</span>
                <PdfIcon className='vertical-middle c-light-grey' />
              </>
            ),
          },
          {
            key: '6',
            title: 'actions',
            width: '20.5%',
            render: (record: any) =>
              <PopConfirmButtons
                record={record}
                handleApprove={handleApprove}
                handleDecline={handleDecline}
              />,
          },
        ],
      );
    }
  }, [width]);

  return (
    <div className='dashboard-notifications'>

      <div className='mb-50'>
        <PaymentsIcon className='notify-icon-large' />
        <Typography.Title level={4} className='d-i-block'>Pending Payments for Business Leader</Typography.Title>
      </div>

      <Table
        loading={in_process}
        bordered={false}
        columns={columns}
        dataSource={paymentsForLeader}
        className='dashboard-team-members'
        rowKey='id'
        expandable={{
          expandedRowRender: (record: any) => {
            return (
              <>
                <div className='d-flex justify-between mb-15'>
                  <Typography.Title level={5}>Files:</Typography.Title>
                  <div className='d-flex justify-between'>
                    <span className='mr-10 ml-30'>payment confirmation(...)</span>
                    <PdfIcon className='vertical-middle c-light-grey' />
                  </div>
                </div>
                <PaymentsVerificationStatusOverlay
                  payeeStatus={record.payeeStatus}
                  businessLeaderStatus={record.businessLeaderStatus}
                  sameAsLast={record.paymentAccountDetails?.sameAsLast}
                />
                <div className='d-flex justify-flex-end mb-20'>
                  <PopConfirmButtons
                    record={record}
                    handleApprove={handleApprove}
                    handleDecline={handleDecline}
                  />
                </div>
              </>
            );
          },
          expandIcon: ({ expanded, onExpand, record }) => {
            if (width && width < 1025) {
              return (
                <span className={`c-green ${expanded ? 'rotate-icon' : ''} `}>
                        <ChevronRight onClick={(e: any) => onExpand(record, e)} />
                        </span>
              );
            }
          },
        }}
        expandIconColumnIndex={6}
        pagination={false}
      />
      <Pagination
        className='pb-20'
        onChange={handleChange}
        defaultCurrent={currentPage}
        total={totalCount}
        showTotal={total => `Total ${total} payment`}
        locale={{ items_per_page: '' }}
      />
      <GoogleAccountVerifyForm
        visible={isModalOpened}
        onCancel={() => {
          setIsModalOpened(false);
        }}
      />
    </div>
  );
};

export default memo(DashboardPayments);