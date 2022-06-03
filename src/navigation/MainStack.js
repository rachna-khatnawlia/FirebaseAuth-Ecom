//import liraries
import React from 'react';
import { Home } from '../Screens';
import navigationStrings from './navigationStrings';

// create a component
const MainStack = (Stack) => {
    return (
       <>
        <Stack.Screen name={navigationStrings.HOME} component={Home}/>
       </>
    );
};

//make this component available to the app
export default MainStack;
