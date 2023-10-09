import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Spacer from "./Spacer";

const AuthRedirect = ({ redirectTo, content }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(redirectTo)}
      >
        <Spacer m16>
          <Text style={styles.link}>
            {content}
          </Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  }
})

export default AuthRedirect;
