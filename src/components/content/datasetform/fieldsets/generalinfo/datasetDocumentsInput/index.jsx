import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React from 'react';

import { editFileQueue } from '../../../../../../redux/actions/datasetform';
import Add from '../../../../../ui/buttons/add';
import DatasetDocument from './datasetDocument';
import styles from './datasetDocumentsInput.scss'

const DatasetDocumentsInput = props => {
  const { datasetDocuments, dispatch } = props;
  return (
    <div>
      <p>Aineistoon liittyvät tiedostot</p>
      <ul className={styles.documentList}>
        {datasetDocuments.map((doc, idx) => (
          <li key={`doc_${idx}`}>
            <DatasetDocument
              {...doc}
              idx={idx}
              datasetDocuments={datasetDocuments}
              dispatch={dispatch}
            />
          </li>
        ))}
      </ul>
      <div>
        <Add
          onClick={() =>
            dispatch(
              editFileQueue([...datasetDocuments, { file: null, description: '', filename: '' }])
            )
          }
        />
      </div>
    </div>
  );
};

DatasetDocumentsInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  datasetDocuments: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default DatasetDocumentsInput;
