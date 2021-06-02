import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActionSheetIOS } from 'react-native';
import { Divider, Input, Slider } from 'react-native-elements';
import { theme } from '../../constants';
import Axios from 'axios';
import Toast from 'react-native-toast-message'


import * as Icon from "@expo/vector-icons";
import { Header } from '../../components/common';
import { ScrollView, State } from 'react-native-gesture-handler';
import { firebase } from '../../config/firebase';
import { Loading } from '../../components/common/Loading';
import { ActionButton } from '../../components/profile/ActionButton';
import { LocationListModal } from '../../components/profile/LocationListModal';

export const RecommendGearScreen = props => {
    const [currentUserFirebase, setCurrentUserFirebase] = useState(firebase.auth().currentUser);

    //scroll settings
    const [scrollEnabled, setScrollEnabled] = useState(true);

    // button states
    const [selectedJigging, setSelectedJigging] = useState(false);
    const [selectedShorecasting, setSelectedShorecasting] = useState(false);
    const [selectedSmallCatchSize, setSelectedSmallCatchSize] = useState(false);
    const [selectedMediumCatchSize, setSelectedMediumCatchSize] = useState(false);
    const [selectedLargeCatchSize, setSelectedLargeCatchSize] = useState(false);
    const [selectedBeginner, setSelectedBeginner] = useState(true);
    const [selectedExpert, setSelectedExpert] = useState(false);
    
    // gear types
    const rodTypes = ["Cancel", "Spinning", "Baitcast"];
    const reelTypes = ["Cancel", "Spinning", "Baitcast"]; 
    const lureTypes = ["Cancel", "Minnow", "Jigging", "Softplastics"];
    const braidlineTypes = ["Cancel", "Single color", "Multicolor"];
    const leaderlineTypes = ["Cancel", "Nylon", "Fluorocarbon", "Monofilament"];

    //dropdown view values
    const [rodTypeSelected, setRodTypeSelected] = useState();
    const [reelTypeSelected, setReelTypeSelected] = useState();
    const [lureTypeSelected, setLureTypeSelected] = useState();
    const [braidlineTypeSelected, setBraidlineTypeSelected] = useState();
    const [leaderlineTypeSelected, setLeaderlineTypeSelected] = useState();

    // discretized paramters for recommender
    const [budget, setBudget] = useState(3000);
    const [selectedRod, setSelectedRod] = useState(0);
    const [selectedReel, setSelectedReel] = useState(0);
    const [selectedLure, setSelectedLure] = useState(0);
    const [selectedBraidline, setSelectedBraidline] = useState(0);
    const [selectedLeaderLine, setSelectedLeaderLine] = useState(0);
    const [selectedExpectedCatchSize, setSelectedExpectedCatchSize] = useState(0);
    const [selectedFishingMode, setSelectedFishingMode] = useState(0);
    const [selectedFishingExperience, setSelectedFishingExperience] = useState(0);

    const [showLocationList, setShowLocationList] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState();

    //gear types
    const [fishingGearTypes, setFishingGearTypes] = useState(props.route.params ? props.route.params.fishingGearTypes ? Object.entries(props.route.params.fishingGearTypes) : null : null);
    const [catchType, setCatchType] = useState();


    const recommendGearSetup = () => {
        //discretize toggle button values
        selectedJigging ? setSelectedFishingMode(1) : selectedShorecasting ? setSelectedFishingMode(2) : setSelectedFishingMode(0);
        selectedSmallCatchSize ? setSelectedExpectedCatchSize(1) : selectedMediumCatchSize ? setSelectedExpectedCatchSize(2) : selectedLargeCatchSize ? setSelectedExpectedCatchSize(3) : setSelectedExpectedCatchSize(0);
        selectedBeginner ? setSelectedFishingExperience(1): selectedExpert ? setSelectedFishingExperience(2) : setSelectedFishingExperience(0);
        
        const recommendGearEndpoint = 'https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/recommendgear/' + selectedRod + '/' + selectedReel + '/' + selectedBraidline + '/' + selectedLeaderLine + '/' + selectedLure + '/' + selectedFishingMode + '/' + selectedExpectedCatchSize +'/' + selectedFishingExperience + '/' + budget;
        
        if(deliveryAddress){
            if(props.route.params.origin==='Marketplace'){
                props.navigation.navigate('RecommendResultsMarketplace', { recommendType: 'gear', endpoint: recommendGearEndpoint, deliveryAddress: deliveryAddress });
            }
            else if(props.route.params.origin==='Profile'){
                props.navigation.navigate('RecommendResults', { recommendType: 'gear', endpoint: recommendGearEndpoint, deliveryAddress: deliveryAddress });
            }
        }
        else{
            Toast.show({
                text1: 'Please enter a delivery location',
                position: 'bottom',
                bottomOffset: theme.dimensions.height * 0.1,
                type: 'error',
            })
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
                <Header name={'Recommend gear setup'} fontSize={18} icon={'keyboard-backspace'} navigation={props.navigation}/>
                { 
                    <ScrollView scrollEnabled={scrollEnabled}>
                        <Text style={{...styles.sectionTitle, fontSize: 17, marginTop: 20}}>FISHING GEAR PREFERENCES</Text>
                        <Text style={{...styles.sectionTitle, fontFamily: 'Medium', fontSize: 14, marginBottom: 20}}>Select your preferences and we will recommend you the perfect fishing gear setup</Text>
                        <Text style={{...styles.sectionTitle, marginTop: 10,  width:500 }}>Budget</Text>
                        <View style={{ marginHorizontal: 30 }}>
                            <Slider
                                value={budget}
                                onValueChange={(budget) => setBudget(budget)}
                                maximumValue={50000}
                                minimumValue={3000}
                                step={1000}
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

                        <Text style={{...styles.sectionTitle, marginTop: 10}}>Expected Catch Size</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginHorizontal: 10, }}>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedSmallCatchSize ? theme.colors.primary : theme.colors.white }} onPress={()=>{ setSelectedMediumCatchSize(false); setSelectedLargeCatchSize(false); setSelectedSmallCatchSize(!selectedSmallCatchSize); }}>
                                <View style={{ margin: 7, }}>
                                    <Image source={require('../../assets/icons/outline/small-fish.png')} style={{ width: 40, height: 30, marginHorizontal: 15, tintColor: selectedSmallCatchSize? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 15, color: selectedSmallCatchSize? theme.colors.white : theme.colors.gray2}}>SMALL</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedMediumCatchSize ? theme.colors.primary : theme.colors.white }} onPress={()=>{ setSelectedSmallCatchSize(false); setSelectedLargeCatchSize(false); setSelectedMediumCatchSize(!selectedMediumCatchSize); }}>
                                <View style={{ margin: 7, }}>
                                    <Image source={require('../../assets/icons//outline/medium-fish.png')} style={{ width: 50, height: 30, marginLeft: 16, tintColor: selectedMediumCatchSize? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 15, color: selectedMediumCatchSize? theme.colors.white : theme.colors.gray2}}>MEDIUM</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedLargeCatchSize ? theme.colors.primary : theme.colors.white }} onPress={()=>{ setSelectedSmallCatchSize(false); setSelectedMediumCatchSize(false); setSelectedLargeCatchSize(!selectedLargeCatchSize); }}>
                                <View style={{ margin: 7, }}>
                                        <Image source={require('../../assets/icons//outline/big-fish.png')} style={{ width: 60, height: 30, marginHorizontal: 10, tintColor: selectedLargeCatchSize? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 15, color: selectedLargeCatchSize? theme.colors.white : theme.colors.gray2}}>LARGE</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={{...styles.sectionTitle, marginTop: 10 }}>Fishing Mode</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginHorizontal: 30, }}>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedJigging ? theme.colors.primary : theme.colors.white }} onPress={()=>{setSelectedShorecasting(false); setSelectedJigging(!selectedJigging); }}>
                                <View style={{ margin: 7, }}>
                                        <Image source={require('../../assets/icons/outline/jigging.png')} style={{ width: 70, height: 70, marginHorizontal: 20, tintColor: selectedJigging? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 23, color: selectedJigging? theme.colors.white : theme.colors.gray2}}>JIGGING</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedShorecasting ? theme.colors.primary : theme.colors.white }} onPress={()=>{setSelectedJigging(false); setSelectedShorecasting(!selectedShorecasting);}}>                            
                                <View style={{ margin: 7 }}>
                                        <Image source={require('../../assets/icons/outline/shorecasting.png')} style={{ width: 70, height: 70, marginHorizontal: 20, tintColor: selectedShorecasting? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 0, color: selectedShorecasting? theme.colors.white : theme.colors.gray2}}>SHORECASTING</Text>
                                </View>
                                
                            </TouchableOpacity>
                        </View>

                        <Text style={{...styles.sectionTitle, marginTop: 10}}>Fishing Experience</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginHorizontal: 30, }}>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedBeginner ? theme.colors.primary : theme.colors.white }} onPress={()=>{setSelectedExpert(false); setSelectedBeginner(!selectedBeginner); }}>
                                <View style={{ margin: 7, }}>
                                        <Image source={require('../../assets/icons/outline/avatar.png')} style={{ width: 70, height: 70, marginHorizontal: 20, tintColor: selectedBeginner? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 16, color: selectedBeginner? theme.colors.white : theme.colors.gray2}}>BEGINNER</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.fishingModeToggle, backgroundColor: selectedExpert ? theme.colors.primary : theme.colors.white }} onPress={()=>{setSelectedBeginner(false); setSelectedExpert(!selectedExpert);}}>                            
                                <View style={{ margin: 7 }}>
                                        <Image source={require('../../assets/icons/outline/fisherman.png')} style={{ width: 70, height: 70, marginHorizontal: 20, tintColor: selectedExpert? theme.colors.white : theme.colors.gray2}}/>
                                        <Text style={{ fontFamily:'Bold', paddingHorizontal: 23, color: selectedExpert? theme.colors.white : theme.colors.gray2}}>EXPERT</Text>
                                </View>
                                
                            </TouchableOpacity>
                        </View>
                        { selectedExpert ? 
                            <View>
                                <Text style={{...styles.sectionTitle}}>Rod Type</Text>
                                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => {
                                            ActionSheetIOS.showActionSheetWithOptions(
                                                {
                                                    title:'Select your preferred rod type',
                                                    options: rodTypes,
                                                    cancelButtonIndex: 0,
                                                    userInterfaceStyle: 'dark'
                                                },
                                                buttonIndex => {
                                                    if (buttonIndex === 0) {
                                                        // cancel action
                                                    } 
                                                    else {
                                                        setSelectedRod(buttonIndex);
                                                        setRodTypeSelected(rodTypes[buttonIndex]);
                                                    }
                                                }
                                            );
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '90%', flexDirection:'row' }}>
                                                <Image source={require('../../assets/icons/outline/fishing-rod-outline.png')} style={{ width: 20, height: 20, marginHorizontal: 10}} />
                                                <Text style={{ fontFamily:'Medium'}}>{rodTypeSelected}</Text>
                                            </View>
                                            <View style={{ width: '10%' }}>
                                                <Icon.Entypo
                                                    name="chevron-down"
                                                    size={20}
                                                    color={theme.colors.black}
                                                />
                                            </View>
                                        </View> 
                                        <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{...styles.sectionTitle}}>Reel Type</Text>
                                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => {
                                            ActionSheetIOS.showActionSheetWithOptions(
                                                {
                                                    title:'Select your preferred reel type',
                                                    options: reelTypes,
                                                    cancelButtonIndex: 0,
                                                    userInterfaceStyle: 'dark'
                                                },
                                                buttonIndex => {
                                                    if (buttonIndex === 0) {
                                                        // cancel action
                                                    } 
                                                    else {
                                                        setSelectedReel(buttonIndex);
                                                        setReelTypeSelected(reelTypes[buttonIndex]);
                                                    }
                                                }
                                            );
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '90%', flexDirection:'row' }}>
                                                <Image source={require('../../assets/icons/outline/fishing-reel-outline.png')} style={{ width: 20, height: 20, marginHorizontal: 10}} />
                                                <Text style={{ fontFamily:'Medium'}}>{reelTypeSelected}</Text>
                                            </View>
                                            <View style={{ width: '10%' }}>
                                                <Icon.Entypo
                                                    name="chevron-down"
                                                    size={20}
                                                    color={theme.colors.black}
                                                />
                                            </View>
                                        </View> 
                                        <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{...styles.sectionTitle}}>Lure Type</Text>
                                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => {
                                            ActionSheetIOS.showActionSheetWithOptions(
                                                {
                                                    title:'Select your preferred lure type',
                                                    options: lureTypes,
                                                    cancelButtonIndex: 0,
                                                    userInterfaceStyle: 'dark'
                                                },
                                                buttonIndex => {
                                                    if (buttonIndex === 0) {
                                                        // cancel action
                                                    } 
                                                    else {
                                                        setSelectedLure(buttonIndex);
                                                        setLureTypeSelected(lureTypes[buttonIndex]);
                                                    }
                                                }
                                            );
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '90%', flexDirection:'row' }}>
                                                <Image source={require('../../assets/icons/outline/bait.png')} style={{ width: 20, height: 20, marginHorizontal: 10}} />
                                                <Text style={{ fontFamily:'Medium'}}>{lureTypeSelected}</Text>
                                            </View>
                                            <View style={{ width: '10%' }}>
                                                <Icon.Entypo
                                                    name="chevron-down"
                                                    size={20}
                                                    color={theme.colors.black}
                                                />
                                            </View>
                                        </View> 
                                        <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{...styles.sectionTitle}}>Braidline Type</Text>
                                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => {
                                            ActionSheetIOS.showActionSheetWithOptions(
                                                {
                                                    title:'Select your preferred braidline type',
                                                    options: braidlineTypes,
                                                    cancelButtonIndex: 0,
                                                    userInterfaceStyle: 'dark'
                                                },
                                                buttonIndex => {
                                                    if (buttonIndex === 0) {
                                                        // cancel action
                                                    } 
                                                    else {
                                                        setSelectedBraidline(buttonIndex);
                                                        setBraidlineTypeSelected(braidlineTypes[buttonIndex]);
                                                    }
                                                }
                                            );
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '90%', flexDirection:'row' }}>
                                                <Image source={require('../../assets/icons/outline/fishing-line-outline.png')} style={{ width: 20, height: 20, marginHorizontal: 10}} />
                                                <Text style={{ fontFamily:'Medium'}}>{ braidlineTypeSelected }</Text>
                                            </View>
                                            <View style={{ width: '10%' }}>
                                                <Icon.Entypo
                                                    name="chevron-down"
                                                    size={20}
                                                    color={theme.colors.black}
                                                />
                                            </View>
                                        </View> 
                                        <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{...styles.sectionTitle}}>Leaderline Type</Text>
                                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => {
                                            ActionSheetIOS.showActionSheetWithOptions(
                                                {
                                                    title:'Select your preferred leaderline type',
                                                    options: leaderlineTypes,
                                                    cancelButtonIndex: 0,
                                                    userInterfaceStyle: 'dark'
                                                },
                                                buttonIndex => {
                                                    if (buttonIndex === 0) {
                                                        // cancel action
                                                    } 
                                                    else {
                                                        setSelectedLeaderLine(buttonIndex);
                                                        setLeaderlineTypeSelected(leaderlineTypes[buttonIndex]);
                                                    }
                                                }
                                            );
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '90%', flexDirection:'row' }}>
                                                <Image source={require('../../assets/icons/outline/fishing-line2-outline.png')} style={{ width: 20, height: 20, marginHorizontal: 10}} />
                                                <Text style={{ fontFamily:'Medium'}}>{ leaderlineTypeSelected }</Text>
                                            </View>
                                            <View style={{ width: '10%' }}>
                                                <Icon.Entypo
                                                    name="chevron-down"
                                                    size={20}
                                                    color={theme.colors.black}
                                                />
                                            </View>
                                        </View> 
                                        <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                            :
                            null

                        }
                        <View style={{ marginVertical: 20 }}>  
                            <ActionButton name={'Recommend gear setup'} onPress={recommendGearSetup} />
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