import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    delTodo: PropTypes.func.isRequired,
    checkOneToggle: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
  };

  render() {
    const { todos, delTodo, checkOneToggle, updateTodo } = this.props;
    return (
      <ul>
        {
          todos.map((todo) => {
            return (
              <TodoItem 
                key={todo.id}
                todo={todo}
                delTodo={delTodo}
                checkOneToggle={checkOneToggle}
                updateTodo={updateTodo}
              />
            )
          })
        }
      </ul>
    );
  }
}
