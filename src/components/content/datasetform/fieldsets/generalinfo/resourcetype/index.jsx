import React, { Component } from 'react';
import styles from '../../../datasetform.scss';
import { updateField } from '../../../../../../redux/actions/datasetform';
import AutoCompleteField from '../../../../../ui/autocompletefield';
import AdditionalField from '../../../../../ui/additionalfield';

export default (props) => {
  const {
    handleChange, originalFormValues, resourcetype, dispatch,
  } = props;
  const { resourcetypes } = originalFormValues;

  return (
    <div className={styles.upperContainer}>
      <AutoCompleteField
        id="resourcetype"
        onChange={handleChange('resourcetype')}
        categoryName="name"
        tooltipName="description"
        path="resourcetypes"
      >
        Aineiston tyyppi
      </AutoCompleteField>
      <AdditionalField
        originalValues={resourcetypes}
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
