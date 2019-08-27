import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BasicButton from '../buttons/BasicButton';

class EditableRow extends Component {
  state = { pending: false, editedVals: {} };

  componentDidMount() {
    const { cells, isAdded } = this.props;
    let actualCells = cells;
    if (isAdded) {
      actualCells = Object.keys(cells).reduce((prev, cur) => ({ ...prev, [cur]: '' }), {});
    }
    this.setState({ editedVals: actualCells });
  }

  render() {
    const { cells, onSave, onDelete, id, isAdded } = this.props;
    const { pending, editedVals } = this.state;
    let actualCells = cells;
    if (isAdded) {
      actualCells = Object.keys(cells).reduce((prev, cur) => ({ ...prev, [cur]: '' }), {});
    }
    return (
      <tr>
        <td>
          {pending || isAdded ? (
            <BasicButton
              text="Tallenna muutokset"
              noBackground
              iconName="faSave"
              noKeyDown
              onClick={() => {
                this.setState({ pending: false });
                if (!isAdded) {
                  onSave(id, editedVals);
                } else {
                  onSave(editedVals);
                }
              }}
            />
          ) : (
            <div>
              {!isAdded && (
                <BasicButton
                  text=""
                  noBackground
                  iconName="faPencilAlt"
                  onClick={() => this.setState({ pending: true })}
                  noKeyDown
                />
              )}
              {!isAdded && (
                <BasicButton
                  noKeyDown
                  text=""
                  noBackground
                  iconName="faTrash"
                  onClick={() => window.confirm('Haluatko varmasti poistaa?') && onDelete(id)}
                />
              )}
            </div>
          )}
        </td>
        {Object.keys(actualCells)
          .filter(key => key !== 'id')
          .map(cellName => (
            <td key={cellName}>
              {pending || isAdded ? (
                <input
                  type="text"
                  onChange={ev =>
                    this.setState({ editedVals: { ...editedVals, [cellName]: ev.target.value } })
                  }
                  defaultValue={actualCells[cellName]}
                />
              ) : (
                actualCells[cellName]
              )}
            </td>
          ))}
      </tr>
    );
  }
}

EditableRow.propTypes = {
  cells: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  id: PropTypes.number,
  isAdded: PropTypes.bool
};

EditableRow.defaultProps = {
  onDelete: () => null,
  cells: {},
  id: null,
  isAdded: false
};

export default EditableRow;
