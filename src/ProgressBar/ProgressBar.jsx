import React, { Component } from "react";
import PropTypes from "prop-types";
import anime from "animejs";

import "./ProgressBar.css";

const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function calculateStrokeDashOffset(progress) {
  const progressPercentage = Math.ceil(progress) / 100;
  console.log(CIRCUMFERENCE * (1 - progressPercentage));
  return CIRCUMFERENCE * (1 - progressPercentage);
}

class ProgressBar extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    window.requestAnimationFrame(() => this.animate());
  }

  componentDidUpdate(prevProps) {
    if (this.props.progress !== prevProps.progress) {
      window.requestAnimationFrame(() => this.animate());
    }
  }

  componentWillUnmount() {
    anime.remove(this.animationObj);
  }

  animate = () => {
    this.animationObj = { value: this.state.value };

    // 100% progress animates in 1.2s, i,e 12ms per percent, but no less then 700ms
    const duration = Math.max(
      Math.abs(Math.ceil(this.state.value) - Math.ceil(this.props.progress)) *
        12,
      700
    );

    anime({
      targets: this.animationObj,
      value: Math.ceil(this.props.progress),
      round: 1,
      easing: "easeOutCubic",
      duration,
      update: () => this.setState({ value: this.animationObj.value })
    });
  };

  render() {
    const { value } = this.state;
    const { description } = this.props;
    const strokeDashoffset = calculateStrokeDashOffset(this.state.value);
    return (
      <div className="progress-container">
        <svg
          className="progress-bar"
          id="svg"
          width="240"
          height="240"
          aria-hidden="true"
        >
          <circle
            className="progress-meter"
            r={RADIUS}
            cx="120"
            cy="120"
            fill="transparent"
            strokeWidth="20"
            strokeDashoffset="0"
          />
          <circle
            className="progress-value"
            r={RADIUS}
            cx="120"
            cy="120"
            fill="transparent"
            strokeWidth="20"
            style={{ strokeDashoffset }}
            strokeDasharray="452.3"
          />
        </svg>
        <span className="progress-bar-info">
          <div className="progress-bar-info-value">{value}%</div>
          <div className="progress-bar-info-description">{description}</div>
        </span>
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  progress: 0,
  description: "Progress"
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  description: PropTypes.string
};

export default ProgressBar;
