//import liraries
import React, { useEffect } from 'react';
import FirebaeAuthPorvider from './src/Components/FirebaseAuthProvider';
import Routes from './src/navigation/Routes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// create a component
const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
        webClientId: '294493462688-h97ofossathphrdfur493t02q1vut65l.apps.googleusercontent.com',
    });
}, [])
  return (
    <>
      <FirebaeAuthPorvider>
        <Routes />
      </FirebaeAuthPorvider>

    </>
  );
};

export default App;
