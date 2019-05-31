import React from 'react';

import ContactPerson from './contactperson';

export default (props) => {
  const { dispatch } = props;
  return (
    <fieldset>
      <legend>Hallinta ja saatavuus</legend>
      <ContactPerson {...props} />
    </fieldset>
  );
};
