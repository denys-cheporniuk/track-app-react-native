import React, {useState, useContext, useCallback} from 'react';
import { View } from 'react-native'
import { Input, Button, Text } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext'
import Spacer from "./Spacer";
import { useSaveTracks } from "../hooks/useSaveTracks";
import { useNavigation } from "@react-navigation/native";

const TrackForm = () => {
  const {
    state, startRecording, stopRecording, changeName,
  } = useContext(LocationContext);
  const [saveTrack] = useSaveTracks();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const handleStartButton = () => {
    if (!state.recording && name === '') {
      return setNameError('Name can\'t be empty');
    }

    changeName(name);
    startRecording();
    setName('');
  }

  const showSaveButton = !state.recording && state.locations.length > 0;

  return (
    <View>
      <Spacer mb16 mt16>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="track name"
          label="Ender track name"
          value={name}
          onChangeText={(value) => {
            setName(value)
            setNameError('')
          }}
          errorMessage={nameError}
          disabled={state.recording}
        />
      </Spacer>

      {state.recording
        ? (
          <Button
            onPress={stopRecording}
            title="Stop recording"
          />
        )
        : (
          <Button
            onPress={handleStartButton}
            title="Start recording"
          />
        )
      }

      {showSaveButton && (
        <Spacer mt16>
          <Button
            title="Save track"
            onPress={() => {
              saveTrack();
              navigation.navigate('TrackList');
            }}
          />
        </Spacer>
      )}

    </View>
  );
};

export default TrackForm;
