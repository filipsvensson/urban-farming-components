import React, { Component } from "react";
import ProgressBar from "./ProgressBar";
import ProgressBar2 from "./ProgressBar2";
import Slider from "./Slider";
import "./App.css";

import "react-input-range/lib/css/index.css";

class App extends Component {
  state = {
    progress: 0
  };

  setProgressValue = progress => {
    this.setState({
      progress
    });
  };

  render() {
    const { progress } = this.state;

    return (
      <div className="app">
        <div className="progress-bars">
          <ProgressBar progress={progress} />
          <ProgressBar2 progress={progress} />
        </div>
        <div className="slider-container">
          <Slider value={progress} setValue={this.setProgressValue} />
        </div>
      </div>
    );
  }
}

export default App;
