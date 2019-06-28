import PropTypes from 'prop-types';
import React from 'react';

import { CreatableSelect } from '../../ui/localizedSelect';
import LabelledInput from '../../ui/labelledinput';
import Save from '../../ui/buttons/save';
import TooltippedSelect from '../../ui/tooltippedSelect';
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
    groupedDatasets: { datasets }
  } = props;
  return (
    <div className={styles.container}>
      <h4>Ryhmittele aineistoja</h4>
      <p className={styles.description}>
        Tämän työkalun avulla aineistoja voidaan ryhmitellä toisiinsa liittyviksi ryppäiksi.
        Jokaiselle ryppään jäsenelle voi tarvittaessa määrittää, mikä on sen status ryhmän sisällä.
        Sulje työkalu klikkaamalla uudestaan &quot;Ryhmittele aineistoja&quot; -linkkiä
      </p>
      <div className={styles.controlsContainer}>
        <div className={styles.groupNameContainer}>
          <h5>Ryhmän nimi</h5>
          <p>
            Muokkaa jo olemassa olevia ryhmiä valitsemalla alla olevasta listasta tai luo uusi
            kirjoittamalla uuden ryhmän nimi kenttään.
          </p>
          <div>
            <CreatableSelect options={[]} styles={selectStyle} />
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
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.saveButtonContainer}>
        <Save text="Tallenna ryhmä" />
      </div>
    </div>
  );
};

ClusterTool.propTypes = {
  groupedDatasets: PropTypes.shape({
    datasets: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, role: PropTypes.string })
    ),
    name: PropTypes.string
  })
};

ClusterTool.defaultProps = {
  groupedDatasets: { datasets: [], name: '' }
};

export default ClusterTool;
