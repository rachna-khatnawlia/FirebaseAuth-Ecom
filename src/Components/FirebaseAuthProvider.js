//import liraries
import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import navigationStrings from '../navigation/navigationStrings';
import { showMessage } from 'react-native-flash-message';

export const AuthContext = createContext();

// create a component
const FirebaeAuthPorvider = ({ children, navigation }) => {
    const [user, setUser] = useState(null);
    const [sentEmail, setSentEmail] = useState()
    const [confirm, setConfirm] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user, setUser,
                sentEmail, setSentEmail,
                confirm, setConfirm,

                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password).then(() => {
                            showMessage({
                                message: "Login Successfull",
                                type: "info",
                            })
                        });

                    } catch (error) {
                        showMessage({
                            message: error.message,
                            type: "danger",
                        })
                        console.log(error, "error occurred at auth proviider")
                    }
                },
                phoneLogin: async (countryCode, phoneNum) => {
                    const no = (countryCode + phoneNum);
                    let phone = `+${(no.toString())}`
                    console.log(phone)
                    try {
                        const confirmation = await auth().signInWithPhoneNumber(phone);
                        setConfirm(confirmation);
                        console.log(confirm)
                        alert("otp sent")

                    } catch (error) {
                        showMessage({
                            message: error.message,
                            type: "danger",
                        })
                        console.log(error, "error occurred at auth proviider")
                    }
                },
                confirmCode: async (phone) => {
                    try {
                        await confirm.confirm(code);
                      } catch (error) {
                        console.log('Invalid code.');
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
                        showMessage({
                            message: error.message,
                            type: "danger",
                        })
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
                        showMessage({
                            message: error.message,
                            type: "danger",
                        })
                        console.log(error);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch (error) {
                        showMessage({
                            message: error.message,
                            type: "danger",
                        })
                        console.log(error)
                    }
                },
                forgotPass: async (email) => {
                    try {
                        await auth().sendPasswordResetEmail(email)
                            .then(() => {
                                alert("Password reset link sent!")
                                navigation.navigate(navigationStrings.LOGIN)
                                setSentEmail(true)
                            });

                    } catch (error) {
                        showMessage({
                            message: error.message,
                            type: "danger",
                        })
                        console.log(error)
                        setSentEmail(false)
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (error) {
                        showMessage({
                            message: error.message,
                            type: "danger",
                        })
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
