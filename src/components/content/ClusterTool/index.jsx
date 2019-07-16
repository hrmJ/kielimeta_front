import PropTypes from 'prop-types';
import React from 'react';

import { CreatableSelect } from '../../ui/localizedSelect';
import {
  deleteGroup,
  editGroup,
  editGroupName,
  editRoleInGroup,
  submitGroup
} from '../../../redux/actions/groups';
import Icon from '../../ui/icon';
import LabelledInput from '../../ui/labelledinput';
import RemoveButton from '../../ui/buttons/remove';
import Save from '../../ui/buttons/save';
import TooltippedSelect from '../../ui/tooltippedSelect';
import generalStyles from '../../../general_styles/general_styles.scss';
import styles from './clustertool.scss';

const selectStyle = {
  container: provided => ({
    ...provided,
    width: '15em'
  })
};

const roleOptions = [
  {
    label: 'ei tarkempaa roolia',
    value: 'ei tarkempaa roolia',
    description: `Oletus: ei erikseen määritettyä roolia, oleellista on vain kuuluminen ryhmään`
  },
  {
    label: 'yläkorpus',
    value: 'yläkorpus',
    description: `Laajempi kokonaisuus, josta muut kokonaisuudet on lohkottu `
  },
  {
    label: 'alakorpus (osakorpus)',
    value: 'alakorpus',
    description: `Omana aineistonaan käsiteltävä laajemman korpuksen osa`
  }
];

const ClusterTool = props => {
  const {
    groupedDatasets,
    dispatch,
    loadingState: { SUBMITGROUP: submitted },
    groupNames
  } = props;

  const { datasets, id, name } = groupedDatasets;
  let groupNameOptions = groupNames.map(group => ({
    label: group.id === id ? name : group.name,
    value: group.id
  }));
  if (!id && name) {
    groupNameOptions = [...groupNameOptions, { label: name, value: name }];
  }

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        dispatch(submitGroup(groupedDatasets));
      }}
    >
      <div className={styles.container}>
        <h4>Ryhmittele aineistoja</h4>
        <p className={styles.description}>
          Tämän työkalun avulla aineistoja voidaan ryhmitellä toisiinsa liittyviksi ryppäiksi.
          Jokaiselle ryppään jäsenelle voi tarvittaessa määrittää, mikä on sen status ryhmän
          sisällä. Sulje työkalu klikkaamalla uudestaan &quot;Ryhmittele aineistoja&quot; -linkkiä
        </p>
        {submitted === 'success' && (
          <div className={styles.savedMsgIndicator}>
            Ryhmä tallennettu <Icon iconName="faCheck" />
          </div>
        )}
        <div className={styles.controlsContainer}>
          <div className={styles.groupNameContainer}>
            <h5>Ryhmän nimi</h5>
            <p>
              Muokkaa jo olemassa olevia ryhmiä valitsemalla alla olevasta listasta tai luo uusi
              kirjoittamalla uuden ryhmän nimi kenttään.
            </p>
            <div>
              <CreatableSelect
                options={groupNameOptions}
                styles={selectStyle}
                value={groupNameOptions.find(option => [id, name].includes(option.value)) || ''}
                onChange={selected => dispatch(editGroup(selected.value, groupNames))}
              />
            </div>
            {id && (
              <div className={generalStyles.someTopMargin}>
                <LabelledInput
                  label="Muokkaa ryhmän nimeä"
                  value={name}
                  stacked
                  handleChange={ev => dispatch(editGroupName(ev.target.value, groupedDatasets))}
                />
              </div>
            )}
          </div>
          <div className={styles.groupMemberContainer}>
            <h5>Ryhmään kuuluvat aineistot</h5>
            {datasets && datasets.length === 0 && (
              <p>
                Lisää / poista aineistoja ryhmästä klikkaamalla niiden vasemmalla puolella olevia
                valintalaatikoita.
              </p>
            )}
            <ul>
              {datasets &&
                datasets.map(ds => (
                  <li className={styles.entryContainer} key={ds.dataset}>
                    <div className={styles.entryTitle}>{ds.title}</div>
                    <div className={styles.roleSelectContainer}>
                      <div>
                        <TooltippedSelect
                          styles={selectStyle}
                          options={roleOptions}
                          value={roleOptions.find(option => option.value === ds.role)}
                          creatable
                          defaultValue={roleOptions[0]}
                          onChange={selected =>
                            dispatch(editRoleInGroup(ds.dataset, selected.value))
                          }
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className={styles.saveButtonContainer}>
          <div>
            <Save text="Tallenna ryhmä" />
          </div>
          {id && (
            <div>
              <RemoveButton text="Poista ryhmä" onClick={() => dispatch(deleteGroup(id))} />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

ClusterTool.propTypes = {
  groupedDatasets: PropTypes.shape({
    datasets: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, role: PropTypes.string })
    ),
    name: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired,
  loadingState: PropTypes.objectOf(PropTypes.any),
  groupNames: PropTypes.arrayOf(PropTypes.object)
};

ClusterTool.defaultProps = {
  groupedDatasets: { datasets: [], name: '' },
  loadingState: { SUBMITGROUP: null },
  groupNames: []
};

export default ClusterTool;
