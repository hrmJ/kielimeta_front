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
    return (
      <main>
        <Header />
        <DatasetList />
        <Footer />
      </main>
    );
  }
}
