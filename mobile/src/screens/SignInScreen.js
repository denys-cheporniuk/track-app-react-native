import React, { useCallback, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
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
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

export default SignInScreen;
