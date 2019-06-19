import React, { Component } from 'react';

import { updateField } from '../../../../../../redux/actions/datasetform';
import AdditionalField from '../../../../../ui/additionalfield';
import LabelledInput from '../../../../../ui/labelledinput';
import TooltippedSelect from '../../../../../ui/tooltippedSelect';
import styles from '../../../datasetform.scss';

export default props => {
  const { handleChange, resourcetype, dispatch, resourceTypes = [] } = props;
  let selectValue;
  if (typeof resourcetype === 'object') {
    selectValue = { label: resourcetype.name, value: resourcetype.name };
  } else if (resourcetype) {
    selectValue = { label: resourcetype, value: resourcetype };
  }

  const tooltip = `Määrittele tässä, onko aineisto esimerkiksi korpus,
    sanalista, työkalu jne. Jos sopivaa tyyppiä ei ole listalla, lisää uusi ja
    anna lyhyt kuvaus siitä, mikä tämänlaisessa aineistossa on erityistä.`;

  return (
    <div className={styles.upperContainer}>
      <LabelledInput label="Aineiston tyyppi" tooltip={tooltip}>
        <TooltippedSelect
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
        value={typeof resourcetype === 'object' ? resourcetype.description : ''}
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
