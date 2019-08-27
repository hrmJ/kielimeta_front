import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  addAdminData,
  deleteAdminData,
  fetchAdminData,
  updateAdminData
} from '../../../redux/actions/admin';
import AdminTable from './adminTable';
import styles from './admin.scss';

class AdminPage extends Component {
  loadData(category) {
    const { dispatch } = this.props;
    if (!this.props[category].length) {
      dispatch(fetchAdminData(category));
    }
  }

  render() {
    const {
      languages,
      keywords,
      genre,
      dispatch,
      loadingState: {
        FETCH_LANGUAGES: fetchLanguages,
        FETCH_KEYWORDS: fetchKeywords,
        FETCH_GENRE: fetchGenre
      }
    } = this.props;

    return (
      <div className={styles.outerContainer}>
        <section className={styles.description}>
          Tällä hallintasivulla voit lisätä, muokata tai poistaa esimerkiksi järjestelmässä käytössä
          olevia kieliä ja avainsanoja.
        </section>
        <section>
          <AdminTable
            header="Kielet ja koodit"
            onOpen={() => this.loadData('languages')}
            ready={fetchLanguages === 'success'}
            data={languages}
            columnNames={['Koodi', 'Suomenkielinen nimi', 'Englanninkielinen nimi']}
            onSave={(id, editedVals) => dispatch(updateAdminData('languages', id, editedVals))}
            onDelete={id => dispatch(deleteAdminData('languages', id))}
            onAdd={editedVals => dispatch(addAdminData('languages', editedVals))}
          />
          <AdminTable
            header="Avainsanat"
            onOpen={() => this.loadData('keywords')}
            ready={fetchKeywords === 'success'}
            data={keywords}
            columnNames={['Suomenkielinen avainsana']}
            onSave={(id, editedVals) => dispatch(updateAdminData('keywords', id, editedVals))}
            onDelete={id => dispatch(deleteAdminData('keywords', id))}
            onAdd={editedVals => dispatch(addAdminData('keywords', editedVals))}
          />
          <AdminTable
            header="Tekstien genret"
            onOpen={() => this.loadData('genre')}
            ready={fetchGenre === 'success'}
            data={genre}
            columnNames={['Genren nimi suomeksi']}
            onSave={(id, editedVals) => dispatch(updateAdminData('genre', id, editedVals))}
            onDelete={id => dispatch(deleteAdminData('genre', id))}
            onAdd={editedVals => dispatch(addAdminData('genre', editedVals))}
          />
        </section>
      </div>
    );
  }
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  genre: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
  keywords: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, keyword: PropTypes.string })),
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      english_name: PropTypes.string,
      code: PropTypes.string
    })
  )
};

AdminPage.defaultProps = {
  languages: [],
  keywords: [],
  genre: []
};

export default AdminPage;
