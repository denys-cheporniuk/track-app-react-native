import React, {useCallback, useContext, useEffect} from 'react';
import { SafeAreaView } from 'react-native'
import { Text } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";

import { Context as LocationContext } from '../context/LocationContext'
import Map from "../components/Map";
import { useLocation } from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import Spacer from "../components/Spacer";

const TrackCreateScreen = () => {
  const { state, addLocation } = useContext(LocationContext);
  const isInFocus = useIsFocused();

  const setLocation = useCallback((location) => {
    addLocation(location, state.recording);
  }, [state.recording])

  const [locationError] = useLocation(isInFocus || state.recording, setLocation);

  return (
    <SafeAreaView>
      <Spacer m16>
        <Text h3 center>TrackCreateScreen</Text>
      </Spacer>

      <Map />

      <Spacer m16>
        <TrackForm />
      </Spacer>

      {locationError && (
        <Spacer m16>
          <Text>
            Please enable location service
          </Text>
        </Spacer>
      )}
    </SafeAreaView>
  );
};

export default TrackCreateScreen;
