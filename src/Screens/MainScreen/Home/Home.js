//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import WrapperContainer from '../../../Components/WrapperContainer';

// create a component
const Home = () => {
    const { user, logout } = useContext(AuthContext)
    console.log(user)
    return (
        <WrapperContainer>
            <Text>Welcome {user?._user?.email}</Text>
            <TouchableOpacity onPress={() => logout()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default Home;
