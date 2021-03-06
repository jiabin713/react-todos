import React from 'react';
import PropTypes from 'prop-types';

export default class TodoStatus extends React.Component {
  static propTypes = {
    uncompletedCount: PropTypes.number.isRequired,
    chooseStatus: PropTypes.func.isRequired,
    delAllCompleted: PropTypes.func.isRequired,
  };

  chooseStatus = (event) => {
    this.props.chooseStatus(event.target.value);
  }
  delAllCompleted = () => {
    this.props.delAllCompleted();
  }
  render() {
    const { uncompletedCount } = this.props;
    return (
      <div>
        { uncompletedCount }
        <ul className="row">
          <li><button onClick={this.chooseStatus} value="all">All</button></li>
          <li><button onClick={this.chooseStatus} value="active">Active</button></li>
          <li><button onClick={this.chooseStatus} value="completed">Completed</button></li>
        </ul>
        <a onClick={this.delAllCompleted}>Clear Completed</a>
      </div>
    );
  }
}
