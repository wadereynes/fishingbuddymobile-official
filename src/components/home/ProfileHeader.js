import React, { useEffect } from 'react'
import {
  Alert,
  ActionSheetIOS,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Image } from 'react-native-elements'
import { theme } from '../../constants'
import * as Icon from '@expo/vector-icons'

export const ProfileHeader = (props) => {
  const [gearStat, setGearStat] = React.useState(
    props.user.fishingGears ? Object.keys(props.user.fishingGears).length : 0
  )
  return (
    <View style={styles.profileContainer}>
      <View style={styles.headerTopContainer}>
        <View style={styles.profileImageView}>
          {props.user ? (
            <Image
              style={styles.profileImage}
              source={{ uri: props.user.profilePicture }}
              PlaceholderContent={<ActivityIndicator />}
            />
          ) : (
            <Image
              style={styles.profileImage}
              source={require('../../assets/images/avatar.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
          )}
        </View>
      </View>
      {/* Profile */}
      <View style={styles.nameAndBioView}>
        {props.user.type === 'Fisherman' ? (
          <Image
            source={require('../../assets/icons/ribbon-fisherman.png')}
            style={{ width: 90, height: 15, marginBottom: 5 }}
            transition={false}
          />
        ) : props.user.type === 'Hobbyist' ? (
          <Image
            source={require('../../assets/icons/ribbon-hobbyist.png')}
            style={{ width: 90, height: 15, marginBottom: 5 }}
            transition={false}
          />
        ) : props.user.type === 'Tackle shop Owner' ? (
          <Image
            source={require('../../assets/icons/ribbon-tackleshop.png')}
            style={{ width: 90, height: 15, marginBottom: 5 }}
            transition={false}
          />
        ) : (
          <Image
            source={require('../../assets/icons/ribbon-consumer.png')}
            style={{ width: 90, height: 15, marginBottom: 5 }}
            transition={false}
          />
        )}
        {props.user ? (
          <Text style={styles.userFullName}>{props.user.firstName}</Text>
        ) : (
          <Text>No user loaded</Text>
        )}
        <Text style={styles.userBio}>{props.user.title}</Text>
      </View>
      {/* Interactive Buttons */}
      <View style={styles.interactButtonsView}>
        <TouchableOpacity
          style={styles.interactButton}
          onPress={() => props.navigation.navigate('CreatePost')}
        >
          <Text style={styles.interactButtonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() =>
            props.navigation.navigate('Message', {
              screen: 'Message',
              guestUid: props.user.uuid,
              UserName: props.user.firstName,
              profilePic: props.user.profilePicture,
            })
          }
        >
          <Icon.MaterialIcons
            style={styles.headerIcon}
            name={'message'}
            size={25}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() =>
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: ['Cancel', 'Block User'],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
              },
              (buttonIndex) => {
                if (buttonIndex === 0) {
                  // cancel action
                } else {
                }
              }
            )
          }
        >
          <Icon.MaterialCommunityIcons
            style={styles.headerIcon}
            name={'dots-horizontal'}
            size={25}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      {/* Mutual Followed By Text */}
      {/* <View style={{ paddingHorizontal:25, marginTop:10,}}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Followers')}>
                    <Text style={{
                        fontFamily:'Medium', 
                        fontSize:12
                    }}>
                        {'Followed by '}
                        <Text style={{fontFamily:'Bold'}}>john_wade</Text>
                        {' and '}
                        <Text style={{fontFamily:'Bold'}}>10 others</Text>
                    </Text>
                </TouchableOpacity>
                
            </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  coverImage: {
    height: 300,
    width: '100%',
  },
  headerTopContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    backgroundColor: theme.colors.white,
    marginTop: -110,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: {
    alignItems: 'center',
    marginTop: -80,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  nameAndBioView: {
    alignItems: 'center',
    marginTop: -10,
  },
  userFullName: {
    fontFamily: 'Bold',
    fontSize: 20,
  },
  userBio: {
    fontFamily: 'Medium',
    fontSize: 14,
    color: theme.colors.gray,
    marginTop: 1,
  },
  countsView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  countView: {
    flex: 1,
    alignItems: 'center',
  },
  countNum: {
    fontFamily: 'Bold',
    fontSize: 14,
  },
  countText: {
    fontFamily: 'Medium',
    fontSize: 12,
  },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    margin: 5,
    borderRadius: 23,
  },
  interactButtonText: {
    fontFamily: 'Bold',
    color: theme.colors.white,
    fontSize: 17,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary,
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: theme.colors.black,
  },
  showContentButtonText: {
    fontFamily: 'Medium',
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 5,
  },
  buttonClose: {
    backgroundColor: theme.colors.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Medium',
  },
  smallButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.gray4,
    borderRadius: 23,
  },
  smallButtonText: {
    color: theme.colors.primary,
    fontFamily: 'Bold',
  },
  headerIcon: {
    height: 25,
    width: 25,
  },
})
