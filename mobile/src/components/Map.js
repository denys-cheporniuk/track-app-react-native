import React, { useContext } from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from '../context/LocationContext'
import Spacer from "./Spacer";

const Map = () => {
  const { state: { currentLocation, locations } } = useContext(LocationContext);

  if (!currentLocation) {
    return (
      <Spacer mt40>
        <ActivityIndicator size="large" />
      </Spacer>
    )
  }

  return (
    <View>
      <Spacer mt40>
        <MapView
          style={styles.map}
          initialRegion={{
            ...currentLocation.coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Circle
            center={currentLocation.coords}
            radius={30}
            strokeColor="rgba(158, 158, 255, 0.3)"
            fillColor="rgba(158, 158, 255, 0.8)"
          />

          <Polyline
            coordinates={locations.map(location => location.coords)}
          />
        </MapView>
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
})

export default Map;
