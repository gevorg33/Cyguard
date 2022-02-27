import React from 'react';

interface Props {
  match: any;
  children: React.ReactNode;
}

const PrivateLayout: React.FC<Props> = (props):JSX.Element => {
  return <>{props.children}</>;
};
export default PrivateLayout;
