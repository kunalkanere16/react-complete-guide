import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons : [
      {name : 'Karen', age : 18},
      {name : 'Kunal', age : 25},
      {name : 'Mayur', age : 32}
    ],
    profession: 'something'
  }

  switchNameHandler = (newName) => {
    //console.log('was clicked!!');
    //DON'T DO THIS: this.state.persons[0].name = 'Kanere';
    this.setState({
      persons : [
        {name : newName, age : 18},
        {name : 'Kunal', age : 31},
        {name : 'Mayur', age : 32}
      ],
      showPersons: false
    });
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons : [
        {name : 'Karen', age : 18},
        {name : event.target.value, age : 31},
        {name : 'Mayur', age : 32}
      ]
    });
  }

  togglePersons = () =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons : !doesShow});
  }

  render() {
    const style =  {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    return (
      //cannot use class as it is reserved word in JS
      // all below tags are JSX which are compiled into HTML
      <div className="App"> 
        <h1>Hello React World</h1>
        <p>This is my first react page!!</p>
        {/*try not to use below style to call method with args */}
        <button 
          style={style}
          onClick={ this.togglePersons}>Toggle persons</button>
        {
          this.state.showPersons === true ? 
          <div>
            <Person 
              name={this.state.persons[0].name} 
              age={this.state.persons[0].age} />
            <Person 
              name={this.state.persons[1].name} 
              age={this.state.persons[1].age}
              click={this.switchNameHandler.bind(this, 'Mrs Karen Kanere')}
              changed={this.nameChangedHandler} />
            <Person 
              name={this.state.persons[2].name} 
              age={this.state.persons[2].age} >I am the eldest!!</Person>
          </div> : null
        }
        
      </div>
    );
    // React compiles to below code internally
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Some text here'));
  }
}

export default App;
