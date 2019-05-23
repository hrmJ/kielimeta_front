import React, { Component } from 'react';

import { updateField } from '../../../../../../redux/actions/datasetform';
import AdditionalField from '../../../../../ui/additionalfield';
import AutoCompleteField from '../../../../../ui/autocompletefield';
import LabelledInput from '../../../../../ui/labelledinput';
import TooltippedSelect from '../../../../../ui/tooltippedSelect';
import styles from '../../../datasetform.scss';

export default (props) => {
  const {
    handleChange, originalFormValues, resourcetype, dispatch, resourceTypes = [],
  } = props;

  return (
    <div className={styles.upperContainer}>
      <LabelledInput label="Aineiston tyyppi">
        <TooltippedSelect
          options={resourceTypes}
          valueName="name"
          tooltipName="description"
          onChange={handleChange('resourcetype')}
        />
      </LabelledInput>
      <AdditionalField
        originalValues={resourceTypes.map(rt => rt.name)}
        currentVal={resourcetype}
        handleChange={ev => dispatch(
          updateField('resourcetype', {
            name: resourcetype.name || resourcetype,
            description: ev.target.value,
          }),
        )
        }
        label="Määrittele lyhyesti antamasi aineistotyyppi"
        id="resourcetypedescription"
      />
    </div>
  );
};
