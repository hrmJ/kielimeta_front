import React from 'react';

import Loader from '../ui/loader';

export default () => {
  const url = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%/shibout';
  document.location = url;
  return <Loader />;
};
