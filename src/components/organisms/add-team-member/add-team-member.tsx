import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import React, { FC, useCallback, useEffect, useState } from 'react';
import CountryPhoneCode,{ ConfigProvider } from 'antd-country-phone-input';
import { DashboardApiService } from '../../../api/dashboard-api-service';
import { useDispatch } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { UserIcon } from '../../../assets/images';
import en from 'world_countries_lists/data/en/world.json';

import '../../molecules/create-payment-account-steps/step-one/general-info.scss';
import '../edit-company/edit-company.scss';
import './add-team-member.scss';

const AddTeamMember:FC<any> = ():JSX.Element => {
  const [fakeLoading, setFakeLoading] = useState(false);
  const [extraError, setExtraError] = useState(null);
  const [scopeErrors, setScopeErrors] = useState<any>({});
  const [userRoles, setUserRoles] = useState<any[]>([])
  const dispatch = useDispatch();
  const [form] = useForm();

  useEffect(() => {
    DashboardApiService.fetchUserRolesRequest()
      .then(data => {
        setUserRoles(data.roles);
      }).catch(err => {
        console.log(err.message);
      }
    );
  }, []);

  const onSubmit = useCallback( async () => {
    setFakeLoading(true);
    try {
      form.submit();
    } catch (e) {
      console.log(e.message);
    }
  }, [dispatch]);

  return(
    <>
      <Row>
        <div className='mb-50'>
          <UserIcon className='notify-icon-large' />
          <Typography.Title level={4} className='d-i-block'>Add Team Member</Typography.Title>
        </div>
      </Row>

      <Form
        noValidate={true}
        name={'login'}
        className='edit-company-step-one add-team-member'
        onFinish={onSubmit}
        onFieldsChange={() => setExtraError(null)}
        validateTrigger='onFinish'
        onValuesChange={() => {
          setScopeErrors({});
        }}
        onFinishFailed={({ errorFields }) => {
          errorFields.map(({ name, errors }) => {
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
        }}
      >
        <Row>
          <Col xs={24} lg={12}>
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
                size='large'
                type='text'
                autoComplete='off'
                className='input-email mt-15 c-black w-60'
                placeholder='Email'
              />
            </Form.Item>

            <Form.Item
              name='countryCode'
              rules={[
                {
                  required: true,
                  type: 'string',
                },
              ]}
            >
              <ConfigProvider locale={en}>
                <CountryPhoneCode
                  size='large'
                  type='text'
                  autoComplete='off'
                  className='input-username mt-15 c-black w-60 phone-nmb'
                  placeholder='Phone'
                />
              </ConfigProvider>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter Security Question 1.',
                },
              ]}
              name='sqOne'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Security Question 1'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter Security Question 2.',
                },
              ]}
              name='sqTwo'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Security Question 2'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter your Google account.',
                },
              ]}
              name='googleAccount'
            >
              <Input
                name='googleAccount'
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Google ID'
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter a role.',
                },
              ]}
              name='role'
            >
              <div className='role-section'>
                <Select
                  dropdownClassName='select-role'
                  className='select-role'
                  defaultValue='Role'
                  aria-required={true}
                >
                  {userRoles.map(role =>
                    <Select.Option
                      key={role.id}
                      value={role.id}>
                      {role.name}
                    </Select.Option>
                  )}
                </Select>
              </div>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter your First Name.',
                },
              ]}
              name='firstName'
            >
              <Input
                name='firstName'
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='First Name'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter your Last Name.',
                },
              ]}
              name='lastName'
            >
              <Input
                name='lastName'
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Last Name'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter Security Answer 1.',
                },
              ]}
              name='saAnswerOne'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Security Answer 1'
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please, enter Security Answer 2.',
                },
              ]}
              name='saAnswerTwo'
            >
              <Input
                size='large'
                type='text'
                autoComplete='off'
                className='input-username mt-15 c-black w-60'
                placeholder='Security Answer 2'
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            htmlType='submit'
            className='auth_form__submit submit-btn add-team-member-btn'
            type='primary'
            size='large'
            disabled={fakeLoading}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddTeamMember;