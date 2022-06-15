//import liraries
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import FirebaeAuthPorvider from './src/Components/FirebaseAuthProvider';
import Routes from './src/navigation/Routes';
import SplashScreen from 'react-native-splash-screen';


// create a component
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, [])
  return (
    <>
      <FirebaeAuthPorvider>
        <Routes />
        <FlashMessage position="top" />
      </FirebaeAuthPorvider>

    </>
  );
};

export default App;
