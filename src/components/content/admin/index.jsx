import 'react-tabs/style/react-tabs.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {
  addAdminData,
  deleteAdminData,
  fetchAdminData,
  returnDataset,
  updateAdminData
} from '../../../redux/actions/admin';
import { baseUrl } from '../../../redux/actions/utils';
import AdminTable from './adminTable';
import BasicButton from '../../ui/buttons/BasicButton';
import Loader from '../../ui/loader';
import styles from './admin.scss';

class AdminPage extends Component {
  componentDidMount() {
    const { dispatch, removeddatasets } = this.props;
    if (!removeddatasets.length) {
      dispatch(fetchAdminData('removeddatasets'));
    }
  }

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
      removeddatasets,
      dispatch,
      loadingState: {
        FETCH_REMOVEDDATASETS: fetchRemovedDatasets,
        FETCH_LANGUAGES: fetchLanguages,
        FETCH_KEYWORDS: fetchKeywords,
        FETCH_GENRE: fetchGenre
      }
    } = this.props;

    return (
      <div className={styles.outerContainer}>
        <h2>Portaalin ylläpito</h2>
        <section>
          Tällä hallintasivulla voit lisätä, muokata tai poistaa käyttäjiä tai esimerkiksi
          järjestelmässä käytössä olevia kieliä ja avainsanoja.
        </section>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>Käyttäjänhallinta</Tab>
            <Tab>Aineistoille yhteiset tiedot</Tab>
            <Tab>Poistetut aineistot</Tab>
          </TabList>
          <TabPanel>
            <section>
              <a href={`${baseUrl}/admin`}>Siirry käyttäjänhallintaan</a>
            </section>
          </TabPanel>
          <TabPanel>
            {fetchRemovedDatasets !== 'success' ? (
              <Loader />
            ) : (
              <section>
                <AdminTable
                  header="Kielet ja koodit"
                  onOpen={() => this.loadData('languages')}
                  ready={fetchLanguages === 'success'}
                  data={languages}
                  columnNames={['Koodi', 'Suomenkielinen nimi', 'Englanninkielinen nimi']}
                  columnKeys={['code', 'name', 'english_name']}
                  onSave={(id, editedVals) =>
                    dispatch(updateAdminData('languages', id, editedVals))
                  }
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
                  columnKeys={['keyword']}
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
                  columnKeys={['name']}
                />
              </section>
            )}
          </TabPanel>
          <TabPanel>
            <section>
              Tietokannasta poistettuja aineistoja voi tätä kautta palauttaa takaisin portaaliin.
            </section>
            <section className={styles.removedContainer}>
              {fetchRemovedDatasets !== 'success' ? (
                <Loader />
              ) : (
                <ul className={styles.dsList}>
                  {removeddatasets.map(ds => (
                    <li key={ds.id} className={styles.liContainer}>
                      <div className={styles.itemContainer}>
                        <div>{ds.title}</div>
                        <div>
                          <BasicButton
                            text="Palauta"
                            onClick={() => dispatch(returnDataset(ds.id))}
                            customClass={styles.returnButton}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  genre: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
  keywords: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, keyword: PropTypes.string })),
  removeddatasets: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
  ),
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
  genre: [],
  removeddatasets: []
};

export default AdminPage;
