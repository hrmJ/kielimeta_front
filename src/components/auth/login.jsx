import React from 'react';

import Loader from '../ui/loader';

export default () => {
  const url = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%/shib/login';
  document.location = url;
  return <Loader />;
};
