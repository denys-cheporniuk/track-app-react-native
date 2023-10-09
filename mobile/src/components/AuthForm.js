import React, {useCallback, useState} from 'react';
import { View } from 'react-native'
import Spacer from "./Spacer";
import { Button, Input } from "react-native-elements";

const AuthForm = ({ onSubmit, title }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/;

    if (!email) {
      return 'Email can\'t be empty!';
    } else if (!emailRegex.test(email)) {
      return 'Please enter a valid email address!';
    }

    return '';
  }, []);

  const validatePassword = useCallback((password) => {
    if (password.length < 5) {
      return 'The password must contain at least 5 characters';
    }

    return '';
  }, []);

  const submit = useCallback(() => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (emailValidation) {
      setEmailError(emailValidation);
    }

    if (passwordValidation) {
      setPasswordError(passwordValidation);
    }

    if (!emailValidation && !passwordValidation) {
      onSubmit(email, password);
    }
  }, [email, password, setEmailError, setPasswordError]);

  return (
    <View>
      <Spacer m16>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          label="Enter email"
          errorMessage={emailError}
          value={email}
          onChangeText={(value) => {
            setEmailError('');
            setEmail(value);
          }}
          placeholder="test@gmail.com"
        />

        <Input
          autoCapitalize="none"
          autoCorrect={false}
          label="Enter password"
          errorMessage={passwordError}
          value={password}
          onChangeText={(value) => {
            setPasswordError('');
            setPassword(value);
          }}
          secureTextEntry
          placeholder="password"
        />
      </Spacer>

      <Spacer m16>
        <Button
          title={title}
          onPress={submit}
        />
      </Spacer>
    </View>
  );
};

export default AuthForm;
