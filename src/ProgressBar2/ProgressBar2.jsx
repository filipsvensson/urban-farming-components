import React, { Component } from "react";
import PropTypes from "prop-types";
import anime from "animejs";

import "./ProgressBar2.css";

class ProgressBar2 extends Component {
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

    return (
      <div className="progress-bar-2-container">
        <svg
          className="progress-bar-2"
          id="svg"
          width="25"
          height="150"
          aria-hidden="true"
        >
          <g class="bars">
            <rect
              className="progress-bar-2-bar"
              fill="#b49e25"
              height="100%"
              width="25"
            />
            <rect
              className="progress-bar-2-progress"
              fill="#603d52"
              height={`${value}%`}
              width="25"
            />;
          </g>
        </svg>
        <div className="progress-bar-2-value">{value}°</div>
      </div>
    );
  }
}

ProgressBar2.defaultProps = {
  progress: 0
};

ProgressBar2.propTypes = {
  progress: PropTypes.number
};

export default ProgressBar2;
