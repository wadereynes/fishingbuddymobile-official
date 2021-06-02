import React, { useState } from 'react';
import { View, Button, StyleSheet, Image, Alert, StatusBar,Text } from 'react-native';
import { Input, Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';
// import InputOnboarding from './InputOnboarding';
import { firebase } from '../../config/firebase';
import { theme } from '../../constants';
import { LocationListModal } from '../../components/profile/LocationListModal';


export const OnboardingScreen = props => {
    const [selectedTackleshopOwner, setSelectedTackleshopOwner] = useState(false);
    const [selectedFisherman, setSelectedFisherman] = useState(false);
    const [selectedFishingHobbyist, setSelectedFishingHobbyist] = useState(false);
    const [selectedConsumer, setSelectedConsumer] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    
    const userTypes = ['Tackle shop Owner', 'Fisherman', 'Hobbyist', 'Consumer' ];

    const [showLocationListHome, setShowLocationListHome] = useState(false);
    const [showLocationListStore, setShowLocationListStore] = useState(false);

    const completeOnboarding = async() => {
        
        await updateOnboardingStatus();
        props.navigation.replace('Bottom');
    }

    const updateOnboardingStatus = async() => {
        console.log('updating isOnboarded status', firstName);
        await firebase
            .database()
            .ref('/user/' + firebase.auth().currentUser.uid)
            .update({
                isOnboarded: true,
                firstName: firstName,
                homeAddress: homeAddress,
                storeAddress: storeAddress,
                contactNumber: contactNumber,
                type: selectedTackleshopOwner ? userTypes[0]
                        : selectedFisherman ? userTypes[1]
                        : selectedFishingHobbyist ? userTypes[2]
                        : selectedConsumer ? userTypes[3]
                        : userTypes[3],
            })
            .then(console.log('update complete'))
    }

    const getCredential = (currentUser) => {
        console.log(currentUser);
    }

    const UserType = () =>{

        return(
            <View style={{ marginVertical: 50, alignItems:'center' }}>
                <Image source={require('../../assets/images/illustration_1.png')} style={{ width:150, height:'25%',}} />
                <Text style={{ fontFamily:'Bold', fontSize: 20, marginBottom: 20 }}>Do you want to...?</Text>

                <TouchableOpacity
                    style={ selectedConsumer ? styles.userPreferenceSelectedBtn : styles.userPreferenceBtn }
                    onPress={() => {
                        setSelectedConsumer(!selectedConsumer)
                        setSelectedFisherman(false)
                        setSelectedTackleshopOwner(false)
                        setSelectedFishingHobbyist(false)
                        }}
                >
                    <Text style={  selectedConsumer ? styles.userPreferenceSelectedTxt : styles.userPreferenceTxt  }>Get the best seafood near you</Text>
                    <Text style={{ fontFamily:'Bold', color: theme.colors.gray2 }}>(Consumer)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={ selectedTackleshopOwner ? styles.userPreferenceSelectedBtn : styles.userPreferenceBtn }
                    onPress={() => {
                        setSelectedTackleshopOwner(!selectedTackleshopOwner)
                        setSelectedFisherman(false)
                        setSelectedFishingHobbyist(false)
                        setSelectedConsumer(false)
                        }}
                >
                    <Text style={selectedTackleshopOwner ? styles.userPreferenceSelectedTxt : styles.userPreferenceTxt }>Sell Fishing Gear</Text>
                    <Text style={{ fontFamily:'Bold', color: theme.colors.gray2 }}>(Tackle shop owner)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={ selectedFisherman ? styles.userPreferenceSelectedBtn : styles.userPreferenceBtn }
                    onPress={() => {
                        setSelectedFisherman(!selectedFisherman)
                        setSelectedTackleshopOwner(false)
                        setSelectedFishingHobbyist(false)
                        setSelectedConsumer(false)
                        }}
                >
                    <Text style={ selectedFisherman ? styles.userPreferenceSelectedTxt : styles.userPreferenceTxt }>Earn by selling Fresh Catch</Text>
                    <Text style={{ fontFamily:'Bold', color: theme.colors.gray2 }}>(Fisherman)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={ selectedFishingHobbyist ? styles.userPreferenceSelectedBtn : styles.userPreferenceBtn }
                    onPress={ () => {
                        setSelectedFishingHobbyist(!selectedFishingHobbyist)
                        setSelectedFisherman(false)
                        setSelectedTackleshopOwner(false)
                        setSelectedConsumer(false)
                        }}
                >
                    <Text style={ selectedFishingHobbyist ? styles.userPreferenceSelectedTxt : styles.userPreferenceTxt }>Find the best fishing gear</Text>
                    <Text style={{ fontFamily:'Bold', color: theme.colors.gray2 }}>(Fishing Hobbyist)</Text>
                </TouchableOpacity>

                
            </View>
        )
    }

    const UserInfoName = () => {
        return(
            <View style={{ marginVertical: 50, alignItems:'center', width: theme.dimensions.width * 0.7 }}>
                <Image source={require('../../assets/images/illustration_1.png')} style={{ width:150, height:'25%',}} />
                <Text style={{ fontFamily:'Bold', fontSize: 20, marginBottom: 20 }}>What is your name?</Text>
                
                <Input
                    style={styles.textInput}
                    placeholder={'Your name here'}
                    placeholderTextColor={theme.colors.gray2}
                    textContentType={'none'}
                    keyboardType='default'
                    autoCapitalize='none'
                    spellCheck={false}
                    autoCorrect={false}
                    selectionColor={'rgba(0, 93, 160, 0.5)'}
                    value={firstName}
                    onChangeText={firstName => setFirstName(firstName)}
                />
            </View>
        )
    }
    
    const UserInfoAddress = () => {
        return(
            <View style={{ marginVertical: 50, alignItems:'center', width: theme.dimensions.width * 0.7 }}>
                <Image source={require('../../assets/images/illustration_1.png')} style={{ width:150, height:'25%',}} />
                <Text style={{ fontFamily:'Bold', fontSize: 20, marginBottom: 20 }}>Where are you located?</Text>
                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10}}>
                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => setShowLocationListHome(true)}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '100%', flexDirection:'row', paddingLeft: 5 }}>
                                <Text style={{ fontFamily:'Medium', fontSize: 16}}>{ homeAddress ? homeAddress.city ? homeAddress.city : homeAddress : null}</Text>
                            </View>
                        </View> 
                        <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                    </TouchableOpacity>
                </View>
                {
                    showLocationListHome ?
                        <LocationListModal 
                            isVisible={true} 
                            locationSelected={setHomeAddress} 
                            hideLocationModal={setShowLocationListHome}
                        />
                    : null
                }
                {
                    ( selectedFisherman || selectedTackleshopOwner ) ? 
                    <View>
                        <Text style={{ fontFamily:'Bold', fontSize: 18, marginTop: 20 }}>How about your store address?</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10}}>
                            <TouchableOpacity style={{ marginVertical: 10}} onPress={() => setShowLocationListStore(true)}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '100%', flexDirection:'row', paddingLeft: 5 }}>
                                        <Text style={{ fontFamily:'Medium', fontSize: 16}}>{ storeAddress ? storeAddress.city ? storeAddress.city : storeAddress : null}</Text>
                                    </View>
                                </View> 
                                <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                            </TouchableOpacity>
                        </View>
                        {
                            showLocationListStore ?
                                <LocationListModal 
                                    isVisible={true} 
                                    locationSelected={setStoreAddress} 
                                    hideLocationModal={setShowLocationListStore}
                                />
                            : null
                        }
                    </View>
                
                    : null
                }
                
            </View>
        )
    }

    const UserInfoContact = () => {
        return(
            <View style={{ marginVertical: 50, alignItems:'center', width: theme.dimensions.width * 0.7 }}>
                <Image source={require('../../assets/images/illustration_1.png')} style={{ width:150, height:'25%',}} />
                <Text style={{ fontFamily:'Bold', fontSize: 20, marginBottom: 20 }}>What is your contact info?</Text>
                <Input
                    style={styles.textInput}
                    placeholder={'Contact Number'}
                    placeholderTextColor={theme.colors.gray2}
                    textContentType={'none'}
                    keyboardType='phone-pad'
                    autoCapitalize='none'
                    spellCheck={false}
                    autoCorrect={false}
                    selectionColor={'rgba(0, 93, 160, 0.5)'}
                    value={contactNumber}
                    onChangeText={contactNumber => setContactNumber(contactNumber)}
                />
                {/* <Text>Contact:{contactNumber}</Text> */}
            </View>
        )
    }

    return(
        <Onboarding
            onDone = {completeOnboarding}
            bottomBarColor={theme.colors.white} 
            titleStyles={styles.title}
            subTitleStyles={styles.subtitle}
            skipLabel={''}
            pages={[
                {
                    backgroundColor: theme.colors.white,
                    image: <Image source={require('../../assets/images/illustration_1.png')} style={styles.onboardingImage} />,
                    title: 'Earn',
                    subtitle: 'Sell your catch or gear locally',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../assets/images/illustration_1.png')} style={styles.onboardingImage} />,
                    title: 'Experience',
                    subtitle: "Discover new fishing spots and techniques",
                    
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../assets/images/illustration_1.png')} style={styles.onboardingImage} />,
                    title: 'Enjoy',
                    subtitle: "Relax and unwind, plan your next adventure!",
                },
                {
                    backgroundColor: '#fff',
                    image: <UserType/>,
                    title: '',
                    subtitle: "",
                },
                {
                    backgroundColor: '#fff',
                    image: <UserInfoName/>,
                    title: '',
                    subtitle: "",
                },
                {
                    backgroundColor: '#fff',
                    image: <UserInfoAddress/>,
                    title: '',
                    subtitle: "",
                }, 
                {
                    backgroundColor: '#fff',
                    image: <UserInfoContact/>,
                    title: '',
                    subtitle: "",
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../assets/images/illustration_1.png')} style={styles.onboardingImage} />,
                    title: "Done!",
                    subtitle: "Enough talk, let's go fishing!",
                },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    onboardingImage:{
        width:300,
        height:'60%',
    },
    title:{
        fontFamily:'Bold',
    },
    subtitle:{
        fontFamily:'Medium',
    },
    userPreferenceBtn:{
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: 12,
        padding: 10,
        width: theme.dimensions.width * 0.7,
        alignItems: 'center',
        marginVertical: 10,
    },
    userPreferenceTxt:{
        fontFamily:'Bold', 
        color: theme.colors.primary,
    },
    userPreferenceSelectedBtn:{
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: 12,
        backgroundColor: theme.colors.primary,
        padding: 10,
        width: theme.dimensions.width * 0.7,
        alignItems: 'center',
        marginVertical: 10,
    },
    userPreferenceSelectedTxt:{
        fontFamily:'Bold', 
        color: theme.colors.white,
    },
    textInput:{
        fontFamily: 'Medium', 
        fontSize:18, 
        textAlign:'center'
    },
});