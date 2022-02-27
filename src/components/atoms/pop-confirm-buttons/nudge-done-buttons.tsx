import { Button, Popconfirm } from 'antd';
import React, { FC } from 'react';

interface Props {
  record: any;
  handleNudge: (id: string) => void;
  handleDone: (id: string) => void;
}

const NudgeDoneButtons: FC<Props> = ({ record, handleNudge, handleDone }): JSX.Element => (
  <>
    <Popconfirm
      title='Are you sure?'
      className='pop-confirm'
      onConfirm={() => {
        const { id } = record;
        handleNudge(id);
      }}
    >
      <Button
        className='decline-btn nudge-btn'
        size='small'
        type='primary'
      >
        nudge
      </Button>
    </Popconfirm>
    <Popconfirm
      title='Are you sure?'
      className='pop-confirm'
      onConfirm={() => {
        const { id } = record;
        handleDone(id);
      }}
    >
      <Button
        className='approve-btn ml-25-optional'
        size='small'
        type='primary'
      >
        done
      </Button>
    </Popconfirm>
  </>
);

export default NudgeDoneButtons;