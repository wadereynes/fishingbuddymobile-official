import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { Input, Divider } from 'react-native-elements';
import { theme } from '../../constants';
import * as Icon from "@expo/vector-icons";
import { Header } from '../../components/common';
import { ScrollView, State } from 'react-native-gesture-handler';
import { firebase } from '../../config/firebase';
import { Loading } from '../../components/common/Loading';
import { ActionButton } from '../../components/profile/ActionButton';
import { GearTypeModal } from '../../components/profile/GearTypeModal';

export const ManageGearScreen = props => {

    const [currentUserFirebase, setCurrentUserFirebase] = useState(firebase.auth().currentUser);
    const [isSaving, setIsSaving] = useState(false);

    const [showRodGearTypeModal, setShowRodGearTypeModal] = useState(false);
    const [showReelGearTypeModal, setShowReelGearTypeModal] = useState(false);
    const [showLureGearTypeModal, setShowLureGearTypeModal] = useState(false);
    const [showBraidlineGearTypeModal, setShowBraidlineGearTypeModal] = useState(false);
    const [showLeaderlineGearTypeModal, setShowLeaderlineGearTypeModal] = useState(false);

    //route parameters
    const [action, setAction] = useState(props.route.params.action);
    const [fishingGear, setFishingGear] = useState(props.route.params.fishingGear);
    const [fishingGearKey, setFishingGearKey] = useState(props.route.params.firebaseKey);

    // button states
    const [selectedJigging, setSelectedJigging] = useState(fishingGear ? fishingGear.selectedJigging ? fishingGear.selectedJigging : false : false);
    const [selectedShorecasting, setSelectedShorecasting] = useState(fishingGear ? fishingGear.selectedShorecasting ? fishingGear.selectedShorecasting : false : false);
    const [selectedSmallCatchSize, setSelectedSmallCatchSize] = useState(fishingGear ? fishingGear.selectedSmallCatchSize ? fishingGear.selectedSmallCatchSize : false : false);
    const [selectedMediumCatchSize, setSelectedMediumCatchSize] = useState(fishingGear ? fishingGear.selectedMediumCatchSize ? fishingGear.selectedMediumCatchSize : false : false);
    const [selectedLargeCatchSize, setSelectedLargeCatchSize] = useState(fishingGear ? fishingGear.selectedLargeCatchSize ? fishingGear.selectedLargeCatchSize : false : false); 

    const environmentTypes = ['Jigging', 'Shorecasting'];
    const catchTypes = ['Small', 'Medium', 'Large'];

    // form states
    const [setupName, setSetupName] = useState(fishingGear ? fishingGear.setupName ? fishingGear.setupName : null : null);

    const [rod, setRod] = useState(fishingGear ? fishingGear.rod ? fishingGear.rod : null : null);
    const [rodType, setRodType] = useState(fishingGear ? fishingGear.rodTypes ? fishingGear.rodTypes : null : null);
    const [rodPrice, setRodPrice] = useState(fishingGear ? fishingGear.rodPrice ? fishingGear.rodPrice : null : null);

    const [reel, setReel] = useState(fishingGear ? fishingGear.reel ? fishingGear.reel : null : null);
    const [reelType, setReelType] = useState(fishingGear ? fishingGear.reelType ? fishingGear.reelType : null : null);
    const [reelPrice, setReelPrice] = useState(fishingGear ? fishingGear.reelPrice ? fishingGear.reelPrice : null : null);

    const [lure, setLure] = useState(fishingGear ? fishingGear.lure ? fishingGear.lure : null : null);
    const [lureType, setLureType] = useState(fishingGear ? fishingGear.lureType ? fishingGear.lureType : null : null);
    const [lurePrice, setLurePrice] = useState(fishingGear ? fishingGear.lurePrice ? fishingGear.lurePrice : null : null);

    const [braidline, setBraidline] = useState(fishingGear ? fishingGear.braidline ? fishingGear.braidline : null : null);
    const [braidlineType, setBraidlineType] = useState(fishingGear ? fishingGear.braidlineType ? fishingGear.braidlineType : null : null);
    const [braidlinePrice, setBraidlinePrice] = useState(fishingGear ? fishingGear.braidlinePrice ? fishingGear.braidlinePrice : null : null);

    const [leaderLine, setLeaderLine] = useState(fishingGear ? fishingGear.leaderLine ? fishingGear.leaderLine : null : null);
    const [leaderLineType, setLeaderLineType] = useState(fishingGear ? fishingGear.leaderlineType ? fishingGear.leaderlineType : null : null);
    const [leaderLinePrice, setLeaderLinePrice] = useState(fishingGear ? fishingGear.leaderLinePrice ? fishingGear.leaderLinePrice : null : null);

    //input references
    const setupNameField = useRef();
    const rodTextField = useRef();
    const reelTextField = useRef();
    const lureTextField = useRef();
    const braidlineTextField = useRef();
    const leaderlineTextField = useRef();


    const saveGearToFirebase = async() => {
        console.log('saving gear to firebase...');
        setIsSaving(true);
        await firebase
            .database()
            .ref('/user/'+ currentUserFirebase.uid +'/fishingGears')
            .push({
                setupName: setupName,
                rod: rod,
                rodTypes: rodType ? rodType.gearTypeName ? rodType.gearTypeName : rodType : null,
                rodTypeIndex: rodType ? rodType.recommenderIndex ? rodType.recommenderIndex : rodType : null,
                rodPrice: rodPrice,
                reel: reel,
                reelName: reel,
                reelType: reelType ? reelType.gearTypeName ? reelType.gearTypeName : reelType : null,
                reelTypeIndex: reelType ? reelType.recommenderIndex ? reelType.recommenderIndex : reelType : null,
                reelPrice: reelPrice,
                lure: lure,
                lureType: lureType ? lureType.gearTypeName ? lureType.gearTypeName : lureType : null,
                lureIndex: lureType ? lureType.recommenderIndex ? lureType.recommenderIndex : lureType : null,
                lurePrice: lurePrice,
                leaderLine: leaderLine,
                leaderlineType: leaderLineType ? leaderLineType.gearTypeName ? leaderLineType.gearTypeName : leaderLineType : null,
                leaderlineIndex: leaderLineType ? leaderLineType.recommenderIndex ? leaderLineType.recommenderIndex : leaderLineType : null,
                leaderLinePrice: leaderLinePrice,
                braidline: braidline,
                selectedJigging: selectedJigging,
                braidlineType: braidlineType ? braidlineType.gearTypeName ? braidlineType.gearTypeName : braidlineType : null,
                braidlineIndex: leaderLineType ? braidlineType.recommenderIndex ? braidlineType.recommenderIndex : braidlineType : null,
                braidlinePrice: braidlinePrice,
                selectedShorecasting: selectedShorecasting,
                selectedSmallCatchSize: selectedSmallCatchSize,
                selectedMediumCatchSize: selectedMediumCatchSize,
                selectedLargeCatchSize: selectedLargeCatchSize,
                verified: false,
            })
            .then(success => {
                //update user state here...
                setIsSaving(false);
                props.navigation.navigate('Profile');
                console.log('Saving setup gear success!');
            })
            .catch(error => {
                console.log('Error in saving...', error);
            })
        console.log('saving to gearsetup...')
        await firebase
            .database()
            .ref('/gearsetup/')
            .push({
                setupName: setupName,
                rodName: rod,
                rodTypes: rodType ? rodType.gearTypeName ? rodType.gearTypeName : rodType : null,
                rodTypeIndex: rodType ? rodType.recommenderIndex ? rodType.recommenderIndex : rodType : null,
                rodPrice: rodPrice,
                reelName: reel,
                reelType: reelType ? reelType.gearTypeName ? reelType.gearTypeName : reelType : null,
                reelTypeIndex: reelType ? reelType.recommenderIndex ? reelType.recommenderIndex : reelType : null,
                reelPrice: reelPrice,
                lureName: lure,
                lureType: lureType ? lureType.gearTypeName ? lureType.gearTypeName : lureType : null,
                lureIndex: lureType ? lureType.recommenderIndex ? lureType.recommenderIndex : lureType : null,
                lurePrice: lurePrice,
                leaderlineName: leaderLine,
                leaderlineType: leaderLineType ? leaderLineType.gearTypeName ? leaderLineType.gearTypeName : leaderLineType : null,
                leaderlineIndex: leaderLineType ? leaderLineType.recommenderIndex ? leaderLineType.recommenderIndex : leaderLineType : null,
                leaderLinePrice: leaderLinePrice,
                braidlineName: braidline,
                braidlineType: braidlineType ? braidlineType.gearTypeName ? braidlineType.gearTypeName : braidlineType : null,
                braidlineIndex: leaderLineType ? braidlineType.recommenderIndex ? braidlineType.recommenderIndex : braidlineType : null,
                braidlinePrice: braidlinePrice,
                environmentType: selectedJigging ? environmentTypes[0] : selectedShorecasting ? environmentTypes[1] : null,
                environmentTypeIndex: selectedJigging ? 2 : selectedShorecasting ? 1 : 0,
                catchType: selectedSmallCatchSize ? catchTypes[0] : selectedMediumCatchSize[1] ? catchTypes[1] : selectedLargeCatchSize ? catchTypes[2] : null,
                catchTypeIndex: selectedSmallCatchSize ? 1: selectedMediumCatchSize[1] ? 2 : selectedLargeCatchSize ? 3 : 0,
                hobbyistType: props.route.params.user.selectedBeginner ? 'Beginner' : props.route.params.user.selectedExpert ? 'Expert' : null,
                hobbyistTypeIndex: props.route.params.user.selectedBeginner ? 1 : props.route.params.user.selectedExpert ? 2 : 0,
                totalPrice: parseFloat(rodPrice) + parseFloat(reelPrice) + parseFloat(lurePrice) + parseFloat(leaderLinePrice) + parseFloat(braidlinePrice),
                verified: false,
                ownerId: currentUserFirebase.uid,
            })
            .then(success => {
                //update user state here...
                setIsSaving(false);
                props.navigation.navigate('Profile');
                console.log('Saving setup gear success!');
            })
            .catch(error => {
                console.log('Error in saving...', error);
            })
    }

    const updateGearFromFirebase = async() => {
        console.log('updating gear from firebase...', fishingGearKey);
        setIsSaving(true);
        await firebase
            .database()
            .ref('/user/'+ currentUserFirebase.uid +'/fishingGears/' + fishingGearKey)
            .update({
                setupName: setupName,
                rod: rod,
                rodTypes: rodType ? rodType.gearTypeName ? rodType.gearTypeName : rodType : null,
                rodTypeIndex: rodType ? rodType.recommenderIndex ? rodType.recommenderIndex : rodType : null,
                rodPrice: rodPrice,
                reel: reel,
                reelName: reel,
                reelType: reelType ? reelType.gearTypeName ? reelType.gearTypeName : reelType : null,
                reelTypeIndex: reelType ? reelType.recommenderIndex ? reelType.recommenderIndex : reelType : null,
                reelPrice: reelPrice,
                lure: lure,
                lureType: lureType ? lureType.gearTypeName ? lureType.gearTypeName : lureType : null,
                lureIndex: lureType ? lureType.recommenderIndex ? lureType.recommenderIndex : lureType : null,
                lurePrice: lurePrice,
                leaderLine: leaderLine,
                leaderlineType: leaderLineType ? leaderLineType.gearTypeName ? leaderLineType.gearTypeName : leaderLineType : null,
                leaderlineIndex: leaderLineType ? leaderLineType.recommenderIndex ? leaderLineType.recommenderIndex : leaderLineType : null,
                leaderLinePrice: leaderLinePrice,
                braidline: braidline,
                selectedJigging: selectedJigging,
                braidlineType: braidlineType ? braidlineType.gearTypeName ? braidlineType.gearTypeName : braidlineType : null,
                braidlineIndex: leaderLineType ? braidlineType.recommenderIndex ? braidlineType.recommenderIndex : braidlineType : null,
                braidlinePrice: braidlinePrice,
                selectedShorecasting: selectedShorecasting,
                selectedSmallCatchSize: selectedSmallCatchSize,
                selectedMediumCatchSize: selectedMediumCatchSize,
                selectedLargeCatchSize: selectedLargeCatchSize,
            })
            .then(() => {
                setIsSaving(false);
                props.navigation.navigate('Profile');
                
            })
            .catch(error => {
                console.log('Error in saving...', error);
            })
    }

    const deleteGearFromFirebase = async() => {
        console.log('deleting gear from firebase...', fishingGearKey);
        await firebase
            .database()
            .ref('/user/'+ currentUserFirebase.uid +'/fishingGears/' + fishingGearKey)
            .remove()
            .then(() => {
                var currentUser = firebase.auth().currentUser;
                if(currentUser){
                    firebase.database().ref('user/' + currentUser.uid).once('value', snapshot => { props.navigation.navigate('Profile', { userProfile: snapshot.val()}); });
                }
                Toast.show({
                    text1: 'Gear Setup deleted!',
                    position: 'bottom',
                    bottomOffset: theme.dimensions.height * 0.1,
                    type: 'success',
                });
            })
    }

    const SearchButton = props => {
        return(
            <TouchableOpacity style={{...styles.smallButton, flexDirection:'column', alignItems:'flex-end'}} onPress={() => props.action()}>
                <Icon.MaterialIcons style={styles.headerIcon} name={'search'} size={25} color={theme.colors.primary} />
            </TouchableOpacity>
        );
    }

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Header name={action + ' Gear Setup'} fontSize={18} icon={'close'} navigation={props.navigation}/>
                { !action ? 
                        <Loading name={'Loading...'}/>  
                    : 
                        <ScrollView>
                            <Text style={{...styles.sectionTitle}}>Gear Setup Name</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={setupNameField}
                                        style={styles.textInput}
                                        placeholder={'"My Fishing Buddy"'}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='default'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={setupName}
                                        onChangeText={setupName => setSetupName(setupName)}
                                        leftIcon={ <Image source={require('../../assets/icons/outline/boat.png')} style={{ width: 20, height: 20}} />}
                                        onSubmitEditing={() => rodTextField.current.focus()}
                                    />
                                </View>
                            </View>
                            <Text style={{...styles.sectionTitle}}>Rod Name</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={rodTextField}
                                        style={styles.textInput}
                                        placeholder={'"Rod"'}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='default'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={rod}
                                        onChangeText={rod => setRod(rod)}
                                        leftIcon={ <Image source={require('../../assets/icons/outline/fishing-rod-outline.png')} style={{ width: 20, height: 20}} />}
                                        onSubmitEditing={() => reelTextField.current.focus()}
                                    />
                                </View>
                            </View>

                            <Text style={{...styles.sectionTitle}}>Rod Type</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 20, }}>
                                <TouchableOpacity style={{ marginVertical: 10, marginRight: 10}} onPress={()=> setShowRodGearTypeModal(true)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '85%', flexDirection:'row', }}>
                                            <Text style={{ fontFamily:'Medium', fontSize: 16}}> { rodType ? rodType.gearTypeName ? rodType.gearTypeName : rodType : null } </Text>
                                        </View>
                                        <View style={{ width: '10%' }}>
                                            <SearchButton action={() => setShowRodGearTypeModal(true)}/>
                                        </View>
                                    </View> 
                                    <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                </TouchableOpacity>
                            </View>
                            {
                                showRodGearTypeModal ? 
                                    <GearTypeModal 
                                        isVisible={true} 
                                        type={'rod'}
                                        gearTypeSelected={setRodType}
                                        hideGearTypeModal={setShowRodGearTypeModal}
                                    />  
                                : null
                            }

                            <Text style={{...styles.sectionTitle}}>Rod Price</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={rodTextField}
                                        style={styles.textInput}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='number-pad'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={rodPrice}
                                        onChangeText={rodPrice => setRodPrice(rodPrice)}
                                        leftIcon={ <Image source={require('../../assets/icons/philippines-peso-currency-symbol.png')} style={{ width: 18, height: 18}} />}
                                        onSubmitEditing={() => reelTextField.current.focus()}
                                    />
                                </View>
                            </View>

                            <Text style={{...styles.sectionTitle}}>Reel</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={reelTextField}
                                        style={styles.textInput}
                                        placeholder={'"Reel"'}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='default'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={reel}
                                        onChangeText={reel => setReel(reel)}
                                        leftIcon={ <Image source={require('../../assets/icons/outline/fishing-reel-outline.png')} style={{ width: 20, height: 20}} />}
                                        onSubmitEditing={() => lureTextField.current.focus()}
                                    />
                                </View>
                            </View>

                            <Text style={{...styles.sectionTitle}}>Reel Type</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 20, }}>
                                <TouchableOpacity style={{ marginVertical: 10, marginRight: 10}} onPress={()=> setShowReelGearTypeModal(true)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '85%', flexDirection:'row', }}>
                                            <Text style={{ fontFamily:'Medium', fontSize: 16}}> { reelType ? reelType.gearTypeName ? reelType.gearTypeName : reelType : null } </Text>
                                        </View>
                                        <View style={{ width: '10%' }}>
                                            <SearchButton action={() => console.log('hello')}/>
                                        </View>
                                    </View> 
                                    <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                </TouchableOpacity>
                            </View>
                            {
                                showReelGearTypeModal ? 
                                    <GearTypeModal 
                                        isVisible={true} 
                                        type={'reel'}
                                        gearTypeSelected={setReelType}
                                        hideGearTypeModal={setShowReelGearTypeModal}
                                    />  
                                : null
                            }

                            <Text style={{...styles.sectionTitle}}>Reel Price</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={rodTextField}
                                        style={styles.textInput}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='number-pad'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={reelPrice}
                                        onChangeText={reelPrice => setReelPrice(reelPrice)}
                                        leftIcon={ <Image source={require('../../assets/icons/philippines-peso-currency-symbol.png')} style={{ width: 18, height: 18}} />}
                                        onSubmitEditing={() => reelTextField.current.focus()}
                                    />
                                </View>
                            </View>


                            <Text style={{...styles.sectionTitle}}>Lure</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={lureTextField}
                                        style={styles.textInput}
                                        placeholder={'"Lure"'}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='default'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={lure}
                                        onChangeText={lure => setLure(lure)}
                                        leftIcon={ <Image source={require('../../assets/icons/outline/bait.png')} style={{ width: 20, height: 20}} />}
                                        onSubmitEditing={() => braidlineTextField.current.focus()}
                                    />
                                </View>
                            </View>

                            <Text style={{...styles.sectionTitle}}>Lure Type</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 20, }}>
                                <TouchableOpacity style={{ marginVertical: 10, marginRight: 10}} onPress={()=> setShowLureGearTypeModal(true)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '85%', flexDirection:'row', }}>
                                            <Text style={{ fontFamily:'Medium', fontSize: 16}}> { lureType ? lureType.gearTypeName ? lureType.gearTypeName : lureType : null } </Text>
                                        </View>
                                        <View style={{ width: '10%' }}>
                                            <SearchButton action={() => console.log('hello')}/>
                                        </View>
                                    </View> 
                                    <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                </TouchableOpacity>
                            </View>
                            {
                                showLureGearTypeModal ? 
                                    <GearTypeModal 
                                        isVisible={true} 
                                        type={'lure'}
                                        gearTypeSelected={setLureType}
                                        hideGearTypeModal={setShowLureGearTypeModal}
                                    />  
                                : null
                            }

                            <Text style={{...styles.sectionTitle}}>Lure Price</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={rodTextField}
                                        style={styles.textInput}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='number-pad'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={lurePrice}
                                        onChangeText={lurePrice => setLurePrice(lurePrice)}
                                        leftIcon={ <Image source={require('../../assets/icons/philippines-peso-currency-symbol.png')} style={{ width: 18, height: 18}} />}
                                        onSubmitEditing={() => reelTextField.current.focus()}
                                    />
                                </View>
                            </View>

                            
                            <Text style={{...styles.sectionTitle}}>Braidline</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={braidlineTextField}
                                        style={styles.textInput}
                                        placeholder={'"Braidline"'}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='default'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={braidline}
                                        onChangeText={braidline => setBraidline(braidline)}
                                        leftIcon={ <Image source={require('../../assets/icons/outline/fishing-line-outline.png')} style={{ width: 20, height: 20}} />}
                                        onSubmitEditing={() => leaderlineTextField.current.focus()}
                                    />
                                </View>
                            </View>

                            <Text style={{...styles.sectionTitle}}>Braidline Type</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 20, }}>
                                <TouchableOpacity style={{ marginVertical: 10, marginRight: 10}} onPress={()=> setShowBraidlineGearTypeModal(true)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '85%', flexDirection:'row', }}>
                                            <Text style={{ fontFamily:'Medium', fontSize: 16}}> { braidlineType ? braidlineType.gearTypeName ? braidlineType.gearTypeName : braidlineType : null } </Text>
                                        </View>
                                        <View style={{ width: '10%' }}>
                                            <SearchButton action={() => setShowBraidlineGearTypeModal(true)}/>
                                        </View>
                                    </View> 
                                    <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                </TouchableOpacity>
                            </View>
                            {
                                showBraidlineGearTypeModal ? 
                                    <GearTypeModal 
                                        isVisible={true} 
                                        type={'braidline'}
                                        gearTypeSelected={setBraidlineType}
                                        hideGearTypeModal={setShowBraidlineGearTypeModal}
                                    />  
                                : null
                            }

                            <Text style={{...styles.sectionTitle}}>Braidline Price</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={rodTextField}
                                        style={styles.textInput}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='number-pad'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={braidlinePrice}
                                        onChangeText={braidlinePrice => setBraidlinePrice(braidlinePrice)}
                                        leftIcon={ <Image source={require('../../assets/icons/philippines-peso-currency-symbol.png')} style={{ width: 18, height: 18}} />}
                                        onSubmitEditing={() => reelTextField.current.focus()}
                                    />
                                </View>
                            </View>


                            <Text style={{...styles.sectionTitle}}>LeaderLine</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={leaderlineTextField}
                                        style={styles.textInput}
                                        placeholder={'"Leaderline"'}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='default'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={leaderLine}
                                        onChangeText={leaderLine => setLeaderLine(leaderLine)}
                                        leftIcon={ <Image source={require('../../assets/icons/outline/fishing-line2-outline.png')} style={{ width: 20, height: 20}} />}
                                    />
                                </View>
                            </View>

                            <Text style={{...styles.sectionTitle}}>Leaderline Type</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 20, }}>
                                <TouchableOpacity style={{ marginVertical: 10, marginRight: 10}} onPress={()=> setShowLeaderlineGearTypeModal(true)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '85%', flexDirection:'row', }}>
                                            <Text style={{ fontFamily:'Medium', fontSize: 16}}> { leaderLineType ? leaderLineType.gearTypeName ? leaderLineType.gearTypeName : leaderLineType : null } </Text>
                                        </View>
                                        <View style={{ width: '10%' }}>
                                            <SearchButton action={() => setShowLeaderlineGearTypeModal(true)}/>
                                        </View>
                                    </View> 
                                    <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                </TouchableOpacity>
                            </View>
                            {
                                showLeaderlineGearTypeModal ? 
                                    <GearTypeModal 
                                        isVisible={true} 
                                        type={'leaderline'}
                                        gearTypeSelected={setLeaderLineType}
                                        hideGearTypeModal={setShowLeaderlineGearTypeModal}
                                    />  
                                : null
                            }

                            <Text style={{...styles.sectionTitle}}>Leaderline Price</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                <View style={{...styles.textView, marginTop:5}}>
                                    <Input
                                        ref={rodTextField}
                                        style={styles.textInput}
                                        placeholderTextColor={theme.colors.gray2}
                                        textContentType={'none'}
                                        keyboardType='number-pad'
                                        autoCapitalize='none'
                                        spellCheck={false}
                                        autoCorrect={false}
                                        selectionColor={'rgba(0, 93, 160, 0.5)'}
                                        value={leaderLinePrice}
                                        onChangeText={leaderLinePrice => setLeaderLinePrice(leaderLinePrice)}
                                        leftIcon={ <Image source={require('../../assets/icons/philippines-peso-currency-symbol.png')} style={{ width: 18, height: 18}} />}
                                        onSubmitEditing={() => reelTextField.current.focus()}
                                    />
                                </View>
                            </View>


                            <Text style={{...styles.sectionTitle}}>Fishing Mode</Text>
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
                            <View style={{ marginVertical: 20 }}>
                                <ActionButton name={action + ' Gear'} onPress={action === 'Add' ? saveGearToFirebase : updateGearFromFirebase} outline/>
                                { action === 'Update' ? <ActionButton name={'Delete Gear'} onPress={deleteGearFromFirebase} /> : null}
                            </View>
                            
                        </ScrollView>
                }
                { isSaving ? <Loading name={'Saving...'}/> : null }
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