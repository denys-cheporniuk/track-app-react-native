import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'
import MapView, { Polyline } from "react-native-maps";
import { Context as TrackContext } from "../context/TrackContext";
import Spacer from "../components/Spacer";

const TrackDetailScreen = ({ route }) => {
  const id = route.params.id;

  const { state } = useContext(TrackContext);

  const selectedTrack = state.find(track => track._id === id);
  const initialCoords = selectedTrack.locations[0].coords;

  console.log(
    initialCoords
  )

  return (
    <SafeAreaView>
      <Spacer m16>
        <Text h3>{selectedTrack.name}</Text>
      </Spacer>

      <Spacer m16>
        <MapView
          style={styles.map}
          initialRegion={{
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            latitude: initialCoords.latitude,
            longitude: initialCoords.longitude,
          }}
        >
          <Polyline
            coordinates={selectedTrack.locations.map(location => (
              location.coords
            ))}
          />
        </MapView>
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  }
})

export default TrackDetailScreen;
