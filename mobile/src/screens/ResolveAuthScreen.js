import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";
import { ActivityIndicator } from "react-native";

const ResolveAuthScreen = () => {
  const { tryLocalSignIn } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return (
    <Spacer mt20>
      <ActivityIndicator size="large" />
    </Spacer>
  );
};

export default ResolveAuthScreen;
