import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { editFileQueue } from '../../../../../../../redux/actions/datasetform';
import ClosableBox from '../../../../../../ui/closablebox';
import LabelledInput from '../../../../../../ui/labelledinput';
import styles from './datasetDocument.scss';

class DatasetDocument extends Component {
  onFileChange(files) {
    const { dispatch, datasetDocuments, description, idx, id } = this.props;
    // const data = new FormData();
    // data.append('file', files[0]);
    dispatch(
      editFileQueue(
        (datasetDocuments.splice(idx, 1, {
          description,
          file: files[0],
          filename: files[0].name,
          id
        }),
        datasetDocuments)
      )
    );
  }

  remove = () => {
    const { idx, datasetDocuments, dispatch } = this.props;
    const updated = [...datasetDocuments];
    updated.splice(idx, 1);
    if (datasetDocuments.length > 0) {
      dispatch(editFileQueue(updated));
    }
  };

  render() {
    const { description, file, dispatch, datasetDocuments, idx, filename, url, id } = this.props;
    return (
      <ClosableBox onClose={() => this.remove()}>
        <div>
          <LabelledInput label="Tiedosto">
            <div>
              <input
                type="file"
                name="file"
                onChange={ev => this.onFileChange(ev.target.files)}
                className={styles.fileInput}
              />
              {url ? <a href={`media/${url}`}>{filename}</a> : filename}
            </div>
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
                    filename,
                    id,
                    url
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
  file: PropTypes.any,
  filename: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.string
};

DatasetDocument.defaultProps = {
  description: '',
  file: null,
  filename: '',
  url: '',
  id: ''
};

export default DatasetDocument;
