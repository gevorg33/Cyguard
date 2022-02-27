import React, { useState } from 'react';

import './float-label.scss';
const FloatLabel = (props:any) => {
  const [focus, setFocus] = useState<boolean>(false);
  const { children, label, value, alwaysFloatLabel } = props;

  const labelClass =
    focus || (value && value.length !== 0) || alwaysFloatLabel ? 'label label-float' : 'label';

  return (
    <div
      className='float-label'
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;
