import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Icon from "@expo/vector-icons";
import { theme } from '../../constants';
import { firebase } from '../../config/firebase';
import * as Facebook from 'expo-facebook'; 
import * as Google from 'expo-google-app-auth';

import { 
    FACEBOOK_APP_ID,
    FACEBOOK_APP_NAME,
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
} from '@env';


export const LoginScreen = props => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const storeUserToDatabase = async(result) => {
        console.log('storeUserToDatabase() - writing new user to database...', result);
        await firebase
            .database()
            .ref('user/' + result.user.uid)
            .set({
                email: result.user.email,
                profilePicture: result.user.photoURL,
                firstName: result.user.displayName.split(' ')[0],
                displayName: result.user.displayName,
                createdDate: Date.now(),
                provider: result.user.providerData[0].providerId,
                isOnboarded: false,
                type: 'Fisherman',
                title: 'Newbie Angler'
            })
    }

    const updateLoginDate = async(result) => {
        console.log('updateLoginDate() - updating users last login to database...'. result);
        await firebase
                .database()
                .ref('user/' + result.user.uid)
                .update({
                    lastLoggedInDate: Date.now(),
                })
    }

    const onSignIn = (googleUser) => {
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            if (!isUserEqual(googleUser, firebaseUser)) {
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                firebase
                .auth().signInWithCredential(credential)
                .then((result)=> {
                    console.log('writing user', result.additionalUserInfo.isNewUser);
                    if(result.additionalUserInfo.isNewUser){
                        storeUserToDatabase(result);
                    }
                    else {
                        updateLoginDate(result);
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                    setErrorMessage(errorMessage);
                });
            } 
            else {
                console.log('User already signed-in Firebase.');
                setErrorMessage('User already signed-in Firebase.');
            }
        }).bind(this);
    }

    const isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.user.id) {
                    return true;
                }
            }
        }
        return false;
    }

    const signInWithGoogleAsync = async() => {
        try {
            // setErrorMessage('');
            const result = await Google.logInAsync({
                androidClientId: GOOGLE_ANDROID_CLIENT_ID,
                iosClientId: GOOGLE_IOS_CLIENT_ID,
                scopes: ['profile', 'email'],
            });
            if (result.type === 'success') {
                onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } 
        catch (e) {
            console.log('error', e);
            return { error: true };
            
        }
    } 

    const signInWithFacebookAsync = async() => {
        setErrorMessage('');
        const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs
        await Facebook.initializeAsync(FACEBOOK_APP_ID, FACEBOOK_APP_NAME);
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({ 
                permissions:[
                    'public_profile', 
                    'email',
                    'user_photos'
                ] },
            );
    
        if (type == 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            console.log('credential', credential, token);
            firebase.auth().signInWithCredential(credential)
                .then((result) => {
                    console.log('facebook login', result);
                    if(result.additionalUserInfo.isNewUser){
                        firebase
                        .database()
                        .ref('/user/' + result.user.uid)
                        .set({
                            email: result.additionalUserInfo.profile.email,
                            profilePicture: result.additionalUserInfo.profile.picture.data.url,
                            firstName: result.additionalUserInfo.profile.first_name,
                            displayName: result.additionalUserInfo.profile.name,
                            provider: result.user.providerData[0].providerId,
                            isOnboarded: false,
                            createdDate: Date.now(),
                            type: 'Fisherman'
                        })
                    }
                    else {
                        firebase
                        .database()
                        .ref('/user/' + result.user.uid)
                        .update({
                            last_logged_in: Date.now(),
                        })
                    }
                })
                .catch((error) => {
                    setErrorMessage(error+'');
                    console.log('error:', error)
                })
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{backgroundColor:theme.colors.white,height:"100%"}}>
            <ImageBackground 
                source ={require('../../assets/images/login.png')}
                style={{width:"100%",height:"100%"}}
            >
                <View style={{
                    paddingTop:theme.dimensions.height*0.5,
                }}>
                    <Text style={{
                        fontFamily:'Bold',
                        color:theme.colors.accent2,
                        fontSize: 40,
                        textAlign:'center',
                        marginTop:Platform.OS==='ios'?10:20,
                        marginBottom:50
                    }}>
                        FiSHiNGBUDDY
                    </Text>
                    {Platform.OS==='android' ? 
                        <TouchableOpacity
                            onPress={()=>signInWithFacebookAsync()}
                            style={{...styles.buttonWithIcon, backgroundColor: theme.colors.facebook}}
                        >
                            <Icon.AntDesign name="facebook-square" color={theme.colors.white} size={18} />
                            <Text style={styles.buttonText}>Sign in with Facebook </Text>
                        </TouchableOpacity>
                    
                    : null

                    }
                    
                    <TouchableOpacity
                        onPress={()=>signInWithGoogleAsync()}
                        style={{...styles.buttonWithIcon, backgroundColor:theme.colors.google}}
                    >
                        <Icon.AntDesign name="google" color={theme.colors.white} size={18} />
                        <Text style={styles.buttonText}>Sign in with Google </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=> props.navigation.navigate('LoginEmail') }
                        style={{...styles.buttonWithIcon, backgroundColor:theme.colors.accent2}}
                    >
                        <Icon.MaterialIcons name="email" color={theme.colors.black} size={18} />
                        <Text style={{...styles.buttonText, color:theme.colors.black}}>Sign in with Email </Text>
                    </TouchableOpacity>

                    { errorMessage ? (<View style={styles.errorContent}><Icon.MaterialIcons name={'error-outline'} color={theme.colors.accent2} size={20} /><Text style={styles.errorMessage}>{errorMessage} </Text></View> ): null }


                    <Text style={styles.termsAndAgreements}>
                        Terms and Agreements
                    </Text>
                </View>
                
            </ImageBackground>
        </KeyboardAvoidingView>
            
    )
}

const styles = StyleSheet.create({
    buttonWithIcon:{
        display:'flex',
        marginHorizontal:25,
        marginVertical:5,
        paddingVertical:15,
        paddingHorizontal:20,
        borderRadius:23,
        flexDirection:'row',
        alignItems:'center'
    },
    buttonText:{
        color:theme.colors.white,
        fontFamily:"Medium",
        fontSize:18,
        alignItems:'center',
        marginLeft:60
    },
    termsAndAgreements:{
        fontFamily:'Medium',
        color:theme.colors.accent2,
        fontSize: 10,
        textAlign:'center',
        marginTop:80,
        marginBottom:50
    },
    errorContent:{
        flexDirection:'row',
        marginHorizontal:45,
        marginVertical:10,
    },
    errorMessage:{
        color:theme.colors.accent2,
        fontFamily:'Medium',
        paddingLeft:5
    },
});