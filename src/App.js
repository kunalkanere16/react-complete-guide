import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import './App.css';
import Person from './Person/Person';
import ValidationComponent from './UserInput/ValidationComponent';
import CharComponent from './UserInput/CharComponent';

class App extends Component {

  state = {
    persons : [
      {id:'sas6a', name : 'Karen', age : 18},
      {id:'3dwf3', name : 'Kunal', age : 25},
      {id:'3dr5f', name : 'Mayur', age : 32}
    ],
    profession: 'something',
    showPersons: false,
    userInput : {
      value:'',
      length:0
    }
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
    this.setState( {persons:persons} )
  }
  

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

  updateUserInput = (event) => {
    const input = event.target.value;
    //console.log('update called.....'+input);
    const userInput = {...this.state.userInput};
    userInput.value = input;
    userInput.length = input.length;
    this.setState({userInput:userInput});
    //console.log(this.state);
  }

  deleteCharacterHandler = (charIndex)=>{
    const userInput = {...this.state.userInput};
    const charArray = userInput.value.split('');
    charArray.splice(charIndex,1);
    userInput.value = charArray.join('');
    userInput.length = userInput.value.length;
    this.setState({userInput:userInput})
  }

  render() {
    const style =  {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover':{
        backgroundColor: 'lightgreen',
        color:'black'
      }
    };

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={()=>this.deletePersonHandler(index)}
              name={person.name}
              age={person.age} 
              key={person.id} 
              changed={(event)=> this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      );

      style.backgroundColor= 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color:'black'
      }
    }

    let message = null;
    if(this.state.userInput.length>=5){
      message = (
        <ValidationComponent message='Text long enough'/>
      );
    }else{
      message = (
        <ValidationComponent message='Text too short'/>
      );
    }

    let characters = null;

    if(this.state.userInput.length>0){
      characters = (
        <div>
          {this.state.userInput.value.split('').map((letter, index) => {
            return <CharComponent  
              click={()=>this.deleteCharacterHandler(index)}
              letter={letter}
              key={index}/>
          })}
        </div>
      );
    }

    const classes = [];
    if(this.state.persons.length<=2){
      classes.push('red');
    }
    if(this.state.persons.length<=1){
      classes.push('bold');
    }
    return (
      //cannot use class as it is reserved word in JS
      // all below tags are JSX which are compiled into HTML
      <StyleRoot>
        <div className="App"> 
          <h1>Hello React World</h1>
          <p className={classes.join(' ')}>This is my first react page!!</p>
          {/*try not to use below style to call method with args */}
          <button 
            style={style}
            onClick={ this.togglePersons}>Toggle persons</button>
          {persons}
          
          <div>
            <input type='text' onChange={this.updateUserInput} value={this.state.userInput.value}/> 
            <p>{this.state.userInput.value}</p>
            <p>Length: {this.state.userInput.length}</p>
            {message}
            {characters}
          </div>
        </div>
      </StyleRoot>
    );
    // React compiles to below code internally
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Some text here'));
  }
}

export default Radium(App);
