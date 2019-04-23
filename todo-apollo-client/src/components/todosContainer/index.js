
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import TodoList from '../todosList/';

const TodosContainer = () => (
    <Query query={GET_TODOS}>
      {({ data, loading, error, subscribeToMore }) => {
        if (!data) {
          return null;
        }
        if (loading) {
          return <span>Loading ...</span>;
        }
        if (error) { 
          return <p>Sorry! Something went wrong.</p>;
        }

        data = [...data.allTodos];
        data.reverse()

        return (<TodoList
            todos={data}
            subscribeToMore={subscribeToMore}
          />);
      }}
    </Query>
  );

  const GET_TODOS = gql`
    query {
      allTodos {
        _id
        text
        isDone
      }
    }
`;

export default TodosContainer;