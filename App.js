//import liraries
import React, { Component } from 'react';
import FirebaeAuthPorvider from './src/Components/FirebaseAuthProvider';
import Routes from './src/navigation/Routes';

// create a component
const App = () => {
  return (
    <>
      <FirebaeAuthPorvider>
        <Routes />
      </FirebaeAuthPorvider>

    </>
  );
};

export default App;
