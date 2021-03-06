import { withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './nav_styles.scss';
import logo from '../../../images/digilang-logo.svg';

const TopBar = props => {
  const { toggleClusterTool, userDetails, dispatch, datasetTitles, history } = props;

  const { groups, is_staff: isStaff } = userDetails;
  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div>
          <div className={styles.siteHeading}>
            <div
              className={styles.logoContainer}
              role="button"
              onKeyDown={() => null}
              onClick={() => history.push('/')}
              tabIndex={0}
            >
              <img src={logo} alt="digilang-portaali" />
            </div>
            <div className={styles.headingText}>
              <h1>Kieliaineistoportaali</h1>
              <ul className={styles.linkList}>
                {isStaff && (
                  <li>
                    <NavLink to="/" id="fpLink" activeClassName={styles.activeLink}>
                      Pääsivu
                    </NavLink>
                  </li>
                )}
                {groups && groups.includes('grouper') && (
                  <li>
                    <a href="javascript:void(0)" type="button" onClick={toggleClusterTool}>
                      Ryhmittele
                    </a>
                  </li>
                )}
                {isStaff && (
                  <li>
                    <NavLink
                      to="/newdataset"
                      id="newdatasetLink"
                      activeClassName={styles.activeLink}
                      exact
                      replace
                      isActive={match => {
                        if (!match) {
                          return false;
                        }
                        return true;
                      }}
                    >
                      Uusi aineisto
                    </NavLink>
                  </li>
                )}
                {isStaff && (
                  <li>
                    <NavLink to="/admin" activeClassName={styles.activeLink}>
                      Ylläpito
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  toggleClusterTool: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  userDetails: PropTypes.shape({
    username: PropTypes.string,
    datasets: PropTypes.arrayOf(PropTypes.any),
    is_staff: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  datasetTitles: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

TopBar.defaultProps = { toggleClusterTool: null };

export default withRouter(TopBar);
