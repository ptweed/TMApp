import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

const SimpleButton = ({ title, textColor, onPress, textSize, ...rest }) => (

  <TouchableOpacity onPress={() => onPress()} testID="topLevelButtonContainer" >
    <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', padding: 10, opacity: 1.0}} >
      <Text style={{color: textColor, fontSize: textSize }}>{title}</Text>
    </View>
  </TouchableOpacity>
)

export default SimpleButton
