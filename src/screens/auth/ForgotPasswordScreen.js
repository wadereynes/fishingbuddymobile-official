import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { theme } from '../../constants';
import { firebase } from '../../config/firebase';
import * as Icon from "@expo/vector-icons";

export const ForgotPasswordScreen = props => {
    const [email, setEmail] = useState();
    const [resultMessage, setResultMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    // const [success, setSuccess] = useState(false);

    const checkFields = () => {
        if (!Boolean(email)){
            setErrorMessage('Please enter a valid email');
        }
        else {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email) === false) {
                setErrorMessage('Please enter a valid email');
            }
            else {
                sendPasswordResetEmail();
            }
        }
    }

    const sendPasswordResetEmail = async() => {
        await firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(result => {
                setErrorMessage('');
                setResultMessage('A password reset request has been sent.');
            })
            .catch(error => {
                setResultMessage('');
                console.log('An error has happened', error);
                setErrorMessage('An error has occurred. Please check if the input is correct.');
            })
    }

    return(
        <KeyboardAvoidingView behavior={"position"} style={{backgroundColor:theme.colors.primary,height:"100%"}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{backgroundColor:theme.colors.accent2, height:"100%"}}>
                    <ImageBackground 
                        source ={require('../../assets/images/login.png')}
                        style={{width:"100%",height:"100%"}}
                    >
                        <View style={{
                            paddingTop:theme.dimensions.height*0.5,
                        }}>
                            <Text style={styles.logo}>
                                Forgot Password
                            </Text>
                            <View style={!errorMessage ? styles.inputViewValid : styles.inputViewInvalid}>
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
                                    selectionColor={theme.colors.white}
                                    value={email}
                                    onChangeText={email => setEmail(email)}
                                />
                                
                            </View>

                            { errorMessage ? (<View style={styles.errorContent}><Icon.MaterialIcons name={'error-outline'} color={theme.colors.accent2} size={20} /><Text style={styles.errorMessage}>{errorMessage} </Text></View> ): null }
                            { resultMessage ? (<View style={styles.errorContent}><Icon.MaterialIcons name={'send'} color={theme.colors.accent2} size={20} /><Text style={styles.errorMessage}>{resultMessage} </Text></View> ): null }


                            <View style={styles.footer}>
                                <TouchableOpacity
                                    onPress={()=> checkFields() }
                                    style={{...styles.buttonWithIcon, backgroundColor:theme.colors.accent2}}
                                >
                                    <Text style={{...styles.buttonText, color:theme.colors.black}}>Recover Account</Text>
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