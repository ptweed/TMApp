import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Captions from '../utils/Captions'

const LandingLogo = () => (
    <View style={styles.iconContainer}>
        <Text style={styles.headerTitle}>{Captions.appName}</Text>
        <FontAwesome5 name="tasks" size={60} />
    </View>
)

const styles = StyleSheet.create({
    iconContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    headerTitle: {
        margin:10,
        fontSize: 40,
    }
  })

export default LandingLogo