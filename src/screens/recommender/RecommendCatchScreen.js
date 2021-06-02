import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActionSheetIOS } from 'react-native';
import { Divider, Input, Slider } from 'react-native-elements';
import { theme } from '../../constants';
import Axios from 'axios';

import * as Icon from "@expo/vector-icons";
import { Header } from '../../components/common';
import { ScrollView, State } from 'react-native-gesture-handler';
import { firebase } from '../../config/firebase';
import { Loading } from '../../components/common/Loading';
import { ActionButton } from '../../components/profile/ActionButton';
import { LocationListModal } from '../../components/profile/LocationListModal';

export const RecommendCatchScreen = props => {
    const [currentUserFirebase, setCurrentUserFirebase] = useState(firebase.auth().currentUser);

    //scroll settings
    const [scrollEnabled, setScrollEnabled] = useState(true);

    // button states
    const [selectedSinugba, setSelectedSinugba] = useState(false);
    const [selectedKinilaw, setSelectedKinilaw] = useState(false);
    const [selectedFried, setSelectedFried] = useState(false);
    const [selectedTinuwa, setSelectedTinuwa] = useState(false);
    
    const [budget, setBudget] = useState(10);
    const discreteSinugba = selectedSinugba ? 1 : 0;
    const discreteFried = selectedFried ? 1 : 0;
    const discreteTinuwa = selectedTinuwa ? 1 : 0;
    const discreteKinilaw = selectedKinilaw ? 1 : 0;

    const [showLocationList, setShowLocationList] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState();

    useEffect(() => {
    }, []);

    const recommendGearSetup = () => {
        if(deliveryAddress){
            const recommendCatchEndpoint = 'https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/recommendcatch/' + budget.toString() + '/' + discreteSinugba + '/' + discreteFried + '/' + discreteKinilaw + '/' + discreteTinuwa + '/' + deliveryAddress.city.toString() + '/' + deliveryAddress.lat.toString() + '/' + deliveryAddress.lng.toString();
            props.navigation.navigate('RecommendResultsMarketplace', { recommendType: 'catch',  endpoint: recommendCatchEndpoint });
        }
    }

    const EditButton = props => {
        return(
            <TouchableOpacity style={{...styles.smallButton, flexDirection:'column', alignItems:'flex-end'}} onPress={() => props.action()}>
                <Icon.MaterialIcons style={styles.headerIcon} name={'search'} size={24} color={theme.colors.primary} />
            </TouchableOpacity>
        );
    }

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Header name={'Recommend catch'} fontSize={18} icon={'keyboard-backspace'} navigation={props.navigation}/>
                { 
                    <ScrollView scrollEnabled={scrollEnabled}>
                        <Text style={{...styles.sectionTitle, fontSize: 17, marginTop: 20}}>SEAFOOD PREFERENCES</Text>
                        <Text style={{...styles.sectionTitle, fontFamily: 'Medium', fontSize: 14, marginBottom: 20}}>Select your preferences and we will recommend you the perfect seafood</Text>
                        <Text style={{...styles.sectionTitle, marginTop: 10,  width:500 }}>Budget (Price per kilo)</Text>
                        <View style={{ marginHorizontal: 30 }}>
                            <Slider
                                value={budget}
                                onValueChange={(budget) => setBudget(budget)}
                                maximumValue={500}
                                minimumValue={10}
                                step={10}
                                onSlidingStart={() => setScrollEnabled(false)}
                                onSlidingComplete={() => setScrollEnabled(true)}
                                thumbStyle={{ height: 20, width: 20, backgroundColor: theme.colors.primary }}
                                
                            /> 
                            <Text style={{ textAlign:'right', fontFamily:'Bold'}}>₱{budget}</Text>
                        </View>

                        <View style={{...styles.row}}>
                            <Text style={{...styles.sectionTitle, width:'80%'}}>Delivery Location </Text>
                            <EditButton action={() => setShowLocationList(true)}/>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                            <TouchableOpacity style={{ marginVertical: 10}} onPress={() => setShowLocationList(true)}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '100%', flexDirection:'row', paddingLeft: 5 }}>
                                        <Text style={{ fontFamily:'Medium', fontSize: 16}}>{ deliveryAddress ? deliveryAddress.city ? deliveryAddress.city : deliveryAddress : null}</Text>
                                    </View>
                                </View> 
                                <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                            </TouchableOpacity>
                        </View>
                        {
                            showLocationList ?
                                <LocationListModal 
                                    isVisible={true} 
                                    locationSelected={setDeliveryAddress} 
                                    hideLocationModal={setShowLocationList}
                                />
                            : null
                        }


                        <Text style={{...styles.sectionTitle, marginTop: 10 }}>Best way to cook?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginHorizontal: 30, }}>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedSinugba ? theme.colors.primary : theme.colors.white }} onPress={()=>{setSelectedSinugba(!selectedSinugba); }}>
                                <View style={{ margin: 7, }}>
                                        <Image source={require('../../assets/icons/outline/sinugba.png')} style={{ width: 70, height: 70, marginHorizontal: 20, tintColor: selectedSinugba? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 23, color: selectedSinugba? theme.colors.white : theme.colors.gray2}}>SINUGBA</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedKinilaw ? theme.colors.primary : theme.colors.white }} onPress={()=>{setSelectedKinilaw(!selectedKinilaw);}}>                            
                                <View style={{ margin: 7 }}>
                                        <Image source={require('../../assets/icons/outline/shorecasting.png')} style={{ width: 70, height: 70, marginHorizontal: 20, tintColor: selectedKinilaw? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 20, color: selectedKinilaw? theme.colors.white : theme.colors.gray2}}>KINILAW</Text>
                                </View>
                                
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginHorizontal: 30, }}>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedFried ? theme.colors.primary : theme.colors.white }} onPress={()=>{setSelectedFried(!selectedFried); }}>
                                <View style={{ margin: 7, }}>
                                        <Image source={require('../../assets/icons/outline/fried.png')} style={{ width: 70, height: 70, marginHorizontal: 20, tintColor: selectedFried? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 30, color: selectedFried? theme.colors.white : theme.colors.gray2}}>FRIED</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedTinuwa ? theme.colors.primary : theme.colors.white }} onPress={()=>{setSelectedTinuwa(!selectedTinuwa);}}>                            
                                <View style={{ margin: 7 }}>
                                        <Image source={require('../../assets/icons/outline/tinuwa.png')} style={{ width: 70, height: 70, marginHorizontal: 20, tintColor: selectedTinuwa? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 20, color: selectedTinuwa? theme.colors.white : theme.colors.gray2}}>TINUWA</Text>
                                </View>
                                
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: 20 }}>  
                            <ActionButton name={'Recommend seafood'} onPress={recommendGearSetup} />
                        </View>

                    </ScrollView>
                    
                }
            </View>
            
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'flex-start',
        backgroundColor:theme.colors.white
    },
    sliderContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    wrapper:{
        paddingHorizontal:10,
        marginTop:30,
    },
    sectionTitle:{
        fontFamily:'Bold',
        fontSize:15 ,
        marginLeft:10,
        marginTop:5,
    },
    fishingModeToggle:{
        borderWidth: 2, 
        borderRadius: 10, 
        borderColor: theme.colors.gray2 , 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding:5, 
        marginHorizontal: 4,
    },
    textView: {
        flexDirection:'row',
    },
    textInput:{
        fontFamily: 'Medium', 
        fontSize:16, 
        width: '100%', 
        textAlign:'left'
    },
});