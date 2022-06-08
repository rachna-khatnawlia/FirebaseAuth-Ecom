//import liraries
import React, { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import FirebaeAuthPorvider from './src/Components/FirebaseAuthProvider';
import Routes from './src/navigation/Routes';


// create a component
const App = () => {

  return (
    <>
      <FirebaeAuthPorvider>
        <FlashMessage position="top" />
        <Routes />
      </FirebaeAuthPorvider>

    </>
  );
};

export default App;
