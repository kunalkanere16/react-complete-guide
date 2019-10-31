import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props){
        super(props);

        this.myInputElementRef = React.createRef();
    }

    //React 16.6 feature, class based components only
    static contextType = AuthContext;

    componentDidMount(){
        //this.myInputElement.focus();
        this.myInputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render(){
        console.log('[Person.js] rendering...');
        return (
            <Auxiliary>
                {this.context.authenticated ? <p>Authenticated</p> : <p>Please login</p>}
                
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