import React, { useState, useEffect, useCallback, useReducer } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'
import { firebase } from '../../config/firebase'
import * as ImagePicker from 'expo-image-picker'
import { theme } from '../../constants'
import * as Icon from '@expo/vector-icons'
import { HeaderSimple } from '../../components/marketplace/HeaderSimple'
import { Divider } from 'react-native-elements'
import { FishInfoCard } from '../../components/discover/FishInfoCard'
import { FishListModal } from '../../components/discover/FishListModal'
import { Loading } from '../../components/common/Loading'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    }
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    }
  }
  return state
}

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const [isUploading, setIsUploading] = useState(false)
  const [profileImagePath, setProfileImagePath] = useState(null)
  const [profileImageStorage, setProfileImageStorage] = useState()
  const [userProfile, setUserProfile] = useState()
  const [user, setUser] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [fishSelected, setFishSelected] = useState(false)
  const createdDate = Date.now()

  const selectFish = (x) => {
    setFishSelected(x)
  }

  const toggleFishListModal = (x) => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    getUserDetails()
  }, [user])

  const getUserDetails = async () => {
    var currentUser = firebase.auth().currentUser
    if (currentUser) {
      return new Promise(function (resolve, reject) {
        try {
          firebase
            .database()
            .ref('user/' + currentUser.uid)
            .once('value', (snapshot) => {
              if (snapshot.exists()) {
                resolve(snapshot.val())
                // setUserProfile(snapshot.val())
                setUser(snapshot.val().type)
              }
            })
        } catch (e) {
          reject(e)
        }
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const uploadProfileImage = async (uri) => {
    const childPath = `wade/${Math.random().toString(36)}`
    // const response = await fetch(profileImagePath)
    const response = await fetch(uri)
    const blob = await response.blob()

    const uploadProfileImageTask = firebase.storage().ref(childPath).put(blob)
    if (response && blob) {
      // const uploadProfileImageTask = firebase.storage().ref(childPath).put(blob)

      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`)
        setIsUploading(true)
        setIsLoading(true)
      }

      const taskCompleted = () => {
        uploadProfileImageTask.snapshot.ref
          .getDownloadURL()
          .then((profilePictureSnapshot) => {
            if (profilePictureSnapshot) {
              setIsUploading(false)
              setIsLoading(false)
              console.log(
                'profilePictureSnapshot snapshot',
                profilePictureSnapshot
              )
              setProfileImageStorage(profilePictureSnapshot)
              // firebase
              //   .database()
              //   .ref('/user/' + currentUserFirebase.uid)
              //   .update({
              //     profilePicture: profilePictureSnapshot,
              //   })
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

  // const uploadedUrl = await uploadProfileImage(url);
  // console.log(uploadedUrl)

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      //const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setProfileImagePath(result.uri)
      console.log('new profile image state result:', profileImagePath)
      await uploadProfileImage(result.uri)
    }
  }

  // const saveToFirebase = async () => {
  //   // if(profileImagePath != user.profileImage){
  //   console.log('saving profileImage to firebase...', profileImagePath)
  //   await uploadProfileImage()
  //   // }
  // }

  const prodId = props.route.params ? props.route.params.productId : null
  const urlPhoto = profileImageStorage

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  )

  const [categories] = useState(
    [
      'bait',
      'lure',
      'net',
      'reel',
      'rod',
      'braidline',
      'leaderline',
      'clothes',
    ].sort()
  )

  const [selectedCategory, setSelectedCategory] = useState(
    editedProduct ? editedProduct.category : 'fish'
  )

  const [islisted] = useState(['yes', 'no'])

  const [listed, setListed] = useState(
    editedProduct ? editedProduct.isListed : 'yes'
  )

  const category = selectedCategory

  const isListed = listed

  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      // category: editedProduct ? editedProduct.category : '',
      // imageUrl: editedProduct ? editedProduct.imageUrl : '',
      // profileImageStorage
      description: editedProduct ? editedProduct.description : '',
      stock: editedProduct ? editedProduct.stock : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      // category: editedProduct ? true : false,
      // imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      stock: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  })

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Okay' }])
    }
  }, [error])

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ])
      return
    }
    if (!editedProduct && urlPhoto === undefined) {
      Alert.alert('Image Required', 'Please upload image', [{ text: 'Okay' }])
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            urlPhoto,
            category,
            isListed,
            formState.inputValues.stock,
            fishSelected,
            createdDate
            // formState.inputValues.imageUrl
          )
        )
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            urlPhoto,
            category,
            isListed,
            formState.inputValues.stock,
            // formState.inputValues.imageUrl,
            +formState.inputValues.price,
            fishSelected,
            createdDate
          )
        )
      }
      Toast.show({
        text1: 'Product saved!',
        position: 'bottom',
        bottomOffset: theme.dimensions.height * 0.1,
        type: 'success',
      })
      props.navigation.goBack()
    } catch (err) {
      setError(err.message)
    }

    setIsLoading(false)
  }, [
    dispatch,
    prodId,
    formState,
    urlPhoto,
    category,
    isListed,
    fishSelected,
    createdDate,
  ])

  //   useEffect(() => {
  //     props.navigation.setOptions({
  //       headerRight: () => (
  //         <HeaderButtons HeaderButtonComponent={HeaderButton}>
  //           <Item
  //             title='Save'
  //             iconName={
  //               Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
  //             }
  //             onPress={submitHandler}
  //           />
  //         </HeaderButtons>
  //       ),
  //     })

  //   }, [submitHandler])

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      })
    },
    [dispatchFormState]
  )

  // const urlPhoto = profileImageStorage != null ? profileImageStorage : 'wade'
  return (
    <View style={{ backgroundColor: 'white' }}>
      <HeaderSimple
        headerTitle={props.route.params.headerTitle}
        navigation={props.navigation}
        origin={
          props.route.params
            ? props.route.params.origin
              ? props.route.params.origin
              : null
            : null
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* <Text>{profileImageStorage}</Text> */}
        <View style={styles.form}>
          <TouchableOpacity
            style={styles.profileImageView}
            onPress={pickProfileImage}
          >
            <Image
              style={styles.profileImage}
              source={
                editedProduct
                  ? !profileImageStorage
                    ? { uri: editedProduct.urlPhoto }
                    : { uri: urlPhoto }
                  : { uri: urlPhoto }
              }
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
          {/* <Image
          style={styles.profileImage}
          source={
            editedProduct
              ? { uri: editedProduct.urlPhoto }
              : { uri: profileImageStorage }
          }
        />
        <Button
          color={Colors.primary}
          title='Choose Image'
          onPress={pickProfileImage}
        /> */}
          <Input
            id='title'
            label={'Product Title'}
            errorText='Please enter a valid title!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {user === 'Fisherman' ? (
            <View>
              <Text style={{ fontFamily: 'Bold', marginTop: 10 }}>
                Catch Type
              </Text>
              {/* <FishInfoCard /> */}

              <FishInfoCard
                fish={fishSelected}
                onPress={toggleFishListModal}
                localname
              />
              {modalVisible ? (
                <FishListModal isVisible={true} fishSelected={selectFish} />
              ) : null}

              <Divider />
            </View>
          ) : null}
          <Input
            id='stock'
            label='Stock Available'
            errorText='Please enter a valid stock!'
            keyboardType='decimal-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.stock : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {/* <Input
          id='imageUrl'
          label='Image Url'
          errorText='Please enter a valid image url!'
          keyboardType='default'
          returnKeyType='next'
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ''}
          // initialValue={editedProduct ? editedProduct.imageUrl : profileImageStorage}
          initiallyValid={!!editedProduct}
          required
        /> */}

          {user === 'Fisherman' ? (
            <Text></Text>
          ) : (
            <>
              <Text style={styles.textCategory}>Category</Text>
              <View style={styles.categoryContainer}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(itemVal) => {
                    setSelectedCategory(itemVal)
                  }}
                  itemStyle={{ color: 'white' }}
                >
                  {categories.map((i) => (
                    <Picker.Item color='#005da0' label={i} value={i} />
                  ))}
                </Picker>
              </View>
            </>
          )}

          {editedProduct ? null : (
            <Input
              id='price'
              label={user === 'Fisherman' ? 'Price per Kilo' : 'Price'}
              errorText='Please enter a valid price!'
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          {/* <Input
          id='category'
          label='Category'
          errorText='Please enter a valid category!'
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.category : ''}
          initiallyValid={!!editedProduct}
          required
        /> */}
          {editedProduct ? (
            <>
              <Text style={styles.textCategory}>Visible to Marketplace</Text>
              <View style={styles.categoryContainer}>
                <Picker
                  selectedValue={listed}
                  onValueChange={(itemVal) => {
                    setListed(itemVal)
                  }}
                  itemStyle={{ color: 'white' }}
                >
                  {islisted.map((i) => (
                    <Picker.Item color='#005da0' label={i} value={i} />
                  ))}
                </Picker>
              </View>
            </>
          ) : null}
          <Input
            id='description'
            label={user === 'Fisherman' ? 'Catch Description' : 'Description'}
            errorText='Please enter a valid description!'
            keyboardType='default'
            autoCapitalize='sentences'
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />

          <TouchableOpacity
            style={styles.roundedButton}
            onPress={submitHandler}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <Loading name={'Uploading...'} /> : null}
    </View>
  )
}

export const screenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {}

  return {
    headerTitle: routeParams.productId ? 'Edit Product' : 'Add Product',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={
            Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.goBack()
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // profileImage: {
  //   flex: 1,
  //   width: 120,
  //   height: 120,
  //   borderRadius: 100,
  //   borderWidth: 3,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  profileImageView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    // borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colors.gray2,
  },
  textCategory: {
    fontFamily: 'Bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  categoryContainer: {
    borderWidth: 2,
    borderColor: '#C5CCD6',
    borderRadius: 4,
    marginBottom: 10,
  },
  roundedButton: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: theme.colors.primary,
    borderRadius: 1000,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Bold',
    fontSize: 16,
  },
})

export default EditProductScreen
