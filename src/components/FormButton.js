import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const FormButton = ({ title, buttonType, buttonColor, onPress, disabled, loading, ...rest }) => (

  <TouchableOpacity onPress={() => onPress()} disabled={disabled} style={{margin: 10}} testID="topLevelButtonContainer" >
    {disabled ? 
    <View style={{borderColor: buttonColor, borderRadius: 20, borderWidth: 1, width:50, justifyContent: 'center', 
      alignItems: 'center', width: '100%', padding: 10, opacity: 0.4}} >
      <Text style={{color: 'gray', fontSize: 18 }}>{title}</Text>
      {loading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator color='black' size="large" />
        </View>
      }
    </View>
    :
    <View style={{borderColor: buttonColor, borderRadius: 20, borderWidth: 1, width:50, justifyContent: 'center', 
      alignItems: 'center', width: '100%', padding: 10, opacity: 1.0}} >
      <Text style={{color: buttonColor, fontSize: 18 }}>{title}</Text>
      {loading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator color='black' size="large" />
        </View>
      }
    </View>
    }
  </TouchableOpacity>
)

export default FormButton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 15
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10,
    opacity: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
})