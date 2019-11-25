import * as React from 'react'

interface Props {
  timestamp: string,
  name: string,
  value: number

}

import { StyleSheet, View, Text } from 'react-native'
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  sensor: {
    borderRadius: 3,
    backgroundColor: '#fbfbfb',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,

  }

});

export const SingleSensor: React.FC<Props> = ({ timestamp, name, value }) => {
  return (<View style={styles.sensor}>
    <View style={styles.container}>
      <Text>Timestamp: {timestamp}</Text>
      <Text>Name: {name}</Text>
      <Text>Value: {value}</Text>
    </View>

  </View>);
}