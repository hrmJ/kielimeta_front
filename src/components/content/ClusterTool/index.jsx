import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CreatableSelect } from '../../ui/localizedSelect';
import { editGroupTitle, editRoleInGroup, submitGroup } from '../../../redux/actions/groups';
import LabelledInput from '../../ui/labelledinput';
import Save from '../../ui/buttons/save';
import TooltippedSelect from '../../ui/tooltippedSelect';
import styles from './clustertool.scss';
import { faCheck as iconOk } from '@fortawesome/free-solid-svg-icons';

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

  const { datasets } = groupedDatasets;
  const groupNameOptions = groupNames.map(name => ({ label: name, value: name }));

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
                onChange={selected => dispatch(editGroupTitle(selected.value))}
              />
            </div>
          </div>
          <div className={styles.groupMemberContainer}>
            <h5>Ryhmään kuuluvat aineistot</h5>
            {datasets.length === 0 && (
              <p>
                Lisää / poista aineistoja ryhmästä klikkaamalla niiden vasemmalla puolella olevia
                valintalaatikoita.
              </p>
            )}
            <ul>
              {datasets.map(ds => (
                <li className={styles.entryContainer} key={ds.dataset}>
                  <div className={styles.entryTitle}>{ds.title}</div>
                  <div className={styles.roleSelectContainer}>
                    <div>
                      <TooltippedSelect
                        styles={selectStyle}
                        options={roleOptions}
                        creatable
                        defaultValue={roleOptions[0]}
                        onChange={selected => dispatch(editRoleInGroup(ds.dataset, selected.value))}
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
          {submitted === 'success' && (
            <div>
              Ryhmä tallennettu <FontAwesomeIcon icon={iconOk} />
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
  groupNames: PropTypes.arrayOf(PropTypes.string)
};

ClusterTool.defaultProps = {
  groupedDatasets: { datasets: [], name: '' },
  loadingState: { SUBMITGROUP: null },
  groupNames: []
};

export default ClusterTool;
