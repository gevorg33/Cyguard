import { Button, Popconfirm } from 'antd';
import React, { FC } from 'react';

interface Props {
  record: any;
  handleApprove: (id: string) => void;
  handleDecline: (id: string) => void;
}

const PopConfirmButtons:FC<Props> = ({ record, handleApprove, handleDecline }): JSX.Element => (
  <>
    <Popconfirm
      title='Are you sure?'
      className='pop-confirm'
      onConfirm={() => {
        const { id } = record;
        handleApprove(id);
      }}
    >
      <Button
        className='approve-btn'
        size='small'
        type='primary'
      >
        approve
      </Button>
    </Popconfirm>
    <Popconfirm
      title='Are you sure?'
      className='pop-confirm'
      onConfirm={() => {
        const { id } = record;
        handleDecline(id);
      }}
    >
      <Button
        className='decline-btn ml-25-optional'
        size='small'
        type='primary'
      >
        decline
      </Button>
    </Popconfirm>
  </>
);

export default PopConfirmButtons;