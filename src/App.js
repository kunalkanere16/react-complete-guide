import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      //cannot use class as it is reserved word in JS
      // all below tags are JSX which are compiled into HTML
      <div className="App"> 
        <h1>Hello React World</h1>
        <p>This is my first react page!!</p>
        <Person name="Kunal" age="31" />
        <Person name="Karen" age="25"/>
        <Person name="Mayur" age="35" >I am the eldest!!</Person>
      </div>
    );
    // React compiles to below code internally
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Some text here'));
  }
}

export default App;
