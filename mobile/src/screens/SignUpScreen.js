import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>SignUpScreen</Text>

      <Button
        title="Go to SignIn"
        onPress={() => {
          navigation.navigate('SignIn')
        }}
      />

      <Button
        title="Go to MainFlow"
        onPress={() => {
          navigation.navigate('MainFlow')
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({})

export default SignUpScreen;
