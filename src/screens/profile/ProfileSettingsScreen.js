import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Switch, ScrollView, ActivityIndicator, ActionSheetIOS } from 'react-native';
import Toast from 'react-native-toast-message';
import { Image } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Icon from "@expo/vector-icons";
import { theme } from '../../constants';
import { firebase } from '../../config/firebase';
import { Loading } from '../../components/common/Loading';
import { Divider } from '../../components/common/Divider';
import { Header } from '../../components/common/Header';
import { ActionButton } from '../../components/profile/ActionButton';
import { LogoutButton } from '../../components/profile/LogoutButton';
import { LocationListModal } from '../../components/profile/LocationListModal';

export const ProfileSettingsScreen = (props) => {
    const [user, setUser] = useState(props.route.params.user);
    const [currentUserFirebase, setCurrentUserFirebase] = useState(firebase.auth().currentUser);
    const [isUploading, setIsUploading] = useState(false);
    const [profileImagePath, setProfileImagePath] = useState(user.profilePicture);
    const [coverPhotoPath, setCoverPhotoPath] = useState(user.coverPhoto);
    const [isSaving, setIsSaving] = useState(false);

    const [profileImageStoragePath, setProfileImageStoragePath] = useState();
    const [coverImageStoragePath, setCoverImageStoragePath] = useState();

    const [showLocationList, setShowLocationList] = useState(false);
    const [showLocationListHome, setShowLocationListHome] = useState(false);

    //text input refs
    const firstNameRef = useRef();
    const titleRef = useRef();
    const contactRef = useRef();
    const homeAddressRef = useRef();
    const storeAddressRef = useRef();

    console.log(user);

    // Save to userProfile in firebase
    const [firstName, setFirstName] = useState(user.firstName);
    const [title, setTitle] = useState(user.title);
    const [contactNumber, setContactNumber] = useState(user ? user.contactNumber ? user.contactNumber : null : null);
    const [homeAddress, setHomeAddress] = useState(user ? user.homeAddress ? user.homeAddress : null : null);
    const [storeAddress, setStoreAdress] = useState(user ? user.storeAddress ? user.storeAddress : null : null);

    const [selectedBeginner, setSelectedBeginner] = useState(user ? user.selectedBeginner ? true : false : true);
    const [selectedExpert, setSelectedExpert] = useState(user ? user.selectedExpert ? true : false : false);

    const userTypes = ["Cancel", "Fisherman", "Hobbyist", "Tackle shop Owner", "Consumer"];
    const [userTypeSelected, setUserTypeSelected] = useState(user.type ? user.type : userTypes[2]); //default hobbyist
        
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const uploadProfileImage = async(path) => {
        const childPath = `profile/${currentUserFirebase.uid}/avatar/${Math.random().toString(36)}`;
        const response = await fetch(path);
        const blob = await response.blob();

        if(response && blob){

            const uploadProfileImageTask = firebase.storage().ref(childPath).put(blob);

            const taskProgress = snapshot => {
                console.log(`transferred: ${snapshot.bytesTransferred}`)
                setIsUploading(true);
            }

            const taskCompleted = () => {
                uploadProfileImageTask.snapshot.ref.getDownloadURL().then((profilePictureSnapshot) => {
                    if(profilePictureSnapshot){
                        setProfileImageStoragePath(profilePictureSnapshot);
                        setIsUploading(false);
                    }
                })
            }

            const taskError = snapshot => {
                console.log('task error:', snapshot)
                setIsUploading(false);
            }
            uploadProfileImageTask.on("state_changed", taskProgress, taskError, taskCompleted);
        }
    }

    const uploadCoverPhoto = async (path) => {
        const childPath = `profile/${currentUserFirebase.uid}/cover/${Math.random().toString(36)}`;
        const response = await fetch(path);
        const blob = await response.blob();

        if(response && blob){

            const uploadCoverPhotoTask = firebase
                .storage()
                .ref(childPath)
                .put(blob);

            const taskProgress = snapshot => {
                console.log(`transferred: ${snapshot.bytesTransferred}`)
                setIsUploading(true);
            }

            const taskCompleted = () => {
                uploadCoverPhotoTask.snapshot.ref.getDownloadURL().then((coverPhotoSnapshot) => {
                    if(coverPhotoSnapshot){
                        setIsUploading(false);
                        setCoverImageStoragePath(coverPhotoSnapshot);
                    }
                })
            }

            const taskError = snapshot => {
                console.log('task error:', snapshot)
            }
            uploadCoverPhotoTask.on("state_changed", taskProgress, taskError, taskCompleted);
        }
    }
    
    const pickProfileImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setProfileImagePath(result.uri);
            await uploadProfileImage(result.uri);
            console.log('new profile image state result:', profileImageStoragePath);
        }
    };

    const pickCoverPhoto = async() => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setCoverPhotoPath(result.uri);
            await uploadCoverPhoto(result.uri);
            console.log('new cover photo state result:', coverPhotoPath);
        }
    };

    const saveFieldsToFirebase = async() => {
        setIsSaving(true);
        await firebase
            .database()
            .ref('/user/' + currentUserFirebase.uid)
            .update({
                firstName: firstName,
                username: title ? title : '@',
                selectedBeginner: selectedBeginner,
                selectedExpert: selectedExpert,
                type: userTypeSelected,
                contactNumber: contactNumber,
                homeAddress : homeAddress.city ? homeAddress.city : homeAddress,
                homeAddressMap: homeAddress,
                storeAddress: storeAddress.city ? storeAddress.city : storeAddress,
                storeAddressMap: storeAddress,
                profilePicture: profileImageStoragePath ? profileImageStoragePath : user.profilePicture,
                coverPhoto: coverImageStoragePath ? coverImageStoragePath : user.coverPhoto,
                uuid: currentUserFirebase.uid,
            })
            .then(()=> {
                setIsSaving(false);
                Toast.show({
                    text1: 'Profile Settings saved!',
                    position: 'bottom',
                    bottomOffset: theme.dimensions.height * 0.1,
                    type: 'success',
                });
                props.navigation.navigate('Profile');
            })
            
    }

    const saveToFirebase = async() =>{

        console.log('saving firstName/title to firebase...', firstName, title, contactNumber);
        await saveFieldsToFirebase();
        
    }

    const EditButton = props => {
        return(
            <TouchableOpacity style={{...styles.smallButton, flexDirection:'column', alignItems:'flex-end'}} onPress={() => props.action()}>
                <Icon.MaterialIcons style={styles.headerIcon} name={'mode-edit'} size={16} color={theme.colors.primary} />
            </TouchableOpacity>
        );
    }

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Header navigation={props.navigation} name={'Profile Settings'} fontSize={16} icon={'keyboard-backspace'}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.cardGroup}>
                        {/* Profile Picture */}
                        <View style={{...styles.row, marginTop:10, }}>
                            <Text style={{...styles.sectionTitle, width:'80%'}}>Profile Picture</Text>
                            {/* <EditButton action={pickProfileImage}/> */}
                        </View>
                        <View style={{...styles.center, marginTop:5,}}>
                            <TouchableOpacity style={styles.profileImageView} onPress={pickProfileImage}>
                                <Image 
                                    style={styles.profileImage}
                                    source={{ uri: profileImagePath}}
                                    PlaceholderContent={<ActivityIndicator />}
                                />
                                <View style={{ position:'absolute', padding: 11, borderRadius: 23, backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
                                    <Icon.MaterialIcons name={'mode-edit'} size={20} color={theme.colors.white} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Divider/>
                        {/* Cover Photo */}
                        <View style={{...styles.row}}>
                            <Text style={{...styles.sectionTitle, width:'80%'}}>Cover Photo</Text>
                            {/* <EditButton action={pickCoverPhoto}/> */}
                        </View>
                        <View style={{...styles.center, marginTop:5}}>
                            <TouchableOpacity style={styles.profileImageView} onPress={pickCoverPhoto}>
                                <Image 
                                    style={styles.coverPhoto}
                                    source={{ uri: coverPhotoPath}}
                                    PlaceholderContent={<ActivityIndicator />}
                                />
                                <View style={{ position:'absolute', padding: 11, borderRadius: 23, backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
                                    <Icon.MaterialIcons name={'mode-edit'} size={20} color={theme.colors.white} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Divider/>
                        {/* Display Name */}
                        <View style={{...styles.row}}>
                        <Text style={{...styles.sectionTitle, width:'80%'}}>Name</Text>
                        <EditButton action={() => firstNameRef.current.focus()}/>
                        </View>
                        <View style={{...styles.textView, marginTop:5}}>
                            <TextInput
                                ref={firstNameRef}
                                style={styles.textInput}
                                placeholder={'"Juan M. Masul"'}
                                placeholderTextColor={theme.colors.gray2}
                                textContentType={'name'}
                                keyboardType='default'
                                autoCapitalize='none'
                                spellCheck={false}
                                autoCorrect={false}
                                selectionColor={'rgba(0, 93, 160, 0.5)'}
                                value={firstName}
                                maxLength={12}
                                onChangeText={firstName => setFirstName(firstName)}
                            />
                        </View>
                        <Divider/>

                        <View style={{...styles.row}}>
                            <Text style={{...styles.sectionTitle, width:'80%'}}>Username</Text>
                            <EditButton action={() => titleRef.current.focus()}/>
                        </View>
                        <View style={{...styles.textView, marginTop:5}}>
                            <TextInput
                                ref={titleRef}
                                style={styles.textInput}
                                placeholder={'"Mythical Angler"'}
                                placeholderTextColor={theme.colors.gray2}
                                textContentType={'none'}
                                keyboardType='default'
                                autoCapitalize='none'
                                spellCheck={false}
                                autoCorrect={false}
                                selectionColor={'rgba(0, 93, 160, 0.5)'}
                                value={title}
                                maxLength={20}
                                onChangeText={title => setTitle(title)}
                            />
                        </View>
                        <Divider/>

                        <View style={{...styles.row}}>
                            <Text style={{...styles.sectionTitle, width:'80%'}}>Email Address </Text>
                            {/* <EditButton action={() => setShowLocationListHome(true)}/> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                            <View style={{ marginVertical: 10}}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '100%', flexDirection:'row', paddingLeft: 5 }}>
                                        <Text style={{ fontFamily:'Medium', fontSize: 16}}>{ user.email }</Text>
                                    </View>
                                </View> 
                                <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                            </View>
                        </View>

                        {/* Contact Number */}
                        <View style={{...styles.row}}>
                            <Text style={{...styles.sectionTitle, width:'80%'}}>Contact Number</Text>
                            <EditButton action={() => contactRef.current.focus()}/>
                        </View>
                        <View style={{...styles.textView, marginTop:5}}>
                            <TextInput
                                ref={contactRef}
                                style={styles.textInput}
                                placeholder={'09XXXXXXXXX'}
                                placeholderTextColor={theme.colors.gray2}
                                textContentType={'telephoneNumber'}
                                keyboardType='phone-pad'
                                autoCapitalize='none'
                                spellCheck={false}
                                autoCorrect={false}
                                selectionColor={'rgba(0, 93, 160, 0.5)'}
                                value={contactNumber}
                                maxLength={11}
                                onChangeText={contactNumber => setContactNumber(contactNumber)}
                            />
                        </View>
                        <Divider/>
                        
                        <View style={{...styles.row}}>
                            <Text style={{...styles.sectionTitle, width:'80%'}}>Home Address </Text>
                            <EditButton action={() => setShowLocationListHome(true)}/>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
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

                        { userTypeSelected === userTypes[1] || userTypeSelected === userTypes[3] ?
                            <View>
                                <View style={{...styles.row}}>
                                    <Text style={{...styles.sectionTitle, width:'80%'}}>Store Address </Text>
                                    <EditButton action={() => setShowLocationList(true)}/>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                                    <TouchableOpacity style={{ marginVertical: 10}} onPress={() => setShowLocationList(true)}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '100%', flexDirection:'row', paddingLeft: 5 }}>
                                                <Text style={{ fontFamily:'Medium', fontSize: 16}}>{ storeAddress ? storeAddress.city ? storeAddress.city : storeAddress: null }</Text>
                                            </View>
                                        </View> 
                                        <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                                    </TouchableOpacity>
                                </View>
                                {
                                    showLocationList ?
                                        <LocationListModal isVisible={true} locationSelected={setStoreAdress} hideLocationModal={setShowLocationList}/>
                                    : null
                                }
                                
                            </View>
                            : null
                        }
                        
                        <Text style={{...styles.sectionTitle, marginTop: 5}}>User type </Text>
                        <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, }}>
                            <View style={{ marginVertical: 10}} >
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '100%', flexDirection:'row' }}>
                                        <Image source={require('../../assets/icons/outline/fisherman.png')} style={{ width: 20, height: 20, marginHorizontal: 10}} />
                                        <Text style={{ fontFamily:'Medium', fontSize: 16 }}>{ userTypeSelected }</Text>
                                    </View>
                                </View> 
                                <Divider style={ {width:theme.dimensions.width * 0.88, marginTop: 10, borderWidth: 1, borderColor: theme.colors.gray2}} />
                            </View>
                        </View>
                        
                        { userTypeSelected === userTypes[2] ?
                            <View>
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
                                <Divider/>
                            </View>
                        :
                            null
                        }
                        <ActionButton navigation={props.navigation} name={'Save profile changes'} onPress={saveToFirebase} outline/>
                    </View>
                    <Divider/>
                    {/* <Text style={styles.sectionTitle}>Notification settings</Text>
                    <View style={{...styles.row, marginVertical:10}}>
                        <View style={{...styles.row, marginTop:5}}>
                            <View style={{...styles.col_1, flexDirection:'row'}} >
                                <Text style={{...styles.inputLabel, paddingVertical:10, paddingRight:5,}}>Email</Text>
                                <Switch
                                    onValueChange={() => setEnableNotification(prevVal => !prevVal)}
                                    value={enableNotification}
                                />
                            </View>
                        </View>
                    </View>
                    <Divider/> */}
                    <View style={{...styles.row, marginVertical:10}}>
                        <Text style={styles.sectionTitle}>Account settings</Text>
                    </View>
                    <LogoutButton />
                </ScrollView>
                
                { isUploading ? <Loading name={'Uploading...'}/> : null }
                { isSaving ? <Loading name={'Saving...'}/> : null }

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        backgroundColor:theme.colors.white
    },
    wrapper:{
        paddingHorizontal:15,
        marginTop:30,
        paddingBottom:50,
    },
    row:{
        flexDirection:'row',
    },
    cardGroup:{
        // borderColor:theme.colors.gray4,
        // borderWidth:2,
    },
    title:{
        fontFamily:'Bold',
        fontSize:22,
        marginLeft:10,
        marginTop:5,
    },
    smallButton: {
        padding:10,
        marginLeft:15,
        flexDirection:'row',
        backgroundColor:theme.colors.gray4,
        borderRadius:23,
    },
    sectionTitle:{
        fontFamily:'Bold',
        fontSize:15 ,
        marginLeft:10,
        marginTop:5,
    },
    profileImageView: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    profileImage:{
        width:120,
        height:120,
        borderRadius:100,
        borderWidth:3,
        borderColor:theme.colors.gray2,
    },
    coverPhoto:{
        width:theme.dimensions.width * 0.9,
        height: 200,
        borderRadius:20,
        borderWidth:3,
        borderColor:theme.colors.gray2,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginRight:5
    },
    col_1:{
        width:'100%'
    },
    col_2:{
        width:'50%'
    },
    col_4:{
        width:'25%'
    },
    textView: {
        flexDirection:'row',
    },
    inputView:{
        height:44,
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.gray2,
        borderWidth: 2,
        borderRadius:23,
        paddingHorizontal:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:5,
        marginHorizontal:5,
        marginVertical:3,
        // shadowOffset:{  width: 2,  height: 2,  },
        // shadowColor: theme.colors.gray2,
        // shadowOpacity: 1.0,
        // elevation:6,
    },
    textInput:{
        fontFamily: 'Medium', 
        fontSize:16, 
        width: '100%', 
        textAlign:'left',
        paddingLeft:15,
    },
    inputLabel:{
        fontFamily:'Bold',
        fontSize:13 ,
        marginLeft:10,
        color: theme.colors.gray
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
});