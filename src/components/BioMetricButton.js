import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const BiometricButton = ({ iconName, iconColor, iconSize, onPress, disabled, ...rest }) => (

  <TouchableOpacity onPress={() => onPress()} disabled={disabled} testID="topLevelButtonContainer" >
    <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, opacity: 1.0}} >
    {disabled ? 
      <MaterialCommunityIcons name={iconName} size={iconSize} color='gray' />
      :
      <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
    }
    </View>
  </TouchableOpacity>
)

export default BiometricButton
