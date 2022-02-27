import { Button, Col, Form, Input, Row, Typography, Select, Upload } from 'antd';
import React, { FC, useState, useRef } from 'react';
import { addPendingPayment, getFilteredLeaders } from '../../../store/payments/action';
import { getFilteredPaymentAccounts } from '../../../store/payment-account/action';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { paymentAccountsDataSelector } from '../../../store/payment-account/selectors';
import { paymentsDataSelector } from '../../../store/payments/selectors';
import { PaymentsIcon } from '../../../assets/images';
import '../../molecules/create-payment-account-steps/step-one/general-info.scss';

const AddPendingPayments: FC<any> = (): JSX.Element => {
  const [scopeErrors, setScopeErrors] = useState<any>({});
  const [selectedBusinessLeader, setSelectedBusinessLeader] = useState(undefined);
  const [selectedPaymentAccount, setSelectedPaymentAccount] = useState(undefined);
  const initList: any[] = [];
  const [fileList, setFileList] = useState<any[]>(initList);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const { filteredLeaders } = useSelector(paymentsDataSelector);
  const { filteredPaymentAccounts } = useSelector(paymentAccountsDataSelector);
  const { data: filteredBusinessLeaders } = filteredLeaders;
  const { data: filteredAccounts } = filteredPaymentAccounts;

  const formData = useRef(new FormData());

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const handleSearchPaymentAccounts = (value: string) => {
    dispatch(getFilteredPaymentAccounts(value));
  };

  const handleSearchBusinessLeaders = (value: string) => {
    dispatch(getFilteredLeaders(value));
  };

  const handleChangePaymentAccount = (selectedId: any) => {
    setSelectedPaymentAccount(selectedId);
  };

  const handleChangeBusinessLeader = (selectedId: any) => {
    setSelectedBusinessLeader(selectedId);
  };

  const handleAppendFile = ({ file, onSuccess }:any) => {
    if(file){
      formData.current.delete('attachment');
    }
    formData.current.append('attachment', file);
    onSuccess("ok");
  };

  const onSubmit = (data: any) => {
    for (const name in data) {
      if (name !== 'attachment') {
        formData.current.append(name, data[name]);
      }
    }
    dispatch(addPendingPayment(formData.current));
    history.push('/payments');
  }

  return (
    <>
      <Row>
        <div className='mb-50'>
          <PaymentsIcon className='notify-icon-large' />
          <Typography.Title level={4} className='d-i-block'>Add Pending Payments</Typography.Title>
        </div>
      </Row>
      <Form
        noValidate={true}
        name={'login'}
        className='edit-company-step-one add-team-member'
        onFinish={onSubmit}
        form={form}
        validateTrigger='onFinish'
        onValuesChange={() => {
          setScopeErrors({});
        }}
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please, select a valid Name.',
                },
              ]}
              name='businessLeaderId'
            >
              <Select
                showSearch={true}
                value={selectedBusinessLeader}
                className='mt-15 c-black w-60'
                placeholder='Business Leader'
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                onSearch={handleSearchBusinessLeaders}
                onChange={handleChangeBusinessLeader}
                notFoundContent={null}
              >
                {filteredBusinessLeaders?.users.map((businessLeader: any) =>
                  <Select.Option key={businessLeader.id} value={businessLeader.id}>
                    {`${businessLeader?.firstName} ${businessLeader?.lastName}`}
                  </Select.Option>,
                )}
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please, select a valid Account.',
                },
              ]}
              name='paymentAccountId'
            >
              <Select
                showSearch={true}
                value={selectedPaymentAccount}
                className='mt-15 c-black w-60'
                placeholder='Payment Account'
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                onSearch={handleSearchPaymentAccounts}
                onChange={handleChangePaymentAccount}
                notFoundContent={null}
              >
                {filteredAccounts?.paymentAccounts.map((paymentAccount: any) =>
                  <Select.Option key={paymentAccount.id} value={paymentAccount.id}>
                    {paymentAccount.name}
                  </Select.Option>,
                )}
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please, enter an Amount.',
                },
              ]}
              name='amount'
            >
              <Input
                size='large'
                type='number'
                autoComplete='off'
                className='input-email mt-15 c-black w-60'
                placeholder='Amount'
                suffix={form.getFieldValue('amount') || '0.00'}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  type:'string',
                  required: false,
                  message: 'Please, enter the Invoice identifier.',
                },
              ]}
              name='invoiceIdentifier'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-email mt-15 c-black w-60'
                placeholder='Invoice identifier'
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              rules={[
                {
                  required: false,
                  message: 'Please, select the file.',
                },
              ]}
              name='attachment'
              // getValueFromEvent={({file}) => file.originFileObj}
            >
              <div className='add-payment-file-section txt-al-center'>
                <Upload
                  listType='picture-card'
                  accept=".txt, .csv, .pdf"
                  fileList={fileList}
                  onChange={onChange}
                  customRequest={handleAppendFile}
                  maxCount={1}
                  showUploadList={true}
                >
                  {fileList.length < 1 && 'Add File'}
                </Upload>
                <span className='no-file-uploaded'>{fileList.length < 1 && 'no file uploaded'}</span>
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            htmlType='submit'
            className='auth_form__submit submit-btn request-approval-btn'
            type='primary'
            size='large'
          >
            Request Approval
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPendingPayments;