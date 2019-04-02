import React, { Component } from "react";

export default class InsertForm extends Component {
  handleChange = name => event => {
    return "lkja";
  };

  render() {
    //PROPS: usertype
    return (
      <form>
        <input
          type="text"
          id="datasettitle"
          onChange={this.handleChange("title")}
        />
      </form>
    );
  }
}
