import React, {useEffect} from 'react';
import classes from './Cockpit.css';

const cockpit = ( props ) => {
  //pass function to useEffect
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // this is componentDidMount and componentDidUpdate in one effect
    //eg: Http request
    const timer = setTimeout(() =>{
      alert('Saved data to cloud!');
    }, 1000);
    return () => {
      clearTimeout(timer);
      //this runs when component is destroyed as empty array is passed to useEffect
      console.log('[Cockpit.js] cleanup work in useEffect')
    };
  }, []); // empty array for mount only, props.component_name for component update only

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      // no last argument to useEffect will trigger cleanup on every update cycle
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    };
  }); 

  const classesAssigned = [];
  let btnClass = '';
  if(props.showPersons){
      btnClass = classes.Red;
  }

  if(props.personsLength<=2){
    classesAssigned.push(classes.red);
  }
  if(props.personsLength<=1){
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

export default React.memo(cockpit);