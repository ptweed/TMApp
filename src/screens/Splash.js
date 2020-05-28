import React, {useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Captions from '../utils/Captions'

const PAUSE = 1000;

const styles = StyleSheet.create({
    iconContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    headerTitle: {
        margin:10,
        fontSize: 60,
        fontWeight: "bold",
    },
    tagline: {
      marginRight:70,
      marginLeft:70,
      marginTop:60,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: 'center'
  }
})

export default function SplashScreen(props) {

  useEffect(() => {
    console.log('Splash screen loaded')
    setTimeout(() => {
        props.navigation.navigate('AuthScreen');
      }, PAUSE);
  });

  return (
      <View style={styles.iconContainer}>
          <Text style={styles.headerTitle}>Task Master</Text>
          <FontAwesome5 name="tasks" size={100} />
          <Text style={styles.tagline}>{Captions.tagline}</Text>
      </View>
  );
}