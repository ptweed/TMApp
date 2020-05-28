import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginTop: 0,
    marginBottom: 0,
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
  }
})

export default ErrorMessage