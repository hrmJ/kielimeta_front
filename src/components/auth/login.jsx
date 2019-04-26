import React from 'react';

export default () => {
  const url = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%/shib/login';
  console.log(document.cookie);
  document.location = url;
  // Only if login succesful:
  return <div>Congrats, you're logged in (etc..)</div>;
};
