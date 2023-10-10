import React, {useContext, useEffect} from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext";
import { Button, Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      tabBarIcon: () => (
        <FontAwesome name="gear" size={20} />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <Spacer m16>
        <Text h3 style={styles.title}>Profile</Text>
      </Spacer>

      <Spacer m16>
        <Button
          title='Sign Out'
          onPress={signOut}
        />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 100,
  },

  title: {
    textAlign: 'center',
  }
})

export default ProfileScreen;
