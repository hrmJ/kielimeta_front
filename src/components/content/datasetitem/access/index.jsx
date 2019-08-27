import PropTypes from 'prop-types';
import React from 'react';

import TabContent from '../../../ui/TabContent';
import generalStyles from '../../../../general_styles/general_styles.scss';
import sensitivityOptions from '../../datasetform/fieldsets/administration/sensitivityOptions';

const getSensitivityInfo = value => {
  const option = sensitivityOptions.find(thisOption => thisOption.value === value);
  return option ? option.label : value;
};

const Access = props => {
  const {
    placeOfPublication: { location },
    license,
    accessInformation,
    contactPerson,
    sensitivity,
    dataLocation,
    userDetails: { is_staff: isStaff }
  } = props;
  return (
    <TabContent>
      {accessInformation === 'contactperson' && (
        <div className={generalStyles.largeBottomMargin}>
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
        <div className={`${generalStyles.labelContainerStacked}`}>
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
      {sensitivity && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Muuta huomioitavaa</div>
          <div> {getSensitivityInfo(sensitivity)}</div>
        </div>
      )}
      {isStaff && dataLocation && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Aineiston tallennuspaikka</div>
          <div>{dataLocation}</div>
        </div>
      )}
    </TabContent>
  );
};

Access.propTypes = {
  placeOfPublication: PropTypes.shape({ location: PropTypes.string }),
  license: PropTypes.string,
  accessInformation: PropTypes.string,
  sensitivity: PropTypes.string,
  dataLocation: PropTypes.string,
  contactPerson: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, email: PropTypes.string })
  ),
  userDetails: PropTypes.shape({
    username: PropTypes.string,
    datasets: PropTypes.arrayOf(PropTypes.any),
    is_staff: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

Access.defaultProps = {
  placeOfPublication: {},
  license: '',
  accessInformation: '',
  contactPerson: [],
  sensitivity: '',
  dataLocation: ''
};

export default Access;
