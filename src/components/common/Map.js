import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'

import { theme } from '../../constants'

const Map = (props) => {
  return (
    <View
      style={{ position: 'relative', height: theme.dimensions.height * 0.2 }}
    >
      <MapView
        style={{ left: 0, right: 0, top: 0, bottom: 0, position: 'absolute' }}
        initialRegion={{
          latitude: parseFloat(props.location.lat),
          longitude: parseFloat(props.location.lng),
          latitudeDelta: 0.002,
          longitudeDelta: 0.0021,
        }}
        //10.34834787720166, 123.91289726506237
        provider={PROVIDER_GOOGLE}
        pitchEnabled={false} rotateEnabled={false} zoomEnabled={true} scrollEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(props.location.lat),
            longitude: parseFloat(props.location.lng),
          }}
        >
          <Callout>
            <View style={styles.callout}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Medium',
                }}
              >
                {props.ownerName}'s Location
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  callout: {
    width: 100,
  },
})

export { Map }
