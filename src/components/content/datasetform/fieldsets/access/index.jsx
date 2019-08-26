import PropTypes from 'prop-types';

import React from 'react';

import { updateField } from '../../../../../redux/actions/datasetform';
import AccessInfo from './accessinfo';
import ContactPerson from './contactperson';
import LabelledInput from '../../../../ui/labelledinput';

const Access = props => {
  const { dispatch, placeOfPublication, accessInformation, userNames, loadingState } = props;
  const { identifier, citation_info: citationInfo } = placeOfPublication;
  return (
    <div>
      <ContactPerson {...props} />
      <AccessInfo
        dispatch={dispatch}
        placeOfPublication={placeOfPublication}
        accessInformation={accessInformation}
        userNames={userNames}
        loadingState={loadingState}
      />
      <LabelledInput
        label="Aineiston pysyväistunniste (esim. URN tai doi)"
        tooltip={`Jos aineistolla on esimerkiksi Metashare-palveluun viittaava
          URN-muotoinen pysyväisosoite, anna se tähän.`}
        value={identifier}
        handleChange={ev =>
          dispatch(
            updateField('place_of_publication', {
              ...placeOfPublication,
              ...{ identifier: ev.target.value }
            })
          )
        }
      />
      <LabelledInput
        label="Viittausohje"
        type="textarea"
        value={citationInfo}
        handleChange={ev =>
          dispatch(
            updateField('place_of_publication', {
              ...placeOfPublication,
              ...{ citation_info: ev.target.value }
            })
          )
        }
      />
    </div>
  );
};

Access.propTypes = {
  dispatch: PropTypes.func.isRequired,
  placeOfPublication: PropTypes.shape({
    location: PropTypes.string,
    identifier: PropTypes.string,
    citation_info: PropTypes.string
  }),
  accessInformation: PropTypes.string,
  userNames: PropTypes.arrayOf(
    PropTypes.shape({ cn: PropTypes.string, mail: PropTypes.string, uid: PropTypes.string })
  ).isRequired,
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired
};

Access.defaultProps = {
  placeOfPublication: { location: '', identifier: '', citation_info: '' },
  accessInformation: ''
};

export default Access;
