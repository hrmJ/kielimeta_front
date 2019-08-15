import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { submitFile, addFileToQueue } from '../../../../redux/actions/datasetform';
import BasicButton from '../../../ui/buttons/BasicButton';
import LabelledInput from '../../../ui/labelledinput';

class AttachmentField extends Component {
  state = { selectedFile: undefined };

  onFileChange(files) {
    const { dispatch } = this.props;
    this.setState({ selectedFile: files.length > 0 && files[0] });
  }

  upload() {
    const { selectedFile } = this.state;
    const { dispatch } = this.props;
    const data = new FormData();
    data.append('file', selectedFile);
    dispatch(submitFile(data));
  }

  render() {
    return (
      <div>
        <input type="file" name="file" onChange={ev => this.onFileChange(ev.target.files)} />

        {/*
          <div>
            <BasicButton text="Lataa " onClick={() => this.upload()} />
          </div>
        */}
      </div>
    );
  }
}

AttachmentField.propTypes = { dispatch: PropTypes.func.isRequired };

export default AttachmentField;
