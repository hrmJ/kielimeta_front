import React, { Component } from 'react';
import styles from '../../../datasetform.scss';
import { updateField } from '../../../../../../redux/actions/datasetform';
import AutoCompleteField from '../../../../../ui/autocompletefield';
import AdditionalField from '../../../../../ui/additionalfield';

const checkCondition = (originalFormValues, resourcetype) => {
  if (resourcetype && Array.isArray(originalFormValues.resourcetypes)) {
    if (!originalFormValues.resourcetypes.includes(resourcetype)) {
      return true;
    }
  }
  return false;
};

export default props => {
  const { handleChange, originalFormValues, resourcetype, dispatch } = props;

  return (
    <div className={styles.upperContainer}>
      <AutoCompleteField
        id="resourcetype"
        onChange={handleChange('resourcetype')}
        categoryName="name"
        tooltipName="description"
        path={'resourcetypes'}
      >
        Aineiston tyyppi
      </AutoCompleteField>
      <AdditionalField
        condition={checkCondition(originalFormValues, resourcetype)}
        handleChange={ev =>
          dispatch(
            updateField('resourcetype', {
              name: resourcetype.name || resourcetype,
              description: ev.target.value
            })
          )
        }
        label="Määrittele lyhyesti antamasi aineistotyyppi"
        id="resourcetypedescription"
      />
    </div>
  );
};
