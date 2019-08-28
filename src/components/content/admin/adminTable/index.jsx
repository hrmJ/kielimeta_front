import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Add from '../../../ui/buttons/add';
import EditableRow from '../../../ui/editableRow';
import FoldableBox from '../../../ui/foldablebox';
import LabelledInput from '../../../ui/labelledinput';
import Loader from '../../../ui/loader';
import styles from './amintable.scss';

class adminTable extends Component {
  state = { filter: '', addPending: false };

  render() {
    const {
      header,
      onOpen,
      ready,
      onSave,
      onDelete,
      columnNames,
      data,
      onAdd,
      columnKeys
    } = this.props;
    const { filter, addPending } = this.state;

    return (
      <FoldableBox header={header} onOpen={onOpen}>
        {!ready ? (
          <div style={{ display: 'flex' }}>
            <Loader />
          </div>
        ) : (
          <div className={styles.dataContainer}>
            <div className={styles.filterContainer}>
              <LabelledInput label="Suodata">
                <input
                  type="text"
                  value={filter}
                  onChange={ev => this.setState({ filter: ev.target.value })}
                />
              </LabelledInput>
            </div>
            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th />
                    {columnNames.map(col => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter(
                      item =>
                        !filter ||
                        Object.keys(item).filter(
                          col => typeof item[col] === 'string' && item[col].includes(filter)
                        ).length > 0
                    )
                    .map(item => (
                      <EditableRow
                        key={uid(item)}
                        cells={item}
                        onSave={onSave}
                        onDelete={onDelete}
                        id={item.id}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className={`${styles.addContainer} ${styles.dataContainer}`}>
          {addPending ? (
            <div>
              <div>Uusi tietue</div>
              <table>
                <thead>
                  <tr>
                    <th />
                    {columnNames.map(col => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <EditableRow
                    cells={{ ...data[0] }}
                    onSave={editedVals => {
                      this.setState({ addPending: false });
                      onAdd(editedVals);
                    }}
                    columnKeys={columnKeys}
                    isAdded
                  />
                </tbody>
              </table>
            </div>
          ) : (
            <Add onClick={() => this.setState({ addPending: true })} />
          )}
        </div>
      </FoldableBox>
    );
  }
}

adminTable.propTypes = {
  header: PropTypes.string.isRequired,
  ready: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  columnKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

adminTable.defaultProps = {
  ready: false,
  onAdd: () => null
};
export default adminTable;
