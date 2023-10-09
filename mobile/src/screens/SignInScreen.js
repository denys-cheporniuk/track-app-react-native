import React, { useCallback, useContext } from 'react';
import {View, StyleSheet } from 'react-native';
import { Text } from "react-native-elements";

import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import AuthRedirect from "../components/AuthRedirect";

const SignInScreen = () => {
  const { state, signIn } = useContext(AuthContext);

  const submit = useCallback((email, password) => {
    signIn({email, password})
  }, [signIn])

  return (
    <View style={styles.container}>
      <Spacer m16>
        <Text h3>Sign In to Tracker</Text>
      </Spacer>

      <AuthForm
        onSubmit={submit}
        title="Sign In"
      />

      {state.errorMessage && (
        <Spacer m16>
          <Text style={styles.errorMessage}>
            {state.errorMessage}
          </Text>
        </Spacer>
      )}

      <AuthRedirect
        redirectTo="SignUp"
        content="Don't have an account? Sign up instead"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
  },

  errorMessage: {
    fontSize: 16,
    color: 'red',
  },
})

export default SignInScreen;
