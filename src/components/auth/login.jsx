import React from 'react';

export default () => {
  const url = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%/shib/login';
  document.location = url;
  // Only if login succesful:
  return <div>Redirecting to the login page, just a moment.</div>;
};
