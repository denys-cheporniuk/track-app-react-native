import React, { useCallback, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignInScreen = () => {
  const { state, signIn, clearError } = useContext(AuthContext);
  const navigation = useNavigation();

  const submit = useCallback((email, password) => {
    signIn({email, password})
  }, [signIn])

  useEffect(() => (
    navigation.addListener('focus', clearError)
  ), [navigation]);

  return (
    <View style={styles.container}>
      <AuthForm
        title="Sign In to Tracker"
        onSubmit={submit}
        submitButtonText="Sign In"
        errorMessage={state.errorMessage}
      />

      <NavLink
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
})

export default SignInScreen;
