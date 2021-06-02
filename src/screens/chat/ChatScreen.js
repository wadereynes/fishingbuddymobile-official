import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native'

import { firebase } from '../../config/firebase'
import Colors from '../../constants/Colors'
import { useDispatch } from 'react-redux'
import { HeaderSimple } from '../../components/marketplace/HeaderSimple'
import { Header } from '../../components/common'

const ChatScreen = (props) => {
  console.log(props)
  const state = {
    allUsers: [],
  }
  const dispatch = useDispatch()
  const [AllUsers, setAllUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    getUserDetails()
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getUserDetails().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, getUserDetails])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', getUserDetails)

    return () => {
      unsubscribe()
    }
  }, [getUserDetails])

  const getUserDetails = async () => {
    return new Promise(function (resolve, reject) {
      try {
        firebase
          .database()
          .ref('user')
          .once('value', (datasnapshot) => {
            if (datasnapshot.exists()) {
              const uuid = firebase.auth().currentUser.uid

              new Promise((resolve, reject) => {
                let user = []
                let lastMessage = ''
                let lastDate = ''
                let lastTime = ''
                let properDate = ''

                datasnapshot.forEach((child) => {
                  if (child.val().uuid === uuid) {
                  } else {
                    let newUser = {
                      userId: '',
                      userName: '',
                      userProPic: '',
                      lastMessage: '',
                      lastDate: '',
                      lastTime: '',
                      properDate: '',
                    }
                    new Promise((resolve, reject) => {
                      firebase
                        .database()
                        .ref('messages')
                        .child(uuid)
                        .child(child.val().uuid)
                        .orderByKey()
                        .limitToLast(1)
                        .on('value', (dataSnapshots) => {
                          if (dataSnapshots.val()) {
                            dataSnapshots.forEach((child) => {
                              lastMessage = child.val().message.msg
                              lastTime = child.val().message.time
                            })
                          } else {
                            lastMessage = ''
                            lastTime = ''
                          }
                          newUser.userId = child.val().uuid
                          newUser.userName = child.val().firstName
                          newUser.userProPic = child.val().profilePicture
                          newUser.lastMessage = lastMessage
                          newUser.lastTime = lastTime
                          return resolve(newUser)
                        })
                    }).then((newUser) => {
                      user.push({
                        key: child.key,
                        userName: newUser.userName,
                        profileImage: newUser.userProPic,
                        uuid: newUser.userId,
                        lastMessage: newUser.lastMessage,
                        lastTime: newUser.lastTime,
                      })
                      setUserProfile(user)
                    })
                    return resolve(user)
                  }
                })
              }).then((user) => {
                setUserProfile(user)
              })
              resolve(datasnapshot.val())
            }
          })
      } catch (error) {
        // alert(error)
        reject(error)
      }
    })
  }

  console.log(props)

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        //   alwaysBounceVertical={false}
        data={userProfile}
        style={{ padding: 0 }}
        // keyExtractor={(_, index) => index.toString()}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={{
                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fafafa',
                borderBottomWidth: 1,
                borderBottomColor: '#dfe4ea',
              }}
              onPress={() =>
                // props.navigation.navigate('MessageWade', {
                props.navigation.navigate('Message', {
                  UserName: item.userName,
                  profilePic: item.profileImage,
                  guestUid: item.uuid,
                })
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
                  source={{ uri: item.profileImage }}
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
                  style={{ color: '#005da0', fontSize: 16, fontWeight: 'bold' }}
                >
                  {item.userName}
                </Text>
                <Text
                  style={{ color: '#005da0', fontSize: 14, fontWeight: '600' }}
                >
                  {item.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  profileImage: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
  },
})

export default ChatScreen
