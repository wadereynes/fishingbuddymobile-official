import React, { useState, useEffect } from 'react'
import {
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Keyboard,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { getRegion } from '../../models/map'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { MaterialIcons } from '@expo/vector-icons'
import { firebase } from '../../config/firebase'
import Geocoder from 'react-native-geocoding'
import moment from 'moment'
import * as Icon from '@expo/vector-icons'
import { theme } from '../../constants'
import HeaderButton from '../../components/UI/HeaderButton'
import * as ImagePicker from 'expo-image-picker'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

function EditHotspotScreen(props) {
  const [location, setLocation] = useState(null)
  const [messageText, setMessageText] = useState(null)
  const [sendButtonActive, setSendButtonActive] = useState(false)
  const [hotspot, setHotspot] = useState([])
  const [mylatitude, setMyLatitude] = useState(0)
  const [mylongitude, setMyLongitude] = useState(0)
  const [currentAddress, setCurrentAddress] = useState('')
  const [user, setUser] = useState()
  const [profileImagePath, setProfileImagePath] = useState(null)
  const [profileImageStorage, setProfileImageStorage] = useState()
  const [isUploading, setIsUploading] = useState(false)

  useEffect(async () => {
    await getLocation()
  }, [getLocation])

  useEffect(async () => {
    fetchHotpot()
  }, [fetchHotpot])

  useEffect(() => {
    getUserDetails()
  }, [getUserDetails])

  const uploadProfileImage = async (uri) => {
    const childPath = `hotspot/${Math.random().toString(36)}`
    const response = await fetch(uri)
    const blob = await response.blob()

    const uploadProfileImageTask = firebase.storage().ref(childPath).put(blob)
    if (response && blob) {
      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`)
        setIsUploading(true)
      }

      const taskCompleted = () => {
        uploadProfileImageTask.snapshot.ref
          .getDownloadURL()
          .then((profilePictureSnapshot) => {
            if (profilePictureSnapshot) {
              setIsUploading(false)
              console.log(
                'profilePictureSnapshot snapshot',
                profilePictureSnapshot
              )
              setProfileImageStorage(profilePictureSnapshot)
            }
          })
      }

      const taskError = (snapshot) => {
        console.log('task error:', snapshot)
      }
      uploadProfileImageTask.on(
        'state_changed',
        taskProgress,
        taskError,
        taskCompleted
      )
    }
  }

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setProfileImagePath(result.uri)
      console.log('new profile image state result:', profileImagePath)
      await uploadProfileImage(result.uri)
    }
  }

  const getUserDetails = async () => {
    var currentUser = firebase.auth().currentUser
    return new Promise(function (resolve, reject) {
      try {
        firebase
          .database()
          .ref('user/' + currentUser.uid)
          .once('value', (snapshot) => {
            if (snapshot.exists()) {
              resolve(snapshot.val())
              setUser(snapshot.val())
            }
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  const fetchHotpot = () => {
    return new Promise(function (resolve, reject) {
      firebase
        .database()
        .ref('hotspot')
        .limitToLast(2)
        .on('value', (datasnapshot) => {
          if (datasnapshot.exists()) {
            let user = []
            datasnapshot.forEach((child) => {
              user.push({
                key: child.key,
                address: child.val().address,
                latitude: child.val().latitude,
                longitude: child.val().longitude,
                text: child.val().text,
              })
            })
            resolve(datasnapshot.val())
            setHotspot(user)
            console.log(user)
          }
        })
    })
  }

  const onChangeText = (messageText) => {
    setMessageText(messageText)
    setSendButtonActive(messageText.length > 0)
  }

  const onSendPress = () => {
    const userId = firebase.auth().currentUser.uid
    const userName = user.firstName
    const urlPhoto = profileImageStorage
    console.log('urlPhoto: ', urlPhoto)
    if (sendButtonActive) {
      firebase
        .database()
        .ref('hotspot')
        .push({
          uuid: userId,
          name: userName,
          text: messageText,
          latitude: location.latitude,
          longitude: location.longitude,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          address: currentAddress,
          image: urlPhoto ? urlPhoto : '',
        })
        .then(() => {
          setMessageText(null)
          Keyboard.dismiss()
          props.navigation.navigate('Hotspot')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({})

      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      setMyLatitude(location.coords.latitude)
      setMyLongitude(location.coords.longitude)

      getAddress(location.coords.latitude, location.coords.longitude)

      map.animateToRegion(
        getRegion(location.coords.latitude, location.coords.longitude, 16000)
      )
    }
  }

  const getAddress = async (lat, lng) => {
    await Geocoder.init('AIzaSyBH-rhyR8tHJ0b6jsCqVkkZeYQKgKinndo')

    await Geocoder.from({ lat, lng })
      .then((json) => {
        var addressComponent = json.results[0].address_components[0]
        let addr = addressComponent.short_name
        setCurrentAddress(addr)
      })
      .catch((error) => console.warn(error))
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder='Type your spot name'
          onChangeText={(messageText) => onChangeText(messageText)}
          value={messageText}
        />

        <TouchableOpacity
          style={styles.profileImageView}
          onPress={pickProfileImage}
        >
          <Image
            style={styles.profileImage}
            source={!profileImageStorage ? '' : { uri: profileImageStorage }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View
            style={{
              position: 'absolute',
              padding: 11,
              borderRadius: 23,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <Icon.MaterialIcons
              name={'insert-photo'}
              size={25}
              color={theme.colors.primary}
            />
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{
              ...styles.submit,
              ...(sendButtonActive ? styles.sendButtonActive : {}),
            }}
            onPress={onSendPress.bind(this)}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Save Spot
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Icon.Ionicons
            style={{ paddingTop: 0 }}
            name={'ios-menu'}
            size={25}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>

      <MapView
        ref={(ref) => (map = ref)}
        style={styles.map}
        initialRegion={getRegion(10.242553, 123.839827, 160000)}
      >
        <Marker
          coordinate={{
            latitude: mylatitude,
            longitude: mylongitude,
          }}
        >
          <Callout>
            <View style={styles.callout}>
              <Text
                style={{
                  textAlign: 'center',
                }}
              >
                Im' Here
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Add Hotspot',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width,
    height: 400,
  },
  inputWrapper: {
    width: '100%',
    padding: 10,
    zIndex: 100,
  },
  submit: {
    backgroundColor: '#005da0',
    color: '#fff',
    textAlign: 'center',
    height: 46,
    paddingVertical: 12,
    borderRadius: 6,
    marginVertical: 5,
    opacity: 1,
  },
  input: {
    height: 46,
    paddingVertical: 10,
    paddingRight: 50,
    paddingLeft: 10,
    borderColor: '#005da0',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#005da0',
    backgroundColor: '#fff',
  },
  sendButtonActive: {
    opacity: 1,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  stroke: {
    width: 35,
    height: 35,
    borderRadius: 50,
    resizeMode: 'stretch',
    zIndex: 1,
  },
  core: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    borderRadius: 50,
    resizeMode: 'stretch',
    zIndex: 2,
  },
  callout: {
    width: 100,
  },
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    marginVertical: 10,
    borderRadius: 6,
    borderColor: '#005da0',
  },
})

export default EditHotspotScreen
