import React from "react";
import { Component } from "react";
import TopBar from "../layout/navigation/topbar.jsx";
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
      <div>
        <TopBar />
        <Header />
        <main>
          <DatasetList datasets={datasets} dispatch={dispatch} />
        </main>
        <Footer />
      </div>
    );
  }
}
