import React, { Component } from 'react';
import './App.css';
import TodoAdd from '../src/components/todoAdd/';
import TodosContainer from '../src/components/todosContainer';

export default class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1>TODO List</h1>
          <h3>Subscriptions with GraphQL</h3>
        </header>
        <TodoAdd />
        <TodosContainer />
      </div>
    );
  }
}

