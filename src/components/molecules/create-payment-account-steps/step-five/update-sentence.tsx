import React, { FC, useCallback, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import { paymentAccountSelector } from '../../../../store/payment-account/selectors';
import paymentAccountManagementApi from '../../../../api/payment-account-management-api';
import { setPaymentAccountData } from '../../../../store/payment-account/action';
import { FETCH_FAILURE_MESSAGE } from '../../../../constants';
import { ChevronRight } from '../../../../assets/images';
import '../step-one/general-info.scss';
import './step-five.scss';

interface IUpdateSentence {
  selfId?: string;
  token?: any;
}

const UpdateSentence: FC<IUpdateSentence> = ({ selfId, token }): JSX.Element => {

  const [form] = Form.useForm();
  const [fakeLoading, setFakeLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [currentId, setcurrentId] = useState<string>('');

  const dispatch = useDispatch();
  const history = useHistory();

  const paymentAccountData = useSelector(paymentAccountSelector).paymentAccount;
  const { paymentAccountId } = paymentAccountData;

  const generateSecretSentence = useCallback(async () => {
    paymentAccountManagementApi
      .generateSecretSentence(token)
      .then(data => {
        if (data) {
          form.setFieldsValue({
            sentence: data.sentence,
          });
        }
      }).catch(err => {
      console.log(err.message);
      message.error(FETCH_FAILURE_MESSAGE);
    });
  }, []);

  const onSubmit = useCallback(async (formData) => {

    const id = selfId ? selfId : paymentAccountId;

    setFakeLoading(true);
    paymentAccountManagementApi.updateSecretSentence(formData, id, token)
      .then(data => {
        if (data.status) {
          message.success('Processing complete!');
          if (paymentAccountId) {
            dispatch(setPaymentAccountData({ ...formData }));
            setcurrentId(data.paymentAccount.id);
            setIsSubmitted(true);
          } else {
            history.push('/success');
          }
        }
      }).catch(err => {
      setFakeLoading(false);
      console.log(err.message);
      message.error(FETCH_FAILURE_MESSAGE);
    });
  }, [paymentAccountData]);

  if (!isSubmitted) {
    return (
      <Col xs={24} lg={24}>
        <Row>
          <Form
            noValidate={true}
            form={form}
            name={'login'}
            className='edit-company-step-one'
            initialValues={{ sentence: '' }}
            onFinish={onSubmit}
            validateTrigger='onFinish'
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter exact 5 words.',
                },
              ]}
              name='sentence'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black'
                placeholder='Enter you super secret sentence'
              />
            </Form.Item>

            <div onClick={generateSecretSentence}>
              <Typography.Paragraph className='generate-secret-sentance'>
                Help me find one
                <ChevronRight className='ml-13 icon' />
              </Typography.Paragraph>
            </div>

            <Form.Item>
              <Button
                htmlType='submit'
                className='auth_form__submit submit'
                type='primary'
                size='large'
                disabled={fakeLoading}
              >
                Next
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    );
  }
  return <Redirect from='/' to={`/payment-account/${currentId}`} push={false} />;

};

export default memo(UpdateSentence);