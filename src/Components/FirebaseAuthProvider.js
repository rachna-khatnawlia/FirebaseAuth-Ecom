//import liraries
import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import navigationStrings from '../navigation/navigationStrings';
import { useEffect } from 'react/cjs/react.production.min';

export const AuthContext = createContext();

// create a component
const FirebaeAuthPorvider = ({ children, navigation }) => {
    const [user, setUser] = useState(null);
    const [sentEmail, setSentEmail] = useState()
   
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                sentEmail,
                setSentEmail,

                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (error) {
                        alert(error.message)
                        console.log(error, "error occurred at auth proviider")
                    }
                },
                googleLogin: async () => {
                    try {
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential);
                    } catch (error) {
                        alert(error.message)
                        console.log(error)
                    }
                },
                fbLogin: async () => {
                    try {
                        // Attempt login with permissions
                        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

                        if (result.isCancelled) {
                            throw 'User cancelled the login process';
                        }

                        // Once signed in, get the users AccesToken
                        const data = await AccessToken.getCurrentAccessToken();

                        if (!data) {
                            throw 'Something went wrong obtaining access token';
                        }

                        // Create a Firebase credential with the AccessToken
                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(facebookCredential);
                    } catch (error) {
                        alert(error.message)
                        console.log(error);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch (error) {
                        alert(error.message)
                        console.log(error)
                    }
                },
                forgotPass: async (email) => {
                    try {
                        await auth().sendPasswordResetEmail(email);
                        setSentEmail(true)
                        alert("Password reset link sent!");
                    } catch (error) {
                        alert(error.message)
                        console.log(error)
                        setSentEmail(false)
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (error) {
                        alert(error.message)
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
