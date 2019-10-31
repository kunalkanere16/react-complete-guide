import React from 'react';

const authContext = React.createContext({
    //these are parameters in object format, can be a function
    authenticated: false,
    login: ()=>{}
});

export default authContext;