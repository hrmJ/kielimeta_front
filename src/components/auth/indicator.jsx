import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../utils';

export default () => {
  const user = getCookie('current_user');
  let output = (
    <Link to="login" id="loginlink">
      Kirjaudu sisään
    </Link>
  );
  if (user) {
    output = <span>{user.replace(/"/g, '')}</span>;
  }
  return output;
};
