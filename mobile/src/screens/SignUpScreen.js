import React, { useCallback, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignUpScreen = () => {
  const { state, signUp, clearError } = useContext(AuthContext);
  const navigation = useNavigation();

  const submit = useCallback((email, password) => {
    signUp({email, password})
  }, [signUp])

  useEffect(() => (
    navigation.addListener('focus', clearError)
  ), [navigation]);

  return (
    <SafeAreaView>
      <AuthForm
        title="Sign Up for Tracker"
        onSubmit={submit}
        submitButtonText="Sign Up"
        errorMessage={state.errorMessage}
      />

      <NavLink
        redirectTo="SignIn"
        content="Already have an account? Sign in instead"
      />
    </SafeAreaView>
  );
};

export default SignUpScreen;
