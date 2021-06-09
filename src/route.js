import React from 'react';

const Signin = React.lazy(() =>
  import('./jdcomponents/Authentication/SignIn/SignIn1')
);

const route = [
  { path: '/auth/signin', exact: true, name: 'Signin 1', component: Signin }
];

export default route;
