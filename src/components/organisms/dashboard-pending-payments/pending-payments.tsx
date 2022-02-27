import React, { FC, useState, useEffect, memo, useCallback } from 'react';
import { ChevronRight, PaymentsIcon, PdfIcon, MentionIcon } from '../../../assets/images';
import { Button, Table, Typography, Pagination } from 'antd';
import PaymentsVerificationStatus from '../../atoms/payments-verification-status/payments-verification-status';
import { useDispatch, useSelector } from 'react-redux';
import { getPayments, nudgePayment, donePayment } from '../../../store/payments/action';
import { paymentsDataSelector } from '../../../store/payments/selectors';
import routes from '../../../routes/routes';
import { formatedDate, createDownloadLink } from '../../../utils';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { CURRENT_PAGE_LIMIT } from '../../../constants';
import PendingPaymentsExpandedRows from '../../molecules/pending-payments-expanded-rows/pending-payments-expanded-rows';
import NudgeDoneButtons from '../../atoms/pop-confirm-buttons/nudge-done-buttons';
import { DashboardApiService } from '../../../api/dashboard-api-service';

const PendingPayments: FC<any> = (): JSX.Element => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [columns, setColumns] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { paymentsData, in_process } = useSelector(paymentsDataSelector);

  const handleDone = useCallback((id: string) => {
    dispatch(donePayment(id));
  }, []);

  const handleNudge = useCallback((id: string) => {
    dispatch(nudgePayment(id));
  }, []);

  useEffect(() => {
    dispatch(getPayments({ page: currentPage, limit: CURRENT_PAGE_LIMIT }));
  }, [currentPage]);

  const handleChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleDownload = useCallback((id: string) => {
    DashboardApiService.downloadPaymentRequest(id)
      .then((fileUrl) => {
        createDownloadLink(fileUrl);
      });
  }, []);

  useEffect(() => {
    if (width && width < 1025) {
      setColumns([
        {
          key: 'key',
          title: 'Company Name',
          dataIndex: ['paymentAccount', 'name'],
          width: '31%',
        },
        {
          key: 'key',
          title: 'Date Added',
          width: '31%',
          render: (record: any) => <span>{formatedDate(record.createdAt)}</span>,
        },
        {
          key: 'key',
          title: 'Amount',
          dataIndex: 'amountUsd',
          width: '31%',
        },
      ]);
    } else {
      setColumns([
        {
          key: 'key',
          title: 'Company Name',
          dataIndex: ['paymentAccount', 'name'],
          width: '12%',
        },
        {
          key: 'key',
          title: 'Date Added',
          width: '12%',
          render: (record: any) => <span>{formatedDate(record.createdAt)}</span>,
        },
        {
          key: 'key',
          title: 'Amount',
          dataIndex: 'amountUsd',
          width: '9%',
        },
        {
          key: 'key',
          title: 'Check List',
          width: '20%',
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
          key: 'key',
          title: 'Freshness',
          width: '15.5%',
          render: (record: any) => <span className='mr-10'>{formatedDate(record.updatedAt)}</span>,
        },
        {
          key: 'key',
          title: 'Invoice identifier',
          dataIndex: 'invoiceIdentifier',
          width: '11%',
        },
        {
          key: 'key',
          title: <MentionIcon />,
          dataIndex: 'attachments',
          width: '2%',
          render: (record: any) => {
            const [attachment] = record;
            return (
              attachment ?
                <span
                  className='c-green'
                  onClick={() => handleDownload(attachment.id)}
                >
                  <PdfIcon className='vertical-middle' />
                </span> :
                <PdfIcon className='vertical-middle c-light-grey' />
            );
          },
        },
        {
          key: 'key',
          title: 'actions',
          width: '19.5%',
          render: (record: any) =>
            <NudgeDoneButtons
              record={record}
              handleDone={handleDone}
              handleNudge={handleNudge}
            />,
        },
      ]);
    }
  }, [width]);

  return (
    <div className='dashboard-notifications'>
      <div className='d-flex justify-space-between'>
        <div className='mb-50'>
          <PaymentsIcon className='notify-icon-large' />
          <Typography.Title level={4} className='d-i-block'>Pending Payments</Typography.Title>
        </div>
        <div className='new-company-btn-area'>
          <Link to={routes.addPendingPayments.path}>
            <Button
              className='add-new-company-btn'
              size='large'
              type='primary'
            >
              Add New
            </Button>
          </Link>
        </div>
      </div>
      <Table
        loading={in_process}
        bordered={false}
        columns={columns}
        dataSource={paymentsData.payments}
        className='dashboard-team-members'
        rowKey='id'
        expandable={{
          expandedRowRender: record => <PendingPaymentsExpandedRows record={record} handleDone={handleDone}
                                                                    handleNudge={handleNudge}
                                                                    handleDownload={handleDownload} />,
          expandIcon: ({ expanded, onExpand, record }) => {
            return (
              <span className={`c-green ${expanded ? 'rotate-icon' : ''} `}>
                        <ChevronRight onClick={(e: any) => onExpand(record, e)} />
                </span>
            );
          },
        }}
        expandIconColumnIndex={width && width < 1025 ? 3 : 8}
        pagination={false}
      />
      <Pagination
        className='pb-20'
        onChange={handleChange}
        defaultCurrent={currentPage}
        total={paymentsData.totalCount}
        showTotal={total => `Total ${total} pending payment`}
        locale={{ items_per_page: '' }}
      />
    </div>
  );
};

export default memo(PendingPayments);