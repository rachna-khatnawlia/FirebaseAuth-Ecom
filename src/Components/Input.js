//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { moderateScale, moderateScaleVertical, width } from '../styles/responsiveSize';

// create a component
const Input = ({
    placeholder,
    pass,
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                style={styles.textInput}
                secureTextEntry={pass}
            />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 0.8,
        flexDirection: 'row',
        width: width - 30,
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScaleVertical(12),
        marginVertical: moderateScaleVertical(10)
    }
});

//make this component available to the app
export default Input;
