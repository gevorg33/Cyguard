import React, { FC, useEffect, useState } from 'react';
import { ChevronRight, UserIcon, UserCheckIcon, EditIcon, LockIcon } from '../../../assets/images';
import routes from '../../../routes/routes';
import { Button, Table, Typography, Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTeamMembers } from '../../../store/team-members/action';
import { teamMembersSelector } from '../../../store/team-members/selectors';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { formatedDate, hidePhoneNumber, hideEmail } from '../../../utils';
import { CURRENT_PAGE_LIMIT } from '../../../constants';
import './team-members.scss';

const TeamMembers: FC<any> = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const { teamMembersData, in_process } = useSelector(teamMembersSelector);
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamMembers({ page: currentPage, limit: CURRENT_PAGE_LIMIT }));
  }, [currentPage]);

  const handleChange = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (width && width < 1025) {
      setColumns([
        {
          key: 'id',
          title: 'Email',
          render: (record: any) => <span>{hideEmail(record.email)}</span>,
          width: '47%',
        },
        {
          key: 'id',
          title: 'Name',
          dataIndex: 'firstName',
          width: '47%',
        },
      ]);
    } else {
      setColumns([
        {
          key: 'id',
          title: 'Email',
          render: (record: any) => <span>{hideEmail(record.email)}</span>,
          width: '15.28%',
        },
        {
          key: 'id',
          title: 'Name',
          dataIndex: 'firstName',
          width: '15.28%',
        },
        {
          key: 'id',
          title: 'Phone',
          render: (record: any) => <span>{hidePhoneNumber(record.phoneNumber)}</span>,
          width: '15.28%',
        },
        {
          key: 'id',
          title: 'Role/Roles',
          render: (record: any) => {
            return record.roles.map((role: { name: string }, idx: number) =>
              <span key={idx}> {role.name} <br /> </span>,
            );
          },
          width: '15.28%',
        },
        {
          key: 'id',
          title: 'Creation Date',
          render: (record: any) => <span>{formatedDate(record.createdAt)}</span>,
          width: '15.28%',
        },
        {
          key: 'id',
          title: 'Last Login',
          render: (record: any) => <span>{formatedDate(record.verificationLastUpdate)}</span>,
          width: '15.28%',
        },
        {
          key: 'id',
          title: 'actions',
          width: '8.28%',
          render: (record: any) => {
            return (
              <>
                <Link to={{ pathname: `/editingPath/${record.key}` }}>
                  <LockIcon />
                </Link>
                <Link to={{ pathname: `/editingPath/${record.key}` }}>
                  <UserCheckIcon className='ml-14' />
                </Link>
                <Link to={{ pathname: `/editingPath/${record.key}` }}>
                  <EditIcon className='ml-10' />
                </Link>
              </>
            );
          },
        },
      ]);
    }
  }, [width]);

  return (
    <div>
      <div>
        <div className='mb-50'>
          <UserIcon className='notify-icon-large' />
          <Typography.Title level={4} className='d-i-block'>Team Members</Typography.Title>
        </div>

        <Table
          className='dashboard-team-members'
          bordered={false}
          columns={columns}
          dataSource={teamMembersData?.teamMembers}
          rowKey='id'
          loading={in_process}
          expandIconColumnIndex={7}
          pagination={false}
          expandable={{
            expandedRowRender: record => (<>
              <div className='d-flex justify-flex-end mb-10'>
                <Link to={{ pathname: `/company/${record.key}` }}>
                  <LockIcon />
                </Link>
                <Link to={{ pathname: `/company/${record.key}` }}>
                  <UserCheckIcon className='ml-14' />
                </Link>
                <Link to={{ pathname: `/company/${record.key}` }}>
                  <EditIcon className='ml-10' />
                </Link>
              </div>
              <div className='d-flex justify-between'>
                <Typography.Title level={5}>
                  Phone
                </Typography.Title>
                <Typography.Paragraph
                  className='m-1 display-i-b'
                >
                  {hidePhoneNumber(record.phoneNumber)}
                </Typography.Paragraph>
              </div>
              <div className='d-flex justify-between'>
                <Typography.Title level={5}>
                  Role/Roles
                </Typography.Title>
                <Typography.Paragraph
                  className='m-1 display-i-b'
                >
                  {record.roles.map((role: { name: string }, idx: number) => <span key={idx}>{role.name}<br /></span>)}
                </Typography.Paragraph>
              </div>
              <div className='d-flex justify-between'>
                <Typography.Title level={5}>
                  Creation Date
                </Typography.Title>
                <Typography.Paragraph
                  className='m-1 display-i-b'
                >
                  {formatedDate(record.createdAt)}
                </Typography.Paragraph>
              </div>
              <div className='d-flex justify-between'>
                <Typography.Title level={5}>
                  Last Login
                </Typography.Title>
                <Typography.Paragraph
                  className='m-1 display-i-b'>
                  {formatedDate(record.verificationLastUpdate)}
                </Typography.Paragraph>
              </div>
            </>),
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
        />
        <Pagination
          onChange={handleChange}
          defaultCurrent={currentPage}
          total={teamMembersData?.totalCount}
          showTotal={total => `Total ${total} user`}
          locale={{ items_per_page: '' }}
        />
      </div>
      <Link to={routes.addTeamMember.path}>
        <Button
          className='auth_form__submit submit-btn w-20 ml-150'
          type='primary'
          size='large'
        >
          Add
        </Button>
      </Link>
    </div>
  );
};

export default TeamMembers;