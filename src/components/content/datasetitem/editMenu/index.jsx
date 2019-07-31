import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactModal from 'react-modal';

import { fetchDatasetForEdit, deleteDataset } from '../../../../redux/actions/datasets';
import { updateField } from '../../../../redux/actions/datasetform';
import BasicButton from '../../../ui/buttons/BasicButton';
import HistorySubMenu from './historySubmenu';
import Remove from '../../../ui/buttons/remove';
import Tooltip from '../../../ui/tooltip';
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
  state = { open: false, deletePending: false, historyWindowOpen: false };

  open(ev) {
    const { open } = this.state;
    ev.stopPropagation();
    this.setState({ open: !open });
  }

  initializeEdit() {
    const { id, dispatch, history, currentVersionId } = this.props;
    if (currentVersionId === id || !currentVersionId) {
      dispatch(updateField('main_version_id', null));
    } else {
      dispatch(updateField('main_version_id', id));
      dispatch(updateField('id', currentVersionId));
    }
    history.push(`/edit/${currentVersionId || id}`);
  }

  initializeSubversion() {
    const { id, dispatch, history, currentVersionId } = this.props;
    dispatch(updateField('main_version_id', id));
    history.push(`/edit/${currentVersionId || id}`);
  }

  initializeCopy() {
    const { id, dispatch, history, currentVersionId } = this.props;
    dispatch(fetchDatasetForEdit(currentVersionId || id, null, true));
    history.push(`/newdataset`);
  }

  toggleDeleteModal(ev, modalState) {
    ev.stopPropagation();
    this.setState({ deletePending: modalState });
  }

  toggleHistorySubWindow(ev, modalState) {
    ev.stopPropagation();
    this.setState({ historyWindowOpen: modalState });
  }

  render() {
    const { id, dispatch, currentVersionId, hasSubVersions, versionHistory } = this.props;
    const { open, deletePending, historyWindowOpen } = this.state;
    return (
      <div className={styles.outerContainer}>
        <ReactModal isOpen={deletePending} style={modalStyle}>
          <p>Oletko aivan varma?</p>
          {currentVersionId && currentVersionId * 1 !== id * 1 && (
            <p>
              Huom! Olet poistamassa vain valittua aliversiota. <br />
              Jos haluat poistaa koko aineiston, valitse ensin versiolistasta pääversio.
            </p>
          )}
          {(!currentVersionId || currentVersionId * 1 === id * 1) && hasSubVersions && (
            <p>Huom! Tämän version poistaminen poistaa myös kaikki aliversiot</p>
          )}
          <div className={styles.deleteModal}>
            <BasicButton
              text="Peruuta"
              iconname="faWindowClose"
              onClick={ev => this.toggleDeleteModal(ev, false)}
            />
            <Remove
              text="Poista aineisto"
              onClick={() => dispatch(deleteDataset(currentVersionId || id, id))}
            />
          </div>
        </ReactModal>
        <BasicButton onClick={ev => this.open(ev)} text="Hallitse" iconName="faCaretDown" />
        {open && !deletePending && (
          <div className={styles.menu}>
            <ul className={styles.menuList}>
              <li>
                <Tooltip content="Muokkaa tämän aineiston tietoja" direction="right">
                  <BasicButton
                    onClick={() => this.initializeEdit()}
                    text="Muokkaa tietoja"
                    noBackground
                    iconName="faPencilAlt"
                  />
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  direction="right"
                  content={`Jos aineisto on esimerkiksi saatavilla
                  useassa eri internetosoitteessa, voit merkitä nämä kaikki omiksi versioikseen valitsemalla
                  muokkauslomakkeella, mitkä tiedot versiossa ovat erilaisia. Tätä kautta lisätyt versiot ovat 
                  alisteisia nykyiselle versiolle.`}
                >
                  <BasicButton
                    onClick={() => this.initializeSubversion()}
                    text="Kopioi aliversioksi"
                    noBackground
                    iconName="faCodeBranch"
                  />
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  direction="right"
                  content={`Luo uusi itsenäinen aineisto nykyisen
                  aineiston tietojen pohjalta. Huomaa, että aineistot voi
                  myöhemmin ryhmitellä toisiinsa liittyviksi käyttämällä yllä
                  näkyvää ryhmittelytyökalua.`}
                >
                  <BasicButton
                    text="Kopioi itsenäiseksi versioksi"
                    noBackground
                    onClick={ev => this.initializeCopy(ev)}
                    iconName="faCopy"
                  />
                </Tooltip>
              </li>
              <li>
                <Tooltip content="Poistaa aineiston kokonaan" direction="right">
                  <BasicButton
                    onClick={ev => this.toggleDeleteModal(ev, true)}
                    text="Poista aineisto"
                    noBackground
                    iconName="faTrash"
                  />
                </Tooltip>
              </li>
              <li>
                <BasicButton
                  onClick={ev => this.toggleHistorySubWindow(ev, !historyWindowOpen)}
                  text="Muutoshistoria"
                  noBackground
                  iconName="faCodeBranch"
                />
                {historyWindowOpen && (
                  <HistorySubMenu
                    edits={versionHistory}
                    id={id}
                    currentVersionId={currentVersionId}
                  />
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

EditMenu.propTypes = {
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  currentVersionId: PropTypes.number,
  hasSubVersions: PropTypes.bool,
  versionHistory: PropTypes.arrayOf(
    PropTypes.shape({ modification_time: PropTypes.string, id: PropTypes.number })
  ).isRequired
};
EditMenu.defaultProps = {
  currentVersionId: null,
  hasSubVersions: false
};

export default withRouter(EditMenu);
