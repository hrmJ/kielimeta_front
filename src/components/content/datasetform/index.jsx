import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateField } from '../../../redux/actions/datasetform';

export default class InsertForm extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
    };
  }

  handleChange = name => (event) => {
    const { dispatch } = this.props;
    dispatch(updateField(name, event.target.value));
  };

  render() {
    // PROPS: usertype
    return (
      <form>
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
        </fieldset>
      </form>
    );
  }
}
