import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
  ScrollView,
} from 'react-native'
import { Divider } from 'react-native-elements'
import { theme } from '../../constants'
import * as Icon from '@expo/vector-icons'
import { Header } from '../../components/common'
import { LocationListModal } from '../../components/profile/LocationListModal'

export const MarketplaceFiltersScreen = (props) => {
  const [showLocationList, setShowLocationList] = useState(false)

  const [categories] = useState([
    'all',
    'bait',
    'lure',
    'net',
    'reel',
    'rod',
    'braidline',
    'leaderline',
    'clothes',
    'fish',
  ])

  const [location] = useState([
    'all',
    'cebu',
    'panay',
    'negros',
    'leyte',
    'samar',
    'bohol',
    'mactan',
    'guimaras',
    'biliran',
    'bantayan',
    'siquijor',
    'panglao',
    'panaon',
    'pacijan',
    'daram',
    'poro',
    'boracay',
    'ponson',
    'maripipi',
    'limasawa',
    'homonhon',
    'parasan',
    'batbatan',
    'mararison',
    'maniguin',
  ])

  const [selectedCategory, setSelectedCategory] = useState('all')

  const [selectedLocation, setSelectedLocation] = useState('all')

  const category = selectedCategory

  const EditButton = (props) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.smallButton,
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
        onPress={() => props.action()}
      >
        <Icon.MaterialIcons
          style={styles.headerIcon}
          name={'search'}
          size={25}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Header
          name={'Filter'}
          fontSize={20}
          icon={'close'}
          navigation={props.navigation}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Text style={styles.text}>Category</Text>
          <View style={styles.filterContainer}>
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

          <Text style={styles.text}>Location</Text>
          {/* <View style={styles.filterContainer}>
            <Picker
              selectedValue={selectedLocation}
              onValueChange={(itemVal) => {
                setSelectedLocation(itemVal)
              }}
              itemStyle={{ color: 'white' }}
            >
              {location.map((i) => (
                <Picker.Item color='#005da0' label={i} value={i} />
              ))}
            </Picker>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity
              style={{ marginVertical: 10 }}
              onPress={() => setShowLocationList(true)}
            >
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{ width: '90%', flexDirection: 'row', paddingLeft: 5 }}
                >
                  <Text style={{ fontFamily: 'Medium', fontSize: 16 }}>
                    {selectedLocation.city}
                  </Text>
                </View>
                <View
                  style={{ width: '10%', flexDirection: 'row', paddingLeft: 5 }}
                >
                  <EditButton action={() => setShowLocationList(true)} />
                </View>
              </View>
              <Divider
                style={{
                  width: theme.dimensions.width * 0.88,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: theme.colors.gray2,
                }}
              />
            </TouchableOpacity>
          </View>
          {showLocationList ? (
            <LocationListModal
              isVisible={true}
              locationSelected={setSelectedLocation}
              hideLocationModal={setShowLocationList}
            />
          ) : null}

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Marketplace', {
                categoryText: selectedCategory,
                locationText: selectedLocation.admin_name,
              })
            }}
          >
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
  },
  wrapper: {
    paddingHorizontal: 10,
    marginTop: 30,
    width: '100%',
  },
  text: {
    fontFamily: 'Bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  filterContainer: {
    borderWidth: 2,
    borderColor: '#C5CCD6',
    borderRadius: 4,
    marginBottom: 10,
    width: '100%',
    fontSize: 18,
  },
  submit: {
    backgroundColor: '#005da0',
    color: '#fff',
    textAlign: 'center',
    height: 46,
    paddingVertical: 12,
    borderRadius: 6,
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
})
