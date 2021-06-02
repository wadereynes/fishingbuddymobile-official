import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { theme } from '../../constants';
import { firebase } from '../../config/firebase';
import * as Icon from "@expo/vector-icons";

export const LoginEmailScreen = props => {
    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorCode, setErrorCode] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const handlePasswordVisibility = () => {
        if(rightIcon === 'eye'){
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        }
        else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    }

    const signInWithEmail = async() => {
        console.log('Logging in using', email, password);
        
        if(!Boolean(email)){
            setErrorMessage('Please enter a valid email');
            setErrorCode('auth/empty-email');
        } else if(!Boolean(password)){
            setErrorMessage('Please enter a password');
            setErrorCode('auth/empty-password');
        }
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                if(!result.additionalUserInfo.isNewUser){
                    firebase
                    .database()
                    .ref('/user/' + result.user.uid)
                    .update({
                        last_logged_in: Date.now()
                    })
                }
            })
            .catch(error => {
                let errorCode = error.code;
                setErrorCode(errorCode);
                let errorMessage = error.message;
                setErrorMessage(error.message);
                if(errorCode === 'auth/user-not-found' || errorCode === 'auth/empty-credentials') {
                    setErrorMessage('Invalid Login!');
                }
            });
    }

    const errorMessageStyle = (textInput) => {
        console.log('textInput', textInput, '   errorCode', errorCode);
        if((errorCode === 'auth/invalid-email' || errorCode === 'auth/empty-email') && textInput === 'email') {
            return styles.inputViewInvalid;
        }
        else if((errorCode === 'auth/wrong-password' || errorCode === 'auth/empty-password') && textInput === 'password') {
            return styles.inputViewInvalid;
        }
        else if(errorCode === 'auth/user-not-found' || errorCode === 'auth/empty-credentials') {
            return styles.inputViewInvalid;
        }
        else {
            return styles.inputViewValid;
        }
    }

    const handleInput = (input, type) => {
        if(type === 'email'){
            if(input){
                setEmail(input);
                setErrorCode(null);
                setErrorMessage(null);
            }
            else {
                setEmail(input);
                setErrorCode('auth/empty-email');
                setErrorMessage('Email field cannot be empty');
            }
        }
        else if(type === 'password'){
            if(input){
                setPassword(input);
                setErrorCode(null);
                setErrorMessage(null);
            }
            else {
                setPassword(input);
                setErrorCode('auth/empty-password');
                setErrorMessage('Password field cannot be empty');
            }
        }
    }

    const handlePasswordInput = (password) => {

    }

    return(
        <KeyboardAvoidingView behavior={"position"} style={{backgroundColor:theme.colors.primary,height:"100%"}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground 
                    source ={require('../../assets/images/login.png')}
                    style={{width:"100%",height:"100%"}}
                >
                    <View style={{
                        paddingTop:theme.dimensions.height*0.5,
                    }}>
                        <Text style={styles.logo}> Login </Text>

                        <View style={!errorCode ? styles.inputViewValid : errorMessageStyle('email')}>
                            <Icon.MaterialIcons name={'email'} color={theme.colors.white} size={20} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Email'}
                                placeholderTextColor={theme.colors.gray2}
                                textContentType={'emailAddress'}
                                keyboardType='default'
                                autoCapitalize='none'
                                spellCheck={false}
                                autoCorrect={false}
                                selectionColor={'rgba(255, 255, 255, 0.3)'}
                                value={email}
                                onChangeText={email => handleInput(email, 'email')}
                            />
                            
                        </View>
                        
                        <View style={!errorCode ? styles.inputViewValid : errorMessageStyle('password')}>
                            <Icon.FontAwesome name="lock" color={theme.colors.white} size={20} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Password'}
                                placeholderTextColor={theme.colors.gray2}
                                textContentType='password'
                                keyboardType='default'
                                autoCapitalize='none'
                                selectionColor={'rgba(255, 255, 255, 0.3)'}
                                secureTextEntry={passwordVisibility}
                                value={password}
                                onChangeText={password => handleInput(password, 'password')}
                            />
                            <TouchableOpacity 
                                style={{padding:4}}
                                onPress={handlePasswordVisibility}
                            >
                                <Icon.MaterialCommunityIcons name={rightIcon} color={theme.colors.white} size={20} />
                            </TouchableOpacity>
                        </View>
                        { errorMessage ? (<View style={styles.errorContent}><Icon.MaterialIcons name={'error-outline'} color={theme.colors.accent2} size={20} /><Text style={styles.errorMessage}>{errorMessage} </Text></View> ): null }
                        
                        <View style={styles.footer}>
                            <TouchableOpacity
                                onPress={()=> signInWithEmail()}
                                style={{...styles.buttonWithIcon, backgroundColor:theme.colors.accent2}}
                            >
                                <Text style={{...styles.buttonText, color:theme.colors.black}}>Login</Text>
                            </TouchableOpacity>
                            <View style={styles.footerActions}>
                                
                                <TouchableOpacity onPress={()=>props.navigation.navigate('Register')}>
                                    <Text style={styles.action}>
                                        New User? <Text style={{fontFamily:'Bold'}}>Register</Text>
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.action}>
                                        |
                                    </Text>
                                <TouchableOpacity onPress={()=>props.navigation.navigate('ForgotPassword')}>
                                    <Text style={styles.action}>
                                        Forgot Password
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logo:{
        fontFamily:'Bold',
        color:theme.colors.accent2,
        fontSize: 30,
        marginTop:Platform.OS==='ios'?15:25,
        marginBottom:20,
        textAlign:'center',
    },
    inputViewValid:{
        height:44,
        backgroundColor: '#036db9',
        borderRadius:23,
        paddingHorizontal:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        marginHorizontal:25,
        marginVertical:3,
    },
    inputViewInvalid:{
        height:44,
        backgroundColor: '#036db9',
        borderRadius:23,
        paddingHorizontal:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        marginHorizontal:25,
        marginVertical:3,
        borderWidth:3,
        borderColor:'#ff0046',
    },
    textInput:{
        flex:1,
        paddingHorizontal:12,
        fontFamily:'Bold',
        color:theme.colors.white,
    },
    buttonWithIcon:{
        display:'flex',
        marginHorizontal:25,
        marginVertical:10,
        paddingVertical:15,
        paddingHorizontal:20,
        borderRadius:23,
        flexDirection:'row',
        justifyContent: "center",
    },
    buttonText:{
        color:theme.colors.white,
        fontFamily:"Medium",
        fontSize:18,
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
    footer:{
        justifyContent: 'flex-end',
        marginTop:20,
    },
    footerActions:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: "center",
    },
    action:{
        fontFamily:'Regular',
        color:theme.colors.accent2,
        fontSize: 16,
        textAlign:'center',
        // textDecorationLine:'underline',
        marginHorizontal:10
    },
});