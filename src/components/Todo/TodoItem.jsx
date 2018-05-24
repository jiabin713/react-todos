import React from 'react';
import PropTypes from 'prop-types';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      newTodoText: this.props.todo.title,
    }
  }
  static propTypes = {
    todo: PropTypes.object.isRequired,
    delTodo: PropTypes.func.isRequired,
    checkOneToggle: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
  };

  delTodo = () => {
    const { delTodo, todo } = this.props;
    delTodo(todo);
  }

  updateTodo = (event) => {
    const { updateTodo, todo } = this.props;
    let value = event.target.value.trim();
    if (event.keyCode === 27) {
      this.setState({
        newTodoText: todo.title,
        editing: false,
      });
    }
    if (event.keyCode !== 13) {
      return ;
    }
    if (value) {
      updateTodo(todo, value);
    } else {
      this.delTodo();
    }
    this.setState({editing: false});
  }

  checkOneToggle = () => {
    const { checkOneToggle, todo } = this.props;
    checkOneToggle(todo);
  }

  changeEdit = () => {
    this.setState({
      editing: !this.state.editing,
    })
  }

  editTodo = (event) => {
    let newTodoText = event.target.value;
    this.setState({newTodoText});
  }

  render() {
    const { todo } = this.props;
    if (!this.state.editing) {
      return (
        <li onDoubleClick={this.changeEdit}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={this.checkOneToggle}
          />
          { this.state.newTodoText }
          <button
            onClick={this.delTodo}
          >X</button>
        </li>
      );
    } else {
      return (
        <li>
          <input
            type="text"
            value={this.state.newTodoText}
            onBlur={this.updateTodo}
            onKeyUp={this.updateTodo}
            onChange={this.editTodo}
            ref={input => this.newTodoTextInput = input}
          />
        </li>
      );
    }
  }
}
