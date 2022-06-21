//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../navigation/navigationStrings';
import { moderateScale, moderateScaleVertical, textScale, width } from '../../../styles/responsiveSize';

// create a component
const Home = ({ navigation }) => {
    return (
        <WrapperContainer>
            <View>
                <Text>Welcome Admin</Text>

                <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.UPLOAD_NEW_PRODUCT)}>
                    <Text style={styles.listItem}>Upload Product</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.UPLOAD_CATEGORY)}>
                    <Text style={styles.listItem}>Upload Category</Text>
                </TouchableOpacity>
            </View>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    listItem:{
        textAlign:'center',
        fontSize:textScale(18),
        color:'pink',
        fontWeight:'bold',
        marginVertical:moderateScaleVertical(6)
    }

});

//make this component available to the app
export default Home;
