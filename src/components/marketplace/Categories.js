import React, { Component } from 'react'
import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { Heading } from '../common'
import { CategoryCard } from './CategoryCard'

import { categories } from '../../assets/icons'
import { theme } from '../../constants'

export const Categories = (props) => {
  return (
    <View style={styles.container}>
      {props.hideHeading ? null : (
        <View style={styles.wrapper}>
          <Heading
            heading={{
              headingTitle: 'Categories',
            }}
          />
        </View>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CategoryCard
          navigation={props.navigation}
          card={{
            productImage: categories.all.uri,
            productCategory: categories.all.imageName,
          }}
        />
        <CategoryCard
          navigation={props.navigation}
          card={{
            productImage: categories.fish.uri,
            productCategory: categories.fish.imageName,
          }}
        />
        <CategoryCard
          navigation={props.navigation}
          card={{
            productImage: categories.rod.uri,
            productCategory: categories.rod.imageName,
          }}
        />
        <CategoryCard
          navigation={props.navigation}
          card={{
            productImage: categories.bait.uri,
            productCategory: categories.bait.imageName,
          }}
        />
        <CategoryCard
          navigation={props.navigation}
          card={{
            productImage: categories.lure.uri,
            productCategory: categories.lure.imageName,
          }}
        />
        <CategoryCard
          navigation={props.navigation}
          card={{
            productImage: categories.net.uri,
            productCategory: categories.net.imageName,
          }}
        />
        <CategoryCard
          navigation={props.navigation}
          card={{
            productImage: categories.reel.uri,
            productCategory: categories.reel.imageName,
          }}
        />
        <CategoryCard
          navigation={props.navigation}
          card={{
            productImage: categories.braidline.uri,
            productCategory: categories.braidline.imageName,
          }}
        />
        <CategoryCard
          navigation={props.navigation}
          card={{
            productImage: categories.leaderline.uri,
            productCategory: categories.leaderline.imageName,
          }}
        />
        <CategoryCard
          navigation={props.navigation}
          card={{
            productImage: categories.clothes.uri,
            productCategory: categories.clothes.imageName,
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    paddingTop: 5,
    marginBottom: -10,
  },
  extraSmallCardContainer: {
    height: 60,
    width: 60,
    elevation: 2,
    backgroundColor: theme.colors.white,
    marginLeft: 5,
    borderRadius: 15,
    marginBottom: 5,
    alignItems: 'center',
    alignContent: 'center',
  },
  extraSmallCardImage: {
    padding: 10,
  },
})
