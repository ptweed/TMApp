import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'

const SimpleButton = ({ iconName, iconColor, iconSize, onPress, disabled, ...rest }) => (

  <TouchableOpacity onPress={() => onPress()} disabled={disabled} testID="topLevelButtonContainer" >
    <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, opacity: 1.0}} >
    {disabled ? 
      <FontAwesome5 name={iconName} size={iconSize} color='gray' />
      :
      <FontAwesome5 name={iconName} size={iconSize} color={iconColor} />
    }
    </View>
  </TouchableOpacity>
)

export default SimpleButton
