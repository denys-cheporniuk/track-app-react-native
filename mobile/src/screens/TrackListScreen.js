import React, {useContext} from 'react';
import { SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Text, ListItem } from 'react-native-elements';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Context as TrackContext } from "../context/TrackContext";
import Spacer from "../components/Spacer";

const TrackListScreen = () => {
  const { state, getTracks } = useContext(TrackContext);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getTracks()
    }, [])
  )

  return (
    <SafeAreaView>
      <Spacer m16>
        <Text h3>Tracks</Text>
      </Spacer>

      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            navigation.navigate('TrackDetail', { id: item._id })
          }}>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({})

export default TrackListScreen;
