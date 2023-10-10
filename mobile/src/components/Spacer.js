import React, {useMemo} from 'react';
import { View, StyleSheet } from 'react-native'

const Spacer = (props) => {
  const { children, ...indents } = props;

  const elementStyles = useMemo(() => (
    Object.keys(indents).map((indent) => (
      styles[indent]
    ))
  ), [indents]);

  return (
    <View style={[elementStyles]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  m16: {
    margin: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  mt40: {
    marginTop: 40,
  },
})

export default Spacer;
