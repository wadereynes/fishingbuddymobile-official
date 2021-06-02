import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { theme } from '../../constants';
import { firebase } from '../../config/firebase';
import Toast from 'react-native-toast-message'
import * as Icon from "@expo/vector-icons";


export const RegisterScreen = props => {
    const [loginError, setLoginError] = useState('');
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [repeatPasswordVisibility, setRepeatPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [repeatRightIcon, setRepeatRightIcon] = useState('eye');

    const handlePasswordVisibility = (field) => {
        if(field === 'password'){
            if(rightIcon === 'eye'){
                setRightIcon('eye-off');
                setPasswordVisibility(!passwordVisibility);
            }
            else if (rightIcon === 'eye-off') {
                setRightIcon('eye');
                setPasswordVisibility(!passwordVisibility);
            }
        }
        else if (field === 'repeatPassword'){
            if(repeatRightIcon === 'eye'){
                setRepeatRightIcon('eye-off');
                setRepeatPasswordVisibility(!repeatPasswordVisibility);
            }
            else if (repeatRightIcon === 'eye-off') {
                setRepeatRightIcon('eye');
                setRepeatPasswordVisibility(!repeatPasswordVisibility);
            }
        }
    }

    const registerWithEmail = async() => {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                if(result.additionalUserInfo.isNewUser){
                    firebase
                    .database()
                    .ref('/user/' + result.user.uid)
                    .set({
                        email: result.user.email,
                        profilePicture: 'https://firebasestorage.googleapis.com/v0/b/fishingbuddy-web.appspot.com/o/images%2Ffisherman-default-avatar.png?alt=media&token=11c78640-2cdb-4ebf-bdad-a820231e629a',
                        createdDate: Date.now(),
                        provider: result.user.providerData[0].providerId,
                        isOnboarded: false,
                        firstName: '-',
                        type: 'Fisherman'
                    })
                    Toast.show({
                        text1: 'Please verify your account via email',
                        position: 'bottom',
                        bottomOffset: theme.dimensions.height * 0.1,
                        type: 'success',
                    })
                    props.navigation.navigate('LoginEmail');
                }
                else {
                    firebase
                    .database()
                    .ref('/user/' + result.user.uid)
                    .update({
                        lastLoggedInDate: Date.now(),
                    })
                }
            })
            .catch(error => {
                let errorCode = error.code;
                let errorMessage = error.message;
                setErrorMessage(errorMessage);
                console.log(errorCode, errorMessage);
            })
    }

    return(
        <KeyboardAvoidingView behavior={"position"} style={{backgroundColor:theme.colors.primary, height:"100%"}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{backgroundColor:theme.colors.white,height:"100%"}}>
                    <ImageBackground 
                        source ={require('../../assets/images/login.png')}
                        style={{width:"100%",height:"100%"}}
                    >
                        <View style={{
                            paddingTop:theme.dimensions.height*0.5,
                        }}>
                            <Text style={styles.logo}>
                                Register
                            </Text>
                            
                            <View style={styles.inputView}>
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
                                    onChangeText={email => setEmail(email)}
                                />
                            </View>
                            <View style={styles.inputView}>
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
                                    onChangeText={password => setPassword(password)}
                                />
                                <TouchableOpacity 
                                    style={{padding:4}}
                                    onPress={()=>handlePasswordVisibility('password')}
                                >
                                    <Icon.MaterialCommunityIcons name={rightIcon} color={theme.colors.white} size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputView}>
                                <Icon.FontAwesome name="lock" color={theme.colors.white} size={20} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'Repeat Password'}
                                    placeholderTextColor={theme.colors.gray2}
                                    textContentType='password'
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    selectionColor={'rgba(255, 255, 255, 0.3)'}
                                    secureTextEntry={repeatPasswordVisibility}
                                    value={repeatPassword}
                                    onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
                                />
                                <TouchableOpacity 
                                    style={{padding:4}}
                                    onPress={()=>handlePasswordVisibility('repeatPassword')}
                                >
                                    <Icon.MaterialCommunityIcons name={repeatRightIcon} color={theme.colors.white} size={20} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.footer}>
                                <TouchableOpacity
                                    onPress={()=> {registerWithEmail()} }
                                    style={{...styles.buttonWithIcon, backgroundColor:theme.colors.accent2}}
                                >
                                    <Text style={{...styles.buttonText, color:theme.colors.black}}>Register Account</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>props.navigation.navigate('LoginEmail')}>
                                    <Text style={styles.action}>
                                        Already have an account? <Text style={{fontFamily:'Bold'}}>Login</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                            
                        </View>
                        
                    </ImageBackground>
                </View>
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
    inputView:{
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
    textInput:{
        flex:1,
        paddingHorizontal:12,
        fontFamily:'Bold',
        color:theme.colors.white,
    },
    buttonWithIcon:{
        display:'flex',
        marginHorizontal:30,
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