import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Captions from '../utils/Captions'

const AppErrorMessage = ({ errorValue }) => {
  const [screenMessage, setScreenMessage] = useState('')

  useEffect(() => {
    if(errorValue.includes('Network Error')) setScreenMessage(Captions.infrastructureError)
    else setScreenMessage(Captions.errorApology + ':\n\n' + errorValue);
  }, [errorValue])

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{screenMessage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
    marginTop: 0,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
  }
})

export default AppErrorMessage