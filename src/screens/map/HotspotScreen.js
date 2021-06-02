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
  FlatList,
  SafeAreaView,
} from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
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
import { getDistance } from 'geolib'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

function HotspotScreen(props) {
  const [location, setLocation] = useState(null)
  const [messageText, setMessageText] = useState(null)
  const [sendButtonActive, setSendButtonActive] = useState(false)
  const [hotspot, setHotspot] = useState([])
  const [mylatitude, setMyLatitude] = useState(0)
  const [mylongitude, setMyLongitude] = useState(0)
  const [currentAddress, setCurrentAddress] = useState('')
  const [user, setUser] = useState()

  useEffect(async () => {
    await getLocation()
  }, [getLocation])

  useEffect(async () => {
    await fetchHotpot()
  }, [fetchHotpot])

  useEffect(async () => {
    await getUserDetails()
  }, [getUserDetails])

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
                name: child.val().name,
                image: child.val().image,
              })
            })
            resolve(datasnapshot.val())

            setHotspot(user)
            console.log(user)
          }
        })
    })
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
        // console.log(addressComponent.long_name)
        let addr = addressComponent.short_name
        // console.log(addr)
        setCurrentAddress(addr)
      })
      .catch((error) => console.warn(error))
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={(ref) => (map = ref)}
        style={styles.map}
        //   initialRegion={getRegion(48.860831, 2.341129, 160000)}
        //10.315599589582396, 123.88543121561945
        initialRegion={getRegion(10.242553, 123.839827, 160000)}
        provider={PROVIDER_GOOGLE}
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
        {hotspot.map((message, index) => {
          let { latitude, longitude, text, address } = message
          // var dis = getDistance(
          //   { latitude: mylatitude, longitude: mylongitude },
          //   { latitude: latitude, longitude: longitude }
          // )
          // var kms = dis / 1000
          // console.log('distance: ', kms + text)
          return (
            <Marker
              ref={(ref) => (marker = ref)}
              key={index}
              identifier={'marker_' + index}
              coordinate={{ latitude, longitude }}
            >
              <View style={styles.circle}>
                <View style={styles.stroke} />
                <Image
                  style={styles.core}
                  source={require('../../assets/fishpin.png')}
                />
              </View>
              <Callout>
                <View style={styles.callout}>
                  <Text>{text}</Text>
                  {/* <Text style={{ color: '#999' }}>
                      {moment(timestamp).fromNow()}
                    </Text> */}
                  <Text style={{ color: '#999' }}>{address}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
      <ScrollView>
        <View style={styles.inputWrapper}>
          {/* <TextInput
          style={styles.input}
          placeholder='Type your spot name'
          onChangeText={(messageText) => onChangeText(messageText)}
          value={messageText}
        />
        <View
          style={{
            ...styles.sendButton,
            ...(sendButtonActive ? styles.sendButtonActive : {}),
          }}
        >
          <TouchableOpacity onPress={onSendPress.bind(this)}>
            <MaterialIcons name='location-pin' size={32} color='#005da0' />
          </TouchableOpacity>
        </View>
        <Text>{mylatitude}</Text>
        <Text>{mylongitude}</Text>
        <Text>{currentAddress}</Text> */}
          {hotspot.map((message, index) => {
            let { latitude, longitude, text, address, image, name } = message
            var dis = getDistance(
              { latitude: mylatitude, longitude: mylongitude },
              { latitude: latitude, longitude: longitude }
            )
            var kms = dis / 1000

            // console.log('distance: ', kms + text)
            return (
              <View
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: 'row', marginBottom: 15 }}
                  onPress={() =>
                    // props.navigation.navigate('MessageWade', {
                    props.navigation.navigate('Hotspot')
                  }
                >
                  <View
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      
                    }}
                  >
                    <Image
                      style={styles.profileImage}
                      source={{ uri: image }}
                    />
                  </View>
                  <View
                    style={{
                      width: '85%',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: '#005da0',
                        fontSize: 16,
                        fontWeight: 'Medium',
                      }}
                    >
                      {text}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 12,
                        fontFamily:'Medium',
                      }}
                    >
                      {kms} km away from you
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: '#005da0' }} />
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Hotspot',
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    width,
    height: 500,
  },
  inputWrapper: {
    width: '100%',
    // position: 'absolute',
    // padding: 10,
    // top: StatusBar.currentHeight,
    // left: 0,
    // zIndex: 100,
    flex: 1,
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
  // sendButton: {
  //   position: 'absolute',
  //   top: 17,
  //   right: 20,
  //   opacity: 0.4,
  // },
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
    // backgroundColor: '#fff',
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
    // backgroundColor: 'red',
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
  profileImage: {
    width: 50,
    height: 50,
  },
})

export default HotspotScreen
