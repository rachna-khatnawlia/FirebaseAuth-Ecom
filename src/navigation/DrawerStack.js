//import liraries
import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AdminHome, Home, Settings } from '../Screens';
import navigationStrings from './navigationStrings';
import { CustomDrawer } from '../Components/CustomDrawer';
import TabStack from './TabStack';

const Drawer = createDrawerNavigator();

// create a component
const DrawerStack = (Stack) => {
    return (
        <>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer{...props} />}
                initialRouteName={navigationStrings.HOME}
            >
                <Drawer.Screen name={navigationStrings.TAB} component={TabStack} options={{headerShown:false}}/>
            </Drawer.Navigator>

        </>
    );
};

//make this component available to the app
export default DrawerStack;
