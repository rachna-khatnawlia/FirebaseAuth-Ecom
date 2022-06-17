//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../navigation/navigationStrings';
import { moderateScale, width } from '../../../styles/responsiveSize';

// create a component
const Home = ({ navigation }) => {
    return (
        <WrapperContainer>
            <View>
                <Text>Welcome Admin</Text>

                <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.UPLOAD_NEW_PRODUCT)}>
                    <Text>Upload Product</Text>
                </TouchableOpacity>
            </View>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({


});

//make this component available to the app
export default Home;
