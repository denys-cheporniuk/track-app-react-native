import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native'
import { Text } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext'

import Map from "../components/Map";
import { useLocation } from "../hooks/useLocation";

const TrackCreateScreen = () => {
  const { addLocation } = useContext(LocationContext);
  const [locationError] = useLocation(addLocation);

  return (
    <SafeAreaView>
      <Text h3>TrackCreateScreen</Text>
      <Map />

      {locationError && (
        <Text>
          Please enable location service
        </Text>
      )}
    </SafeAreaView>
  );
};

export default TrackCreateScreen;
