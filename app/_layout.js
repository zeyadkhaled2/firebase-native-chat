import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from '../context/authContext';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core',
  'Firebase: Error (auth/network-request-failed)'
]);

const MainLayout = () => {
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if(typeof isAuthenticated === 'undefined') return;
        
        const inApp = segments[0] == "(app)";
        if(isAuthenticated && !inApp) {
            // Redirect to home
            router.replace('home');
        }else if(!isAuthenticated ) {
            // Redirect to sign in
            // router replace will replace the current route with the new one so there is no back button
            router.replace('signIn');
        };
    }, [isAuthenticated]); 

    return <Slot />;
}


export default function RootLayout() {
    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>  
    );
}
