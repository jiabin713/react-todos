import React from 'react';

import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoStatus from './TodoStatus';


const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';
let generateId = 0;

export default class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.todos = [
      {
        id: generateId ++,
        title: 'title1',
        completed: false
      },
      {
        id: generateId ++,
        title: 'title2',
        completed: false
      },
      {
        id: generateId ++,
        title: 'title3',
        completed: false
      },
    ];
    this.state = {
      status: 'all',
      showTodos: [],
      uncompletedCount: null,
    }
  }

  chooseStatus = (status) => {
    this.setState({status});
  }

  addTodo = (title) => {
    let todo = {
      id: generateId ++,
      title: title,
      completed: false,
    };
    this.todos = [todo, ...this.todos];
    this.chooseStatus();
  }

  delTodo = (todo) => {
    this.todos = this.todos.filter(item => item !== todo);
    this.chooseStatus();
  }

  updateTodo = (todo, title) => {
    let index = this.todos.findIndex(item => todo === item);
    todo.title = title;
    this.todos.splice(index, 1, todo);
    this.chooseStatus();
  }

  checkOneToggle = (todo) => {
    let index = this.todos.findIndex(item => todo === item);
    this.todos[index].completed = !this.todos[index].completed;
    this.chooseStatus();
  }

  checkAllToggle = (checkBoolean) => {
    this.todos.map(item => item.completed = checkBoolean);
    this.chooseStatus();
  }

  delAllCompleted = () => {
    this.todos = this.todos.filter(item => !item.completed);
    this.chooseStatus();
  }

  render() {
    let {showTodos,status,uncompletedCount} = this.state;
    showTodos = this.todos.filter(todo => {
      switch (status) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        case ALL_TODOS:
          return true;
        default: 
          return true;
      } 
    })
    uncompletedCount = this.todos.filter(todo => !todo.completed).length;
    return (
      <div>
        <div className="header">
          <h1>todos</h1>
        </div>
        <TodoInput
          className="new-todo"
          placeholder="What needs to be done?"
          addTodo={this.addTodo}
          checkAllToggle={this.checkAllToggle}
          uncompletedCount={uncompletedCount}
        />
        <TodoList
          todos={showTodos}
          delTodo={this.delTodo}
          checkOneToggle={this.checkOneToggle}
          updateTodo={this.updateTodo}
        />
        <TodoStatus
          chooseStatus={this.chooseStatus}
          uncompletedCount={uncompletedCount}
          delAllCompleted={this.delAllCompleted}
        />
      </div>
    );
  }
}
