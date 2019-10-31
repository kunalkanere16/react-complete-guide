import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'
import Auxiliary from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props){
    super(props);
    //you can initialize state here
    //using this.state = {...}
    console.log('[App.js] constructor');
  }

  state = {
    persons : [
      {id:'sas6a', name : 'Karen', age : 18},
      {id:'3dwf3', name : 'Kunal', age : 25},
      {id:'3dr5f', name : 'Mayur', age : 32}
    ],
    profession: 'something',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  //will be removed in future
  // componentWillMount(){
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  //important
  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate')
  }

  nameChangedHandler = (event, id) => {
    const personIdex = this.state.persons.findIndex(p => {
      return p.id===id;
    });
    const person = {
      ...this.state.persons[personIdex]
    };
    //Alternate to spread
    //const person = Object.assign({}, this.state.persons[personIdex]);
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIdex] = person;
    //super important way to update state correctly
    this.setState((prevState, props) => {
      return {
        persons:persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };
  

  deletePersonHandler = (personIndex) => {
    //below way we copy reference to original persons
    //and mutate the state - not a good way
    //const persons = this.state.persons;

    //update state immutably
    //const persons = this.state.persons.slice();// copy into new persons
    //modern way to copy array using spread operator
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons});
  }

  togglePersons = () =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons : !doesShow});
  }

  loginHandler =() => {
    this.setState({authenticated: true});
  };
  render() {
    console.log('[App.js] render');
    let persons = null;
    if(this.state.showPersons){
      persons = <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} 
            isAuthenticated={this.state.authenticated}/>      
    }

    
    return (
      //cannot use class as it is reserved word in JS
      // all below tags are JSX which are compiled into HTML
        <Auxiliary>
          <button onClick={()=>{this.setState({showCockpit:false})}}>
            Remove Cockpit
          </button>
          <AuthContext.Provider 
            value={ {
              authenticated: this.state.authenticated, 
              login: this.loginHandler
            }}
          >
            {this.state.showCockpit?
              <Cockpit
              title={this.props.appTitle} 
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersons}
              />
              :null}
            {persons}
          </AuthContext.Provider>
        </Auxiliary>
    );
    // React compiles to below code internally
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Some text here'));
  }
}

export default withClass(App, classes.App);