import React from "react";
import { Component } from "react";
import DatasetList from "../content/datasetlist/index.jsx";
import Header from "../layout/header/index.jsx";
import Footer from "../layout/footer/index.jsx";

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { datasets, dispatch } = this.props;
    console.log(datasets);
    return (
      <main>
        <Header />
        <DatasetList datasets={datasets} dispatch={dispatch} />
        <Footer />
      </main>
    );
  }
}
