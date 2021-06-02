import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { firebase } from '../../config/firebase'
import Colors from '../../constants/Colors'
import * as Icon from '@expo/vector-icons'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch } from 'react-redux'
import { SendMessage, ReceiveMessage } from '../../models/Message'
import HeaderButton from '../../components/UI/HeaderButton'

import { Ionicons } from '@expo/vector-icons'

function MessageScreen(props) {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [guestUid, setGuestUID] = useState('')
  const [currentUid, setCurrentUID] = useState('')
  const [allMessages, setAllMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  useEffect(() => {
    setIsLoading(true)
    fetchMessages().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, fetchMessages])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', fetchMessages)

    return () => {
      unsubscribe()
    }
  }, [fetchMessages])

  const fetchMessages = async () => {
    const currentUid = firebase.auth().currentUser.uid
    // console.log('SenderID: ', currentUid)
    // const guestUid = this.props.navigation.getParam('guestUid')
    const guestUid = props.route.params.guestUid
    // console.log('ReceiverID: ', guestUid)
    // console.log('UserName: ', props.route.params.UserName)
    //this.setState({ currentUid: currentUid, guestUid: guestUid })
    setCurrentUID(currentUid)
    setGuestUID(guestUid)

    try {
      await firebase
        .database()
        .ref('messages')
        .child(currentUid)
        .child(guestUid)
        .on('value', (dataSnapshot) => {
          let message = []
          dataSnapshot.forEach((data) => {
            message.push({
              key: data.key,
              sendBy: data.val().message.sender,
              receiveBy: data.val().message.receiver,
              msg: data.val().message.msg,
              timenow: data.val().message.time,
            })
          })
          //this.setState({ allMessages: message.reverse(), loader: false })
          setAllMessages(message.reverse())
          // console.log('allMessages: ', allMessages)
        })
    } catch (error) {
      alert(error)
    }
  }

  function getTime(date) {
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    var strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  let currentTime = getTime(new Date())

  sendMessage = async () => {
    if (message) {
      SendMessage(currentUid, guestUid, message, currentTime)
        .then(() => {
          // this.setState({ message: null })
          setMessage('')
        })
        .catch((err) => {
          alert(err)
        })

      ReceiveMessage(currentUid, guestUid, message, currentTime)
        .then(() => {
          // this.setState({ message: null })
          setMessage('')
        })
        .catch((err) => {
          alert(err)
        })
    }
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <FlatList
          // extraData={this.state}
          onRefresh={fetchMessages}
          refreshing={isLoading}
          style={{ backgroundColor: '#f2f2ff' }}
          inverted={true}
          data={allMessages}
          keyExtractor={(index) => index.key}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() => {
                  setShowDelete((prevState) => !prevState)
                }}
              >
                <View
                  style={{
                    marginTop: 6,
                    flexDirection: 'row',
                    alignSelf:
                      currentUid === item.sendBy ? 'flex-end' : 'flex-start',
                  }}
                >
                  {showDelete && currentUid === item.sendBy && (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            'Delete Message',
                            'Cannot be undone',
                            [
                              { text: 'Cancel' },
                              {
                                text: 'OK',
                                onPress: () => {
                                  const refMsg = firebase
                                    .database()
                                    .ref('messages')
                                    .child(currentUid)
                                    .child(guestUid)
                                    .child(item.key)
                                  refMsg.remove()
                                },
                              },
                            ],
                            { cancelable: false }
                          )
                        }}
                      >
                        <Ionicons
                          name={
                            Platform.OS === 'android' ? 'md-trash' : 'ios-trash'
                          }
                          size={23}
                          color='#005da0'
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  <View
                    style={{
                      maxWidth: Dimensions.get('screen').width * 0.8,
                      backgroundColor:
                        currentUid === item.sendBy ? '#005da0' : '#fff',
                      alignSelf:
                        currentUid === item.sendBy ? 'flex-end' : 'flex-start',
                      marginHorizontal: 10,
                      padding: 10,
                      borderRadius: 8,
                      borderBottomLeftRadius:
                        currentUid === item.sendBy ? 8 : 0,
                      borderBottomRightRadius:
                        currentUid === item.sendBy ? 0 : 8,
                    }}
                  >
                    <Text
                      style={{
                        color: currentUid === item.sendBy ? '#fff' : '#050505',
                        fontSize: 14,
                        fontFamily: 'Regular',
                      }}
                    >
                      {item.msg}
                    </Text>
                    <Text
                      style={{
                        color: currentUid === item.sendBy ? '#fff' : '#050505',
                        fontSize: 14,
                        alignSelf: 'flex-end',
                        opacity: 0.7,
                        fontFamily: 'Regular',
                      }}
                    >
                      {item.timenow}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </TouchableWithoutFeedback>
          )}
        />

        <View style={{ paddingVertical: 10 }}>
          <View style={styles.messageInputView}>
            <TextInput
              style={styles.messageInput}
              placeholder='Aa'
              onChangeText={(text) => setMessage(text)}
              value={message}
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => sendMessage()}
            >
              <Icon.MaterialIcons name={'send'} size={25} color='#000' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export const screenOptions = (navData) => {
  console.log(navData);
  return {
    headerTitle: '',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => {
              navData.navigation.goBack()
            }}
          >
            <Icon.MaterialIcons name={'arrow-back'} size={30} color='#fff' />
          </TouchableOpacity>
          <Image
            style={styles.userProfileImage}
            source={{ uri: navData.route.params.profilePic }}
          />
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
              {navData.route.params.UserName}
            </Text>
            <Text style={{ color: '#fff', fontWeight: '300' }}>
              View Profile
            </Text>
          </View>
        </View>
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  container: {},
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
  container: {
    flex: 1,
    backgroundColor: '#f2f2ff',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'Regular',
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
})

export default MessageScreen
