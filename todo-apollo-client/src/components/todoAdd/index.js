import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import send from '../../images/send.svg';
import './todoAdd.css';

class TodoAdd extends Component{

    constructor(props){
        super(props);
        this.onSend = this.onSend.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {message:''};
    }

    onSend=()=>{
        //call the creation mutation
        this.props.mutate({
            variables: { text: this.state.message }
          })
        //clean the text input
        this.setState({message:""});
    }

    onTextChange=(event)=>{
        this.setState({message:event.target.value});
    }

    handleKeyPress=(event)=>{
        if (event.key === 'Enter' && this.state.message.trim() !=="" ) {
            this.onSend();
        }
    }

    render(){
        return(<div className="message-text-container">
            <input type="text"
                   value={this.state.message}
                   className="message-text-input"
                   onChange={this.onTextChange}
                   onKeyPress={this.handleKeyPress}/>
            <img className="send-button"
                 alt="Send"
                 src={send} 
                 onClick={this.onSend} />
        </div>);
    }
}

const CREATE_TODO = gql`
    mutation createTodo($text: String!){
        createTodo(text:$text){
            _id,
            text,
            isDone	
    }    	
}`;

export default graphql(CREATE_TODO)(TodoAdd);