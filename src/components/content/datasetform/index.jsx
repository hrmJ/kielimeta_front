import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateField, submitDataset } from '../../../redux/actions/datasetform';

export default class InsertForm extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      fields: PropTypes.objectOf(PropTypes.any).isRequired,
      loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
    };
  }

  handleChange = name => (event) => {
    const { dispatch } = this.props;
    dispatch(updateField(name, event.target.value));
  };

  submit(event) {
    const { dispatch, fields } = this.props;
    event.preventDefault();
    dispatch(submitDataset(fields));
  }

  render() {
    // PROPS: usertype
    const { loadingState } = this.props;

    if (loadingState.SUBMITDATASET) {
      if (loadingState.SUBMITDATASET === 'success') {
        return <div id="savedmsg">Tallennettu</div>;
      }
    }

    return (
      <form onSubmit={event => this.submit(event)}>
        <fieldset>
          <input
            type="text"
            defaultValue=""
            id="datasettitle"
            onChange={this.handleChange('title')}
          />
          <textarea
            defaultValue=""
            id="datasetdescription"
            onChange={this.handleChange('description')}
          />
          <button type="submit" id="datasetsubmit">
            Tallenna
          </button>
        </fieldset>
      </form>
    );
  }
}
