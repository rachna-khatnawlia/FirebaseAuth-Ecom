//import liraries
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image } from 'react-native';
import navigationStrings from './navigationStrings';
import { Cart, Home } from '../Screens';
import { moderateScale, textScale, width } from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';

const Tab = createBottomTabNavigator();

// create a component
const TabStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: moderateScale(80),
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    borderColor: 'black',
                },
                tabBarLabelStyle: {
                    fontSize: textScale(11),
                    fontWeight: '600'
                },
            })}
        >
            <Tab.Screen name={navigationStrings.HOME} component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={imagePath.home}
                            style={[style.tabIcon, { tintColor: focused ? 'black' : 'grey' }]}
                        />
                    ),
                }}
            />
            <Tab.Screen name={navigationStrings.CART} component={Cart}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={imagePath.cart}
                            style={[style.tabIcon, { tintColor: focused ? 'black' : 'grey' }]}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const style = StyleSheet.create({
    tabIcon: {
        height: moderateScale(width / 18),
        width: moderateScale(width / 18),
        resizeMode: 'contain',
        marginTop: moderateScale(8),
    },
});
export default TabStack;
