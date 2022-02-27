import React, { ChangeEvent, useState } from 'react';
import {Form, Typography, Input, Row, Col, Button} from 'antd';
import './form-styles.scss';

const { Title } = Typography;
const { TextArea } = Input;

const FormComponent:React.FC<any> = ():JSX.Element => {
  const [requestMessage, setRequestMessage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  return(
    <div className='form-section'>
      <Form
        className='message-form'
      >
        <Title level={1} className='form-title'>
          Get in touch
        </Title>
        <Row className='mt-60'>
          <Col xs={24} lg={24}>
            <Input
              className='form-input'
              value={userName}
              onChange={(event:ChangeEvent<HTMLInputElement>):void => {
                event.preventDefault();
                setUserName(event.target.value);
              }}
              placeholder='Name'
            />
            <Input
              className='form-input mt-42'
              value={userEmail}
              onChange={(event:ChangeEvent<HTMLInputElement>):void => {
                event.preventDefault();
                setUserEmail(event.target.value);
              }}
              placeholder='Email'
            />
            <TextArea
              className='form-textarea mt-42'
              value={requestMessage}
              onChange={(event:ChangeEvent<HTMLTextAreaElement>):void  => {
                event.preventDefault();
                setRequestMessage(event.target.value);
              }}
              placeholder='Message'
              autoSize={{ minRows: 8, maxRows: 7 }}
            />
          </Col>
        </Row>
        <Button
          className='form-submit-btn mt-42'
          type='default'
          htmlType='submit'
          size='middle'
        >
          Send
        </Button>
      </Form>
    </div>
  )
}

export default FormComponent;