import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.css'

class Person extends Component {
    constructor(props){
        super(props);

        this.myInputElementRef = React.createRef();
    }
    componentDidMount(){
        //this.myInputElement.focus();
        this.myInputElementRef.current.focus();
    }

    render(){
        console.log('[Person.js] rendering...');
        return (
            <Auxiliary>
             {/* <div className={classes.Person} > */}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} year old!</p>
                <p>{this.props.children}</p>
                <input 
                    //older approach, functional
                    //ref={(inputEle) => {this.myInputElement = inputEle}}
                    //modern approach
                    ref={this.myInputElementRef}
                    type='text' 
                    onChange={this.props.changed} 
                    value={this.props.name}
                />
             {/* </div> */}
            </Auxiliary>
        );
    }
};

//property validation
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);