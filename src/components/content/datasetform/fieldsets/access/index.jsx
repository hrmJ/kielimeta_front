import PropTypes from 'prop-types';

import React from 'react';

import { updateField } from '../../../../../redux/actions/datasetform';
import AccessInfo from './accessinfo';
import ContactPerson from './contactperson';
import LabelledInput from '../../../../ui/labelledinput';

const index = props => {
  const { dispatch, placeOfPublication, accessInformation } = props;
  const { identifier, citation_info } = placeOfPublication;
  return (
    <div>
      <ContactPerson {...props} />
      <AccessInfo
        dispatch={dispatch}
        placeOfPublication={placeOfPublication}
        accessInformation={accessInformation}
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
        value={citation_info}
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

index.propTypes = {
  dispatch: PropTypes.func.isRequired,
  placeOfPublication: PropTypes.shape({
    location: PropTypes.string,
    identifier: PropTypes.string,
    citation_info: PropTypes.string
  }),
  accessInformation: PropTypes.string
};

index.defaultProps = {
  placeOfPublication: { location: '', identifier: '', citation_info: '' },
  accessInformation: ''
};

export default index;
