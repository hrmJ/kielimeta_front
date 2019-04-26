import React from 'react';
import { getCookie } from '../../utils';
import { Link } from 'react-router-dom';

export default () => {
  const user = getCookie('current_user');
  let output = <Link to="login">Kirjaudu sisään</Link>;
  if (user) {
    output = <span>{user.replace(/"/g, '')}</span>;
  }
  return output;
};
