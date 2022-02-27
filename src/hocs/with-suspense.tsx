import React, { Suspense } from 'react';

// eslint-disable-next-line react/display-name
const withSuspense = (Component: React.JSXElementConstructor<any>, loader: React.ReactElement = <div />) => (
  props: any,
) => (
  <Suspense fallback={loader}>
    <Component {...props} />
  </Suspense>
);

export default withSuspense;