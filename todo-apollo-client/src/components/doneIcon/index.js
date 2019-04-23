import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './done.css';
import doneActive from '../../images/doneActive.svg';
import doneInactive from '../../images/doneInactive.svg';

export default class Star extends Component{

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick = () => {
        this.props.onClick(!this.props.active);
    }

    render(){
        const {active}=this.props;
        const srcImage=active?doneActive:doneInactive;
        
        return (<img src={srcImage} 
                     className="favorite-icon"
                     alt="Add to favorites" 
                     onClick={this.onClick}/>
                );
  }
}

Star.propTypes={
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired
}

Star.defaultProps = {
   active: false
 }

