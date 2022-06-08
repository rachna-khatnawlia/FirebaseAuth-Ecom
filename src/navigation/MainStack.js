//import liraries
import React from 'react';
import { Home } from '../Screens';
import DrawerStack from './DrawerStack';
import navigationStrings from './navigationStrings';

// create a component
const MainStack = (Stack) => {
    return (
        <>
            <Stack.Screen name={navigationStrings.DRAWER} component={DrawerStack} options={{ headerShown: false }} />
        </>
    );
};

//make this component available to the app
export default MainStack;
