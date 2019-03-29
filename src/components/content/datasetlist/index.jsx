import React, { Component } from "react";
import { listAll } from "../../../redux/actions/datasets";
import DatasetItem from "../datasetitem/index.jsx";
import styles from "./datasetlist.scss";

export default class DatasetList extends Component {
  componentDidMount() {
    this.props.dispatch(listAll());
  }

  render() {
    const { datasets } = this.props;
    return (
      <div id="resources">
        <ul className={styles.datasetlist}>
          {datasets.map(dataset => (
            <li key={dataset.id}>
              <DatasetItem {...dataset} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
