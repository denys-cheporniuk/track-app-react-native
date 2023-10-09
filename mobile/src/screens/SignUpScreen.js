import React, { useCallback, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "react-native-elements";

import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import AuthRedirect from "../components/AuthRedirect";

const SignUpScreen = () => {
  const { state, signUp } = useContext(AuthContext);

  const submit = useCallback((email, password) => {
    signUp({email, password})
  }, [signUp])

  return (
    <View style={styles.container}>
      <Spacer m16>
        <Text h3>Sign Up for Tracker</Text>
      </Spacer>

      <AuthForm
        onSubmit={submit}
        title="Sign Up"
      />

      {state.errorMessage && (
        <Spacer m16>
          <Text style={styles.errorMessage}>
            {state.errorMessage}
          </Text>
        </Spacer>
      )}

      <AuthRedirect
        redirectTo="SignIn"
        content="Already have an account? Sign in instead"
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

export default SignUpScreen;
