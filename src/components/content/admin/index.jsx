import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { fetchLanguageData, updateLanguageInAdmin } from '../../../redux/actions/admin';
import EditableRow from '../../ui/editableRow';
import styles from './admin.scss';

class AdminPage extends Component {
  state = { languageModalOpen: false };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLanguageData());
  }

  render() {
    const { languages, dispatch } = this.props;
    return (
      <div className={styles.outerContainer}>
        <div>Kielet ja koodit</div>
        <div className={styles.dataContainer}>
          <table>
            <thead>
              <tr>
                <th />
                <th>Koodi</th>
                <th>Suomenkielinen nimi</th>
                <th>Englanninkielinen nimi</th>
              </tr>
            </thead>
            <tbody>
              {languages.map(lang => (
                <EditableRow
                  key={`${lang.code}_${lang.name}`}
                  cells={lang}
                  onSave={editedVals => dispatch(updateLanguageInAdmin(lang.code, editedVals))}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      english_name: PropTypes.string,
      code: PropTypes.string
    })
  )
};

AdminPage.defaultProps = {
  languages: []
};

export default AdminPage;
