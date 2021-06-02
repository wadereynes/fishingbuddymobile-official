import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { theme } from '../../constants'

export const CategoryCard = (props) => {
  const [isSelected, setIsSelected] = useState(false)
  const [category, setCategory] = useState('')
  let categorytext
  let locationtext
  if (props.card.productCategory === 'all') {
    categorytext = props.card.productCategory
    locationtext = 'all'
  } else {
    categorytext = props.card.productCategory
  }

  return (
    <TouchableOpacity
      // onPress={()=>setIsSelected(!isSelected)}
      onPress={() => {
        props.navigation.navigate('Marketplace', {
          categoryText: categorytext,
          locationText: locationtext,
        })
      }}
      style={isSelected ? styles.buttonSelected : styles.button}
    >
      <Image
        source={props.card.productImage}
        style={styles.extraSmallCardImage}
      />
      <View style={styles.contents}>
        <Text style={styles.buttonText}>{props.card.productCategory}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    elevation: 2,
    backgroundColor: theme.colors.white,
    marginLeft: 5,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonSelected: {
    height: 60,
    width: 60,
    elevation: 2,
    backgroundColor: theme.colors.white,
    marginLeft: 5,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  contents: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  extraSmallCardImage: {
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Bold',
    fontSize: theme.sizes.category,
  },
})
