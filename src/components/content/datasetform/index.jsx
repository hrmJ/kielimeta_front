import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateField, submitDataset } from '../../../redux/actions/datasetform';

export default class InsertForm extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      fields: PropTypes.arrayOf(PropTypes.object).isRequired,
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
