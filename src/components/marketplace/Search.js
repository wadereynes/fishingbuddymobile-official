import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native'
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import * as Icon from '@expo/vector-icons'

import { theme } from '../../constants'

export const Search = (props) => {
  const [searchText, setSearchText] = useState('')

  return (
    <View style={styles.container}>
      <View style={{ width: '8%' }}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Icon.Ionicons
            style={{ paddingTop: 0 }}
            name={'ios-menu'}
            size={25}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.searchField }}>
        <TextInput
          placeholder='Search'
          placeholderTextColor={theme.colors.primary}
          style={styles.textInput}
          //   editable={false}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Marketplace', {
              searchTextWade: searchText,
            })
          }}
        >
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: '10%', paddingRight: 5 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('MarketplaceFilter')}
        >
          {/* <Text style={styles.filter}>FILTERS</Text> */}
          <Icon.MaterialCommunityIcons
            style={{ paddingTop: 10 }}
            name={'filter-menu'}
            size={20}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flexDirection: 'row',
  },
  searchField: {
    backgroundColor: theme.colors.white,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 10,
    width: theme.dimensions.width * 0.74,
    flexDirection: 'row',
  },
  image: {
    height: 20,
    width: 20,
    // position: 'absolute',
    right: 0,
    marginRight: 15,
    marginTop: 6,
  },
  textInput: {
    fontFamily: 'Medium',
    fontSize: 16,
    width: 250,
  },
  filter: {
    fontFamily: 'Medium',
    fontSize: theme.sizes.caption,
    color: theme.colors.accent2,
    marginVertical: 10,
    alignContent: 'flex-end',
  },
  headerIcon: {
    paddingVertical: 10,
  },
})
