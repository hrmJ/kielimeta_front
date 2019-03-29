import React, { Component } from "react";
import styles from "./datasetitem.scss";

export default class DatasetItem extends Component {
  render() {
    const { title } = this.props;
    return <div className={styles.datasetItem}>{title}</div>;
  }
}
