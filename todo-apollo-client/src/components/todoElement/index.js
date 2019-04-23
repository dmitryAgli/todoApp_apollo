import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './todoElement.css';
import DoneIcon from '../doneIcon/';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export default class MessageElement extends Component{

    constructor(props) {
        super(props)
        this.state = {text: this.props.todo.text}
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(e) {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        return(
            <div>
                <Mutation mutation={UPDATE_TODO} key={this.props.todo._id}>
                        {updateTodo => (
                            <div className="message-container">
                                <div className="text-container">{this.props.todo.text}</div> 
                                <div className="moreActions-container">
                                    <DoneIcon active={this.props.todo.isDone} 
                                        onClick={() => { updateTodo({ variables: { 
                                                id: this.props.todo._id, 
                                                text: this.props.todo.text,
                                                isDone: !this.props.todo.isDone } });}}/>

                                </div>
                            </div>
                        )}
                </Mutation>
            </div>
        );
    }
}

MessageElement.propTypes={
    todo: PropTypes.object.isRequired,
}

const UPDATE_TODO = gql`
mutation updateTodo($id: String!, $text: String!, $isDone: Boolean!)
        {
            updateTodo (id: $id, text: $text, isDone: $isDone){
                _id,
                text,
                isDone
        } 		
}`;

