import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { momentObj } from 'react-moment-proptypes';

const propTypes = {
  classes: PropTypes.string,
  dayClicked: PropTypes.func.isRequired,
  dayHovered: PropTypes.func.isRequired,
  day: momentObj,
  title: PropTypes.string,
  data: PropTypes.objectOf()
};

const defaultProps = {
  classes: '',
  day: null,
  title: undefined,
  data: undefined
};

class Day extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onHover = this.onHover.bind(this);
  }

  onClick() {
    const { dayClicked, day } = this.props;
    dayClicked(day);
  }

  onHover() {
    const { dayHovered, day } = this.props;
    dayHovered(day);
  }

  render() {
    const { classes, day, title, data } = this.props;
    return (
      <td onClick={this.onClick} onMouseEnter={this.onHover} className={classes} title={title}>
        <span className="day-number">{day === null ? '' : day.date()}</span>
        <p style={{ lineHeight: 0, fontSize: '9px' }}>{data && data.price}</p>
      </td>
    );
  }
}

Day.propTypes = propTypes;
Day.defaultProps = defaultProps;

export default Day;
