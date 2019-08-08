import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import React from 'react';

import { fetchDatasetFromJson } from '../../../redux/actions/datasets';
import BasicButton from '../../ui/buttons/BasicButton';
import styles from './jsoninput.scss';

class jsonInput extends React.Component {
  state = {
    jsonString: ''
  };

  render() {
    const { dispatch, history, datasetform } = this.props;
    const { jsonString } = this.state;
    const isReady = false;
    return (
      <div className={styles.container}>
        <div className={styles.dataContainer}>
          <textarea
            helptext="Liitä tähän raakadata json-muodossa"
            onChange={ev => this.setState({ jsonString: ev.target.value })}
          />
        </div>
        <div className={styles.buttonContainer}>
          {datasetform.title ? (
            <BasicButton
              text="Syötä lomakkeelle"
              onClick={() => {
                history.push(`/newdataset/fromjson`);
              }}
            />
          ) : (
            <BasicButton
              text="Lue tiedot"
              onClick={() => {
                dispatch(fetchDatasetFromJson(jsonString));
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

jsonInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any)
};

jsonInput.defaultProps = {
  history: {}
};

export default withRouter(jsonInput);
