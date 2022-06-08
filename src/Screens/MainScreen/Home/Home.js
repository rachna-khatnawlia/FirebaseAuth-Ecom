//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import { moderateScale, width } from '../../../styles/responsiveSize';

// create a component
const Home = ({ navigation }) => {
    const { user } = useContext(AuthContext)
    console.log(user)
    console.log(navigation);
    return (
        <WrapperContainer>
            <View style={{ flexDirection: 'row',paddingHorizontal:moderateScale(15)}}>
                <TouchableOpacity
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Image source={imagePath.listDrawer} style={styles.listIcon} />
                </TouchableOpacity>
            </View>
            <View>
                <Text>Welcome {user?._user?.email}</Text>
         
            </View>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    listIcon: {
        height: width / 11,
        width: width / 11,
    }

});

//make this component available to the app
export default Home;
