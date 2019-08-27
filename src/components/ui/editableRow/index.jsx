import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BasicButton from '../buttons/BasicButton';

class EditableRow extends Component {
  state = { pending: false, editedVals: {} };

  componentDidMount() {
    const { cells } = this.props;
    this.setState({ editedVals: cells });
  }

  render() {
    const { cells, onSave } = this.props;
    const { pending, editedVals } = this.state;
    return (
      <tr>
        <td>
          {pending ? (
            <BasicButton
              text="Tallenna muutokset"
              noBackground
              iconName="faSave"
              onClick={() => {
                this.setState({ pending: false });
                onSave(editedVals);
              }}
            />
          ) : (
            <div>
              <BasicButton
                text=""
                noBackground
                iconName="faPencilAlt"
                onClick={() => this.setState({ pending: true })}
              />
              <BasicButton text="" noBackground iconName="faTrash" />
            </div>
          )}
        </td>
        {Object.keys(cells).map(cellName => (
          <td key={cellName}>
            {pending ? (
              <input
                type="text"
                onChange={ev =>
                  this.setState({ editedVals: { ...editedVals, [cellName]: ev.target.value } })
                }
                defaultValue={cells[cellName]}
              />
            ) : (
              cells[cellName]
            )}
          </td>
        ))}
      </tr>
    );
  }
}

EditableRow.propTypes = {
  cells: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onSave: PropTypes.func.isRequired
};

EditableRow.defaultProps = {
  cells: {}
};

export default EditableRow;
