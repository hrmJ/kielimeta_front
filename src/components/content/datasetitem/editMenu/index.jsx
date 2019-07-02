import {
  faCaretDown as adminIcon,
  faPencilAlt as editIcon,
  faLink as linkIcon,
  faCodeBranch as versionIcon,
  faCopy as copyIcon,
  faTrash,
  faWindowClose as cancelIcon
} from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Tooltip from '@atlaskit/tooltip';

import { deleteDataset, updateField } from '../../../../redux/actions/datasetform';
import { fetchDatasetForEdit } from '../../../../redux/actions/datasets';
import BasicButton from '../../../ui/buttons/BasicButton';
import Remove from '../../../ui/buttons/remove';
import styles from './editmenu.scss';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

ReactModal.setAppElement('#root');

class EditMenu extends Component {
  state = { open: false, deletePending: false };

  open(ev) {
    const { open } = this.state;
    ev.stopPropagation();
    this.setState({ open: !open });
  }

  initializeSubversion(ev) {
    const { id, editEvent, dispatch } = this.props;
    dispatch(updateField('main_version_id', id));
    editEvent(ev);
  }

  initializeCopy() {
    const { id, dispatch } = this.props;
    dispatch(fetchDatasetForEdit(id, null, true));
    this.props.history.push(`/newdataset`);
  }

  toggleDeleteModal(ev, modalState) {
    ev.stopPropagation();
    this.setState({ deletePending: modalState });
  }

  render() {
    const { editEvent, id, dispatch } = this.props;
    const { open, deletePending } = this.state;
    return (
      <div className={styles.outerContainer}>
        <ReactModal isOpen={deletePending} style={modalStyle}>
          <p>Oletko aivan varma?</p>
          <div className={styles.deleteModal}>
            <BasicButton
              text="Peruuta"
              icon={cancelIcon}
              onClick={ev => this.toggleDeleteModal(ev, false)}
            />
            <Remove text="Poista aineisto" onClick={() => dispatch(deleteDataset(id))} />
          </div>
        </ReactModal>
        <BasicButton onClick={ev => this.open(ev)} text="Hallitse" icon={adminIcon} />
        {open && !deletePending && (
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
                <Tooltip
                  content={`Jos aineisto on esimerkiksi saatavilla
                  useassa eri internetosoitteessa, voit merkitä nämä kaikki omiksi versioikseen valitsemalla
                  muokkauslomakkeella, mitkä tiedot versiossa ovat erilaisia. Tätä kautta lisätyt versiot ovat 
                  alisteisia nykyiselle versiolle.`}
                >
                  <BasicButton
                    onClick={ev => this.initializeSubversion(ev)}
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
                    text="Kopioi itsenäiseksi versioksi"
                    noBackground
                    onClick={ev => this.initializeCopy(ev)}
                    icon={copyIcon}
                  />
                </Tooltip>
              </li>
              <li>
                <Tooltip content="Poistaa aineiston kokonaan">
                  <BasicButton
                    onClick={ev => this.toggleDeleteModal(ev, true)}
                    text="Poista aineisto"
                    noBackground
                    icon={faTrash}
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
  editEvent: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default withRouter(EditMenu);
