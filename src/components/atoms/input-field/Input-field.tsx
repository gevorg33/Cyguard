import { Input } from 'antd';
import React from 'react';

import './input-field.scss'

const InputField:React.FC = ():JSX.Element =>
  <div className='input-field'>
    <Input
      size='large'
      type='text'
      autoComplete='off'
      className='input-username mt-15'
      placeholder='Surname'
    />
  </div>

export default InputField;