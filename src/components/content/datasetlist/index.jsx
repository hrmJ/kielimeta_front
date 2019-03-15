import React, { Component } from "react";
import { listAll } from "../../../redux/actions/datasets";

export default class DatasetList extends Component {
  componentDidMount() {
    this.props.dispatch(listAll());
  }

  render() {
    const { datasets } = this.props;
    return (
      <div id="resources">
        Here's a list of datasets!
        <ul>
          {datasets.map(dataset => (
            <li>{dataset.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
