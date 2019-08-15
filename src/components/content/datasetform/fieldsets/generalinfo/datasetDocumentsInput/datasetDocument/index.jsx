import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { editFileQueue } from '../../../../../../../redux/actions/datasetform';
import ClosableBox from '../../../../../../ui/closablebox';
import LabelledInput from '../../../../../../ui/labelledinput';

class DatasetDocument extends Component {
  onFileChange(files) {
    const { dispatch, datasetDocuments, description, idx } = this.props;
    const data = new FormData();
    data.append('file', files[0]);
    dispatch(
      editFileQueue(
        (datasetDocuments.splice(idx, 1, { description, file: data, filename: 'TODO' }),
        datasetDocuments)
      )
    );
  }

  remove = () => {
    const { idx, datasetDocuments, dispatch } = this.props;
    const updated = [...datasetDocuments];
    updated.splice(idx, 1);
    if (datasetDocuments.length > 1) {
      dispatch(editFileQueue(updated));
    }
  };

  upload() {
    const { selectedFile } = this.state;
    const { dispatch, file } = this.props;
    const data = new FormData();
    data.append('file', selectedFile);
    dispatch(submitFile(data));
  }

  render() {
    const { description, file, dispatch, datasetDocuments, idx } = this.props;
    return (
      <ClosableBox onClose={() => this.remove()}>
        <div>
          <LabelledInput label="Tiedosto">
            <input type="file" name="file" onChange={ev => this.onFileChange(ev.target.files)} />
          </LabelledInput>
          <LabelledInput
            label="Lyhyt kuvaus tiedostosta"
            value={description}
            handleChange={ev =>
              dispatch(
                editFileQueue(
                  (datasetDocuments.splice(idx, 1, {
                    description: ev.target.value,
                    file,
                    filename: 'TODO'
                  }),
                  datasetDocuments)
                )
              )
            }
          />
        </div>
      </ClosableBox>
    );
  }
}

DatasetDocument.propTypes = {
  dispatch: PropTypes.func.isRequired,
  description: PropTypes.string,
  idx: PropTypes.number.isRequired,
  datasetDocuments: PropTypes.arrayOf(PropTypes.any).isRequired,
  file: PropTypes.any
};

DatasetDocument.defaultProps = {
  description: '',
  file: null
};

export default DatasetDocument;
