//import liraries
import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();

// create a component
const FirebaeAuthPorvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (error) {
                        console.log(error, "error occurred at auth proviider")
                    }
                },
                googleLogin: async () => {
                    // Get the users ID token
                    const { idToken } = await GoogleSignin.signIn();

                    // Create a Google credential with the token
                    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                    // Sign-in the user with the credential
                    return auth().signInWithCredential(googleCredential);
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch (error) {
                        console.log(error)
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (error) {
                        console.log(error)
                    }
                }

            }}>

            {children}
        </AuthContext.Provider>
    );
};


//make this component available to the app
export default FirebaeAuthPorvider;
