import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tooltip from '@atlaskit/tooltip';
import {
  faCaretDown as adminIcon,
  faPencilAlt as editIcon,
  faLink as linkIcon,
  faCodeBranch as versionIcon,
  faCopy as copyIcon
} from '@fortawesome/free-solid-svg-icons';
import BasicButton from '../../../ui/buttons/BasicButton';
import styles from './editmenu.scss';

class EditMenu extends Component {
  state = { open: false };

  open(ev) {
    const { open } = this.state;
    ev.stopPropagation();
    this.setState({ open: !open });
  }

  render() {
    const { editEvent } = this.props;
    const { open } = this.state;
    return (
      <div className={styles.outerContainer}>
        <BasicButton onClick={ev => this.open(ev)} text="Hallitse" icon={adminIcon} />
        {open && (
          <div className={styles.menu}>
            <ul className={styles.menuList}>
              <li>
                <Tooltip content="Muokkaa tämän aineiston tietoja">
                  <BasicButton
                    onClick={editEvent}
                    text="Muokkaa tietoja"
                    noBackground
                    icon={editIcon}
                  />
                </Tooltip>
              </li>
              <li>
                <Tooltip content="Ryhmittele aineistoja toisiinsa liittyviksi ryppäiksi">
                  <BasicButton text="Linkitä muihin aineistoihin" noBackground icon={linkIcon} />
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  content={`Jos aineisto on esimerkiksi saatavilla
                  useassa eri internetosoitteessa, voit merkitä nämä kaikki omiksi versioikseen valitsemalla
                  muokkauslomakkeella, mitkä tiedot versiossa ovat erilaisia. Tätä kautta lisätyt versiot ovat 
                  alisteisia nykyiselle versiolle.`}
                >
                  <BasicButton
                    onClick={editEvent}
                    text="Kopioi aliversioksi"
                    noBackground
                    icon={versionIcon}
                  />
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  content={`Luo uusi itsenäinen aineisto nykyisen
                  aineiston tietojen pohjalta. Huomaa, että aineistot voi
                  myöhemmin ryhmitellä toisiinsa liittyviksi käyttämällä yllä
                  näkyvää ryhmittelytyökalua.`}
                >
                  <BasicButton
                    onClick={editEvent}
                    text="Kopioi itsenäiseksi versioksi"
                    noBackground
                    icon={copyIcon}
                  />
                </Tooltip>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

EditMenu.propTypes = {
  editEvent: PropTypes.func.isRequired
};

export default EditMenu;
