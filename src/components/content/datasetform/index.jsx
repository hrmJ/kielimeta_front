/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateField, submitDataset } from '../../../redux/actions/datasetform';
import styles from './datasetform.scss';
import GeneralInfo from './fieldsets/generalinfo/index';
import Languages from './fieldsets/languages';

export default class InsertForm extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      fields: PropTypes.objectOf(PropTypes.any).isRequired,
      loadingState: PropTypes.objectOf(PropTypes.any).isRequired
    };
  }

  handleChange = name => event => {
    const { dispatch } = this.props;
    if (event.target) {
      dispatch(updateField(name, event.target.value));
    } else if (event.value) {
      dispatch(updateField(name, event.value));
    } else if (Array.isArray(event)) {
      dispatch(updateField(name, event.map(item => item.value)));
    }
  };

  submit(event) {
    const { dispatch, fields } = this.props;
    event.preventDefault();
    dispatch(submitDataset(fields));
  }

  render() {
    // PROPS: usertype
    const { loadingState, dispatch, fields } = this.props;

    if (loadingState.SUBMITDATASET) {
      if (loadingState.SUBMITDATASET === 'success') {
        return <div id="savedmsg">Tallennettu</div>;
      }
    }

    return (
      <form onSubmit={event => this.submit(event)}>
        <GeneralInfo dispatch={dispatch} handleChange={this.handleChange.bind(this)} />
        <Languages languages={fields.languages} dispatch={dispatch} />
        <div>
          <button type="submit" id="datasetsubmit">
            Tallenna
          </button>
        </div>
      </form>
    );
  }
}
