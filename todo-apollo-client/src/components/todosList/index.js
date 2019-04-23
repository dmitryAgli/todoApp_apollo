import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import TodoElement from '../todoElement/';
import {Subscription } from 'react-apollo';


export default class TodoList extends React.Component {
    componentDidMount() {
      this.props.subscribeToMore({
        document: TODO_CREATED,
        updateQuery: (prev, { subscriptionData: { data : { todoCreated } } }) => {
          if (!todoCreated) return prev;
          let data = [...prev.allTodos];
          data.push(todoCreated)
          return {
            allTodos: data,
          };
        },
      });
    }
  
    render() {
      return (<div>
          {this.props.todos.map(todo => {
          return (
            <div key={todo._id}>
              <TodoElement todo={todo}/>
              <Subscription subscription={TODO_UPDATED}
                              variables={{ id: todo._id }}>
                              {() => {return null;}}
              </Subscription>
            </div>
          )
          })}
        </div>
      );
    }
  }

TodoList.propTypes={ todos: PropTypes.array.isRequired,
                        subscribeToMore: PropTypes.func.isRequired};

const TODO_CREATED = gql`
  subscription {
    todoCreated {
      _id
      text
      isDone
    }
  }`;
const TODO_UPDATED = gql`
  subscription todoUpdated($id: String!){
                todoUpdated(id:$id)
		        { 
                  _id
    	            text
                  isDone
                }
}`;