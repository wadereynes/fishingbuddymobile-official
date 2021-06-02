import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as Icon from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

import { theme } from '../../constants';
import { Loading } from '../common/Loading';
import { firebase } from '../../config/firebase';
import { Button } from '../common/Button';
import { FishListModal } from '../discover/FishListModal';
import { FishInfoCard } from '../discover/FishInfoCard';

export const CreatePost = props => {

    const [userProfile, setUserProfile] = useState();
    const [postImagePath, setPostImagePath] = useState();
    const [currentUserFirebase, setCurrentUserFirebase] = useState(firebase.auth().currentUser);
    const [isUploading, setIsUploading] = useState(false);
    const [postImagePathStorage, setPostImagePathStorage] = useState();
    const [description, setDescription] = useState();
    const [checkboxIsCatch, setCheckboxIsCatch] = useState(false);
    const [modalVisible, setIsModalVisible] = useState(false);
    const [fishSelected, setFishSelected] = useState(false);

    const selectFish = x => {
        setFishSelected(x);
    }

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


    useEffect(() => {
        getUserDetails();
    }, []);

    const pickPostImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setPostImagePath(result.uri);
            await uploadPostImage(result.uri);
        }
    };

    const uploadPostImage = async(path) => {
        const childPath = `profile/${currentUserFirebase.uid}/post/${Math.random().toString(36)}`;
        const response = await fetch(path);
        const blob = await response.blob();

        if(response && blob){

            const uploadPostImageTask = firebase.storage().ref(childPath).put(blob);

            const taskProgress = snapshot => {
                console.log(`transferred: ${snapshot.bytesTransferred}`)
                setIsUploading(true);
            }

            const taskCompleted = () => {
                uploadPostImageTask.snapshot.ref.getDownloadURL().then((postImageSnapshot) => { 
                    setPostImagePathStorage(postImageSnapshot);
                    setIsUploading(false);
                })
            }

            const taskError = snapshot => {
                console.log('task error:', snapshot)
            }
            uploadPostImageTask.on("state_changed", taskProgress, taskError, taskCompleted);
        }
    }

    const savePostToFirebase = async() => {
        console.log('saving to firebase....', currentUserFirebase.uid);
        await firebase
            .database()
            .ref('/user/'+ currentUserFirebase.uid +'/posts')
            .push({
                description: description,
                image: postImagePathStorage,
                datePosted: Date.now(),
                author: userProfile.firstName ? userProfile.firstName : null,
                authorNameAlt: userProfile.displayName ? userProfile.displayName : null,
                authorTitle: userProfile.title ? userProfile.title : null,
                authorAvatar: userProfile.profilePicture ? userProfile.profilePicture : null,
                isCatch: checkboxIsCatch,
                catch: fishSelected ? fishSelected : null,
            })
            .then(
                props.navigation.navigate('Profile')
            )
    }

    const validateFields = () => {
        if(!description){
            Toast.show({
                text1: 'Please provide a description',
                position: 'bottom',
                bottomOffset: theme.dimensions.height * 0.1,
                type: 'error',
            });
        }
        else if(!postImagePathStorage){
            Toast.show({
                text1: 'Please provide an image',
                position: 'bottom',
                bottomOffset: theme.dimensions.height * 0.1,
                type: 'error',
            });
        }
        else {
            savePostToFirebase();
        }
        
    }

    const getUserDetails = async() => {
        var currentUser = firebase.auth().currentUser;
        if(currentUser){
            await firebase.database().ref('user/' + currentUser.uid).once('value', snapshot => { setUserProfile(snapshot.val()) });
        }
    }

    return (
        <View style={{
            flex:1,
            alignItems:'center',
        }}>
        {
            !userProfile ?
                <View style={{ justifyContent: 'center', position: 'absolute', margin:250, paddingLeft: 500 }}>
                    <Loading name={'Loading...'}/>
                </View>
            :
            <View style={styles.post}>
                
                {/* Post Header */}
                <View style={styles.postHeader}>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: theme.colors.gray4}}
                        source={{ uri: userProfile.profilePicture }}
                    />
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <Text style={{ fontFamily: 'Bold', fontSize: 18 }}>
                            {userProfile.firstName ? userProfile.firstName : userProfile.displayName}
                        </Text>
                        <Text style={{ fontFamily: 'Regular' }}>
                            {userProfile.title}
                        </Text>
                    </View>
                    <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={validateFields} disabled={isUploading}>
                        <Button button={{buttonName: 'Post'}}/>
                    </TouchableOpacity>
                </View>
                {/* Post Content */}
                <View style={{ paddingHorizontal: 6 }}>
                    {/* Post Content Text */}
                    <Input 
                        value={description}
                        onChangeText={description => setDescription(description)}
                        style={{ fontFamily: 'Medium' }} 
                        multiline={true} 
                        placeholder={'What did you catch today?'}
                        placeholderTextColor={theme.colors.gray2}
                        >
                    </Input>
                    <TouchableOpacity onPress={pickPostImage}>
                        
                        { !postImagePath ? 
                        <View>
                            
                            <View style={ {...styles.postContentImage, backgroundColor: theme.colors.gray2}}></View>
                            <View style={{ flexDirection:'row', position:'absolute', padding: 11, borderRadius: 23, backgroundColor: 'rgba(255, 255, 255, 0.3)', marginTop: theme.dimensions.width * 0.3,  marginLeft: theme.dimensions.width * 0.265}}>
                                <Icon.MaterialIcons name={'mode-edit'} size={25} color={theme.colors.white} />
                                <Text style={{ fontFamily:'Medium', fontSize: 14, color: theme.colors.white, paddingVertical: 5}}>Add Photo</Text> 
                            </View>                        
                        </View>
                        : 
                            <View>
                                <Image
                                    style={styles.postContentImage}
                                    source={{
                                        uri: postImagePath,
                                    }}
                                />
                                <View style={{ flexDirection:'row', position:'absolute', padding: 11, borderRadius: 23, backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
                                    <Icon.MaterialIcons name={'mode-edit'} size={25} color={theme.colors.white} />
                                </View>
                            </View>
                        } 
                    </TouchableOpacity>
                    { isUploading ? <Loading name={'Uploading...'} /> : null }
                    <CheckBox
                        containerStyle={{ marginLeft: 0, width: '100%' }}
                        textStyle={{ fontFamily: 'Medium' }}
                        title={'Mark as Catch?'}
                        checked={checkboxIsCatch}
                        onPress={()=> setCheckboxIsCatch(!checkboxIsCatch)}
                    />
                    {
                        checkboxIsCatch ? 
                            <View>
                                <FishListModal isVisible={true} fishSelected={selectFish}/>
                                <FishInfoCard fish={fishSelected}/>
                            </View>
                        : null
                    }
                </View>
            </View>
        }
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        borderRadius: 4,
        backgroundColor: '#fff',
        width: theme.dimensions.width * 0.89
    },
    postHeader: { 
        padding: 6, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    postContentImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    interactionBar: {
        backgroundColor: '#fafafa',
        height: 40,
        marginHorizontal: 20,
        marginTop: -20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    interactionText: {
        fontFamily: 'Regular',
        color: '#000',
        marginLeft: 4,
    },
    interactionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
    },
});
