import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native'
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TrackListScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>TrackListScreen</Text>

      <Button
        title="Go to TrackDetail"
        onPress={() => {
          navigation.navigate('TrackDetail')
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({})

export default TrackListScreen;
