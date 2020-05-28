import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Captions from '../utils/Captions'
import IconButton from './IconButton'
import SimpleButton from './SimpleButton'

export default class TopHeader extends Component {
  render() {

    let localStyle={paddingLeft: 15, color: 'black' }
    if (!this.props.isConnected) {
      localStyle = {paddingLeft: 15, color: 'grey' }
    }
    return (
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.leftButtonContainer}>
          <IconButton iconColor='black'  
          iconSize={20} iconName='plus' onPress={() => { this.props.navigation.navigate('TaskCreate')}} 
          disabled={!this.props.isConnected} />
        </View>
        <View style={{flex: 2, alignItems: 'center', flexDirection: 'column', marginBottom: 5}}>
          <Text style={{fontSize: 20}}>{Captions.appName}</Text>
          <FontAwesome5 name="tasks" size={20} />
        </View>
        <View style={styles.rightButtonContainer}>
          <SimpleButton title={Captions.logout} textColor='black' textSize={18} onPress={this.props.logout} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    flexDirection:'row',
    alignItems:'center',
    borderColor: "black",
    backgroundColor: "rgb(255,255,255)",
    marginTop: 10,
    paddingBottom: 5, 
  },
  leftButtonContainer: {
    flex: 1, 
    marginLeft:20, 
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
          },
      android: {
        marginTop: 15,
          },
      default: {
        // other platforms, web for example
      }
    })
  },
  rightButtonContainer: {
    flex: 1, 
    marginRight:20, 
    alignItems: 'flex-end',
    ...Platform.select({
      ios: {
          },
      android: {
        marginTop: 15,
          },
      default: {
        // other platforms, web for example
      }
    })
  },
})