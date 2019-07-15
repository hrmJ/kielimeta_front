import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './explodable.scss';

class explodableBos extends Component {
  state = { isOpen: false };

  toggle() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { children, title, openClassName, additionalClassname } = this.props;
    const { isOpen } = this.state;
    return (
      <div
        className={`${styles.container} ${
          isOpen ? openClassName : styles.closedContainer
        } ${additionalClassname}`}
        role="button"
        tabIndex={0}
        onKeyDown={() => this.toggle()}
        onClick={() => this.toggle()}
      >
        <div>
          <div className={isOpen ? styles.openTitle : styles.title}>{title}</div>
          <div className={styles.content}>{isOpen && children}</div>
        </div>
      </div>
    );
  }
}

explodableBos.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  openClassName: PropTypes.string,
  additionalClassname: PropTypes.string
};

explodableBos.defaultProps = {
  openClassName: '',
  additionalClassname: ''
};

export default explodableBos;
