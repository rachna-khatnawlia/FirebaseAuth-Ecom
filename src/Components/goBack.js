//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import imagePath from '../constants/imagePath';
import { moderateScale, width } from '../styles/responsiveSize';

// create a component
const GoBack = () => {
    console.log(width);
    const navigation = useNavigation();
    const _goBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={_goBack}>
                <Image source={imagePath.backwardArrow} style={styles.arrow} />
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: moderateScale(15)

    },
    arrow: {
        height: width / 16,
        width: width / 16,
        opacity: 0.8
    }
});

//make this component available to the app
export default GoBack;
