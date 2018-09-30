import React, { Component } from "react";
import PropTypes from "prop-types";
import InputRange from "react-input-range";

import "./Slider.css";

class Slider extends Component {
  render() {
    const { value, setValue } = this.props;

    return (
      <InputRange
        maxValue={100}
        minValue={0}
        value={value}
        onChange={value => setValue(value)}
      />
    );
  }
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired
};

export default Slider;
