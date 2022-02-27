import { Button, Col, Form, Input, Row, message } from 'antd';
import React, { ChangeEvent, FC, useCallback, useState, memo } from 'react';
import EmailConfirmForm from './email-confirm-form/email-confirm-form';
import { paymentAccountSelector } from '../../../../store/payment-account/selectors';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentAccountData } from '../../../../store/payment-account/action';
import paymentAccountManagementApi from '../../../../api/payment-account-management-api';
import '../step-one/general-info.scss';
import './create-payment-account.scss';

interface ICreatePaymentAccount {
  next: () => void;
}

const CreatePaymentAccount: FC<ICreatePaymentAccount> = ({ next }): JSX.Element => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [fakeLoading, setFakeLoading] = useState<boolean>(false);
  const [extraError, setExtraError] = useState<boolean | null>(null);
  const [scopeErrors, setScopeErrors] = useState<any>({});
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [isModalOpened, setModalOpen] = useState<boolean>(false);

  const { paymentAccount } = useSelector(paymentAccountSelector);
  const dispatch = useDispatch();

  const extraErrors = (err: any) => {
    return err.map(({ name, errors }: any) => {
      const [field] = name;
      const [message] = errors;
      setScopeErrors((state: Readonly<any>) => ({
        ...state,
        [field]: message,
      }));
      return {
        name,
        errors,
      };
    });
  };

  const onSubmit = useCallback(async () => {
    setFakeLoading(true);
    form.validateFields().then(formData =>
      paymentAccountManagementApi.createPaymentAccount({ ...formData, ...paymentAccount })
        .then(data => {
          if (data.status) {
            dispatch(setPaymentAccountData({ ...data, ...formData }));
            setModalOpen(true);
            setFakeLoading(false);
          }
        }).catch(err => {
        console.log(err.message);
        setFakeLoading(false);
      }));
  }, [dispatch]);

  const submitSelfOnBoarding = useCallback(async (formData) => {
    const data = { ...formData, ...paymentAccount, selfOnboarding: true };
    paymentAccountManagementApi.createPaymentAccount(data)
      .then(data => {
        if (data.status) {
          message.success('Created');
          history.push('/payment-accounts');
        }
      }).catch(err => {
      extraErrors(err.message);
    });
  }, []);

  return (
    <Col xs={24} lg={24}>
      <Row>
        <Form
          noValidate={true}
          name={'login'}
          form={form}
          className='edit-company-step-one'
          initialValues={{ email: '' }}
          onFinish={submitSelfOnBoarding}
          onFieldsChange={() => setExtraError(null)}
          validateTrigger='onFinish'
          onValuesChange={() => {
            setScopeErrors({});
          }}
          onFinishFailed={({ errorFields }) => {
            extraErrors(errorFields);
          }}
        >
          <Form.Item
            validateStatus={
              !!extraError || !!scopeErrors.email ? 'error' : undefined
            }
            help={!!scopeErrors.email && scopeErrors.email}
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please, enter a valid Email.',
              },
            ]}
            name='email'
          >
            <Input
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                event.preventDefault();
                setCurrentEmail(event.target.value);
              }}
              size='large'
              type='text'
              autoComplete='off'
              className='input-email mt-15 c-black'
              placeholder='Email'
            />
          </Form.Item>
          <div className='d-flex justify-space-around mt-60'>
            <Form.Item>
              <Button
                className='auth_form__submit btn-width next-btn'
                type='primary'
                size='large'
                onClick={onSubmit}
                disabled={fakeLoading}
              >
                Next
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                className='auth_form__submit btn-width'
                type='primary'
                size='large'
                disabled={fakeLoading}
              >
                Invite
              </Button>
            </Form.Item>
          </div>
        </Form>
        <EmailConfirmForm
          next={next}
          currentEmail={currentEmail}
          visible={isModalOpened}
          onCancel={() => setModalOpen(false)}
        />
      </Row>
    </Col>
  );
};

export default memo(CreatePaymentAccount);