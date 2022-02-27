import { Button, Form, Input, Modal, Typography } from 'antd';
import React, { FC, memo } from 'react';

interface ISignInMFA {
  previewVisible: boolean;
  handlePreviewCancel: () => void;
  onMFAsubmit: (arg: { code: string }) => void;
  extraError: string | null;
  fakeLoading: boolean;
}

const SignInMFA: FC<ISignInMFA> = ({
                                     previewVisible,
                                     handlePreviewCancel,
                                     onMFAsubmit,
                                     extraError,
                                     fakeLoading,
                                   }): JSX.Element => (
  <Modal
    visible={previewVisible}
    footer={null}
    onCancel={handlePreviewCancel}
  >
    <Form
      noValidate={true}
      name='confirmPhone'
      initialValues={{ code: '' }}
      onFinish={onMFAsubmit}
      validateTrigger='onFinish'
    >
      <div className='already-user-title'>
        <Typography.Title className='verification-code f-size-18' level={3}>Please confirm your
          Phone</Typography.Title>
      </div>

      <Form.Item
        rules={[
          {
            required: true,
            type: 'string',
            message: 'Please, enter the Code.',
          },
        ]}
        name='code'
        validateStatus={extraError ? 'error' : undefined}
        help={extraError ? extraError : false}
      >
        <Input
          size='large'
          type='email'
          autoComplete='off'
          className='input-username mt-15'
          placeholder='Enter Code'
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType='submit'
          className='auth_form__submit'
          type='primary'
          size='large'
          disabled={fakeLoading}
        >
          Verify
        </Button>
      </Form.Item>

    </Form>
  </Modal>
);

export default memo(SignInMFA);