//import liraries
import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

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
                    try {

                        const { idToken } = await GoogleSignin.signIn();
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                        await auth().signInWithCredential(googleCredential);
                    } catch (error) {
                        console.log("error in goolge login")

                    }
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
