import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { fetchDatasetTitles, setActiveTitle } from '../../redux/actions/datasets';
import { filterDatasets, updateAndFilter } from '../../redux/actions/filters';
import { getCookie } from '../../utils';
import BasicButton from '../ui/buttons/BasicButton';
import Icon from '../ui/icon';
import generalStyles from '../../general_styles/general_styles.scss';
import styles from './indicator.scss';

class LoginIndicator extends Component {
  state = { menuOpen: false };

  toggleMenu() {
    const {
      userDetails: { datasets },
      dispatch,
      datasetTitles
    } = this.props;
    const { menuOpen } = this.state;
    const datasetIds = Array.isArray(datasets) ? datasets.map(ds => ds.dataset) : [];
    if (datasetIds.filter(id => !Object.keys(datasetTitles).includes(id)).length) {
      dispatch(fetchDatasetTitles(datasetIds));
    }
    this.setState({ menuOpen: !menuOpen });
  }

  render() {
    const {
      userDetails: { datasets, isStaff, groups },
      datasetTitles,
      dispatch
    } = this.props;

    const user = getCookie('current_user');
    const { menuOpen } = this.state;
    return user ? (
      <div className={styles.menucontainer}>
        <BasicButton
          text={user.replace(/"/g, '')}
          iconName="faUser"
          iconFirst
          customClass={styles.buttonClass}
          onClick={() => this.toggleMenu()}
        />
        {menuOpen && (
          <div className={styles.logoutMenu}>
            <section className={styles.rightsSection}>
              <ul className={styles.rightsList}>
                {isStaff && (
                  <li className={styles.listItem}>
                    <Icon iconName="faCheck" />
                    <div className={styles.rigthLegend}>Oikeus lisätä aineistoja</div>
                  </li>
                )}
                {groups && (
                  <li className={styles.listItem}>
                    <Icon iconName="faCheck" />
                    <div className={styles.rigthLegend}>Oikeus ryhmitellä aineistoja</div>
                  </li>
                )}
              </ul>
            </section>
            <section className={generalStyles.labelContainerStacked}>
              <div>Omat aineistot</div>
              <div>
                {Array.isArray(datasets) && datasets.length > 0 ? (
                  <ul className={styles.rightsList}>
                    {datasets.map(
                      ds =>
                        datasetTitles[ds.dataset] && (
                          <li key={ds.dataset} className={styles.listItem}>
                            <BasicButton
                              text={datasetTitles[ds.dataset]}
                              noBackground
                              onClick={() => {
                                dispatch(setActiveTitle(datasetTitles[ds.dataset]));
                                dispatch(filterDatasets({ query: datasetTitles[ds.dataset] }));
                              }}
                            />
                          </li>
                        )
                    )}
                  </ul>
                ) : (
                  <p>Ei omia aineistoja </p>
                )}
                <div className={styles.logoutContainer}>
                  <Link to="logout" id="logoutlink">
                    Kirjaudu ulos
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    ) : (
      <div>
        <Link to="login" id="loginlink">
          Kirjaudu sisään
        </Link>
      </div>
    );
  }
}

LoginIndicator.propTypes = {
  userDetails: PropTypes.shape({
    username: PropTypes.string,
    datasets: PropTypes.arrayOf(PropTypes.any),
    is_staff: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  datasetTitles: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(LoginIndicator);
