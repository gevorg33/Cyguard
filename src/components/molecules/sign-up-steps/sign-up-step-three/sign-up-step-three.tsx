import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { FC, useCallback, useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../store/user/selectors';
import { push } from 'connected-react-router';
import { setSignUpDataStepThree, clearExtraError } from '../../../../store/user/action';
import { COMPANY_NAME_PATTERN } from '../../../../constants';
import { DashboardApiService } from '../../../../api/dashboard-api-service';
import routes from '../../../../routes/routes';
import './sign-up-step-three.scss';

const SignUpStepThree: FC<any> = (): JSX.Element => {

  const [industries, setIndustries] = useState<any[]>([]);
  const [scopeErrors, setScopeErrors] = useState<any>({});
  const { in_process, signUpData, extraError } = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    DashboardApiService.fetchIndustriesRequest()
      .then(data => setIndustries(data.industries))
      .catch(err => console.log(err.message));
  }, []);

  const onSubmit = useCallback((data) => {
    dispatch(setSignUpDataStepThree({ ...data, ...signUpData }));
    dispatch(push(routes.signUpSuccessful.path));
  }, [dispatch]);

  return (
    <Col xs={24} lg={24}>
      <Row>
        <Form
          noValidate={true}
          name={'login'}
          className='sign-up-form-step-three'
          initialValues={{ companyName: '', industryId: '' }}
          onFinish={onSubmit}
          validateTrigger='onFinish'
          onFieldsChange={() => extraError && dispatch(clearExtraError())}
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
          <Form.Item
            rules={[COMPANY_NAME_PATTERN]}
            name='companyName'
            validateStatus={extraError?.companyName || scopeErrors?.companyName ? 'error' : undefined}
            help={extraError?.companyName || scopeErrors?.companyName || false}
          >
            <Input
              size='large'
              type='text'
              autoComplete='off'
              className='input-username mt-15'
              placeholder='Company Name'
            />
          </Form.Item>
          <Form.Item
            rules={[{
              required: true,
              type: 'number',
              message: 'Please, select your Company Industry.',
            },
            ]}
            name='industryId'
            validateStatus={extraError?.industryId || scopeErrors?.industryId ? 'error' : undefined}
            help={extraError?.industryId || scopeErrors?.industryId || false}
          >
            <Select
              dropdownClassName='select-industry'
              className='select-industry'
              aria-required={true}
            >
              {industries.map(industry =>
                <Select.Option
                  key={industry.id}
                  value={industry.id}>
                  {industry.name}
                </Select.Option>,
              )}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              className='auth_form__submit mt-20'
              type='primary'
              size='large'
              disabled={in_process}
            >
              Next
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Col>
  );
};

export default memo(SignUpStepThree);