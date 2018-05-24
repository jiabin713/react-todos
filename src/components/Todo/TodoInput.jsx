import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


export default class TodoInput extends React.Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    checkAllToggle: PropTypes.func.isRequired,
    uncompletedCount: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
  };

  componentDidMount() {
    this.addTodoInput.focus();
  }
  
  addTodo = (event) => {
    const { addTodo } = this.props;
    let value = event.target.value.trim();
    if (event.keyCode !== 13) {
      return ;
    }
    if (value) {
      addTodo(value);
    }
    event.target.value = '';
  }

  checkAllToggle = (event) => {
    const { checkAllToggle } = this.props;
    checkAllToggle(event.target.checked);
  }

  render() {
    return (
      <div>
        <input 
          type="checkbox"
          checked={!this.props.uncompletedCount}
          onChange={this.checkAllToggle}
        />
        <input
          placeholder={this.props.placeholder}
          type="text"
          onKeyUp={this.addTodo}
          ref={input => this.addTodoInput = input}
        />
      </div>
    );
  }
}
