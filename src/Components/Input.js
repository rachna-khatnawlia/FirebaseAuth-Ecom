//import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { moderateScale, moderateScaleVertical, textScale, width } from '../styles/responsiveSize';

// create a component
const Input = ({
    placeholder,
    pass,
    value,
    onChangeText
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                style={styles.textInput}
                secureTextEntry={pass}
                value={value}
                onChangeText={onChangeText}
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
        borderWidth: 1.5,
        flexDirection: 'row',
        width: "100%",
        borderRadius:moderateScale(5),
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScaleVertical(15),
        marginVertical: moderateScaleVertical(10),
        fontSize:textScale(13.5)
    }
});

//make this component available to the app
export default Input;
