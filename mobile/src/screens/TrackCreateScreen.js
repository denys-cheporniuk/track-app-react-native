import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native'
import { Text } from 'react-native-elements';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Context as LocationContext } from '../context/LocationContext'

import Map from "../components/Map";
import { useLocation } from "../hooks/useLocation";

const TrackCreateScreen = () => {
  const { addLocation } = useContext(LocationContext);
  const isInFocus = useIsFocused();
  const [locationError] = useLocation(isInFocus, addLocation);
  const navigation = useNavigation();

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
