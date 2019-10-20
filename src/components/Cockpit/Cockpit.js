import React from 'react';
import classes from './Cockpit.css';

const cockpit = ( props ) => {

    const classesAssigned = [];
    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }

    if(props.persons.length<=2){
      classesAssigned.push(classes.red);
    }
    if(props.persons.length<=1){
      classesAssigned.push(classes.bold);
    }
    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={classesAssigned.join(' ')}>This is my first react page!!</p>
            {/*try not to use below style to call method with args */}
            <button className={btnClass}
            onClick={ props.clicked}>Toggle persons</button>
        </div>
    );
};

export default cockpit;