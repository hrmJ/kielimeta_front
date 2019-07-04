import PropTypes from 'prop-types';
import React from 'react';

import TabContent from '../../../ui/TabContent';
import generalStyles from '../../../../general_styles/general_styles.scss';

const Access = props => {
  const {
    placeOfPublication: { location },
    license,
    accessInformation,
    contactPerson
  } = props;
  return (
    <TabContent>
      {accessInformation === 'contactperson' && (
        <div className={generalStyles.someBottomMargin}>
          Aineisto on käytettävissä ottamalla yhteyttä alla oleviin henkilöihin
        </div>
      )}
      {accessInformation && accessInformation !== 'contactperson' && (
        <div className={generalStyles.someBottomMargin}>{accessInformation}</div>
      )}
      {location && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Saatavilla osoitteessa</div>
          <div>
            <a href={location}>{location}</a>
          </div>
        </div>
      )}
      {contactPerson.length > 0 && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Yhteyshenkilöt</div>
          <div>
            <ul className={generalStyles.unlist}>
              {contactPerson.map(person => (
                <li key={person.email} className={generalStyles.labelContainerLight}>
                  <div>{person.name}</div>
                  <div>{person.email.replace('@', ' *at* ')}</div>
                  {/*  utulaisilla spostihaku tyyliin https://www.utu.fi/fi/search-people?k=NAME ?? */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {license && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Käyttölisenssi</div>
          <div>{license}</div>
        </div>
      )}
    </TabContent>
  );
};

Access.propTypes = {
  placeOfPublication: PropTypes.shape({ location: PropTypes.string }),
  license: PropTypes.string,
  accessInformation: PropTypes.string,
  contactPerson: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, email: PropTypes.string })
  )
};

Access.defaultProps = {
  placeOfPublication: {},
  license: '',
  accessInformation: '',
  contactPerson: []
};

export default Access;
