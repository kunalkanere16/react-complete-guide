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

  switchNameHandler = () => {
    //console.log('was clicked!!');
    //DON'T DO THIS: this.state.persons[0].name = 'Kanere';
    this.setState({
      persons : [
        {name : 'Karen Mansukhani', age : 18},
        {name : 'Kunal', age : 31},
        {name : 'Mayur', age : 32}
      ]
    });
  }
  render() {
    return (
      //cannot use class as it is reserved word in JS
      // all below tags are JSX which are compiled into HTML
      <div className="App"> 
        <h1>Hello React World</h1>
        <p>This is my first react page!!</p>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}/>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} >I am the eldest!!</Person>
      </div>
    );
    // React compiles to below code internally
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Some text here'));
  }
}

export default App;
