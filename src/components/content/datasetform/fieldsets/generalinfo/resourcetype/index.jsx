import React from 'react';
import PropTypes from 'prop-types';

import { updateField } from '../../../../../../redux/actions/datasetform';
import AdditionalField from '../../../../../ui/additionalfield';
import LabelledInput from '../../../../../ui/labelledinput';
import TooltippedSelect from '../../../../../ui/tooltippedSelect';
import styles from '../../../datasetform.scss';

const resourceType = props => {
  const { handleChange, resourcetype, dispatch, resourceTypes } = props;
  let selectValue;
  if (resourcetype !== null) {
    if (typeof resourcetype === 'object' && resourcetype !== null) {
      selectValue = { label: resourcetype.name, value: resourcetype.name };
    } else if (resourcetype) {
      selectValue = { label: resourcetype, value: resourcetype };
    }
  }

  const tooltip = `Määrittele tässä, onko aineisto esimerkiksi korpus,
    sanalista, työkalu jne. Jos sopivaa tyyppiä ei ole listalla, lisää uusi ja
    anna lyhyt kuvaus siitä, mikä tämänlaisessa aineistossa on erityistä.`;

  return (
    <div className={styles.upperContainer}>
      <LabelledInput label="Aineiston tyyppi" tooltip={tooltip}>
        <TooltippedSelect
          labelName="name"
          options={resourceTypes}
          valueName="name"
          tooltipName="description"
          onChange={handleChange('resourcetype')}
          value={selectValue}
          id="resourcetype"
          creatable
        />
      </LabelledInput>
      <AdditionalField
        originalValues={resourceTypes.map(rt => rt.name)}
        currentVal={resourcetype}
        value={resourcetype && typeof resourcetype === 'object' ? resourcetype.description : ''}
        handleChange={ev => {
          dispatch(
            updateField('resourcetype', {
              name: resourcetype.name || resourcetype,
              description: ev.target.value
            })
          );
        }}
        label="Määrittele lyhyesti antamasi aineistotyyppi"
        id="resourcetypedescription"
      />
    </div>
  );
};

resourceType.propTypes = {
  handleChange: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  resourcetype: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ location: PropTypes.object })
  ]),
  resourceTypes: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ location: PropTypes.object })])
  )
};

resourceType.defaultProps = {
  resourceTypes: [],
  resourcetype: ''
};

export default resourceType;
