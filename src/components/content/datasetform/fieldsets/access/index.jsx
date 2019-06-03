import PropTypes from 'prop-types';

import React from 'react';

import { updateField } from '../../../../../redux/actions/datasetform';
import AccessInfo from './accessinfo';
import ContactPerson from './contactperson';
import LabelledInput from '../../../../ui/labelledinput';

const index = props => {
  const { dispatch, placeOfPublication } = props;
  return (
    <div>
      <ContactPerson {...props} />
      <AccessInfo dispatch={dispatch} placeOfPublication={placeOfPublication} />
      <LabelledInput
        label="Aineiston pysyväistunniste (esim. URN tai doi)"
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
  dispatch: PropTypes.string.isRequired
};

export default index;
