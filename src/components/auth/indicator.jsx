import React from 'react';
import { getCookie } from '../../utils';

export default () => {
  const user = getCookie('current_user');
  let output = (
    <a href="javascript:void(0);" id="loginLink">
      Kirjaudu sisään
    </a>
  );
  if (user) {
    output = <span>{user.replace(/"/g, '')}</span>;
  }
  return output;
};
