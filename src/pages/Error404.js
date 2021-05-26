import React, { Fragment } from 'react';

import error from '../assets/images/error-404.png';

export default () => {
  return (
    <Fragment>
      <img style={{ width: '50%' }} alt="error 404" src={error} />
      <p style={{ fontSize: '1.2rem' }}>Page not found</p>
    </Fragment>
  );
}  