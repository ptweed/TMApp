import React, {useEffect, useState} from 'react'
import { Platform, Dimensions, StyleSheet, View, TextInput, Keyboard } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { isTablet } from './Platform'

const FormMultilineInput = ({
  iconName,
  iconColor,
  name,
  placeholder,
  ...rest
}) => {

  const [calcWidth, setCalcWidth] = useState(250)
  useEffect(() => {
    if (isTablet()) setCalcWidth(Dimensions.get('screen').width - 130)

    const onChange = () => {
      if (isTablet()) setCalcWidth(Dimensions.get('screen').width - 130)
    };
    
    Dimensions.addEventListener('change', onChange)
    return () => Dimensions.removeEventListener('change', onChange);
  }, [])

  return (
  <View style={styles.inputContainer}>
    <FontAwesome5 name={iconName} size={28} color={iconColor} style={styles.iconStyle} />
    <TextInput
      {...rest}
      placeholderTextColor='grey'
      name={name}
      placeholder={placeholder} 
      multiline={true}
      numberOfLines={4}
      style={{fontSize: 17, maxHeight: 150, width: calcWidth }}
      blurOnSubmit={true}
      onSubmitEditing={()=>{Keyboard.dismiss()}}
      // keyboardType="default"
      returnKeyType="next"
      autoCapitalize="sentences"
    />
  </View>
)
}

const styles = StyleSheet.create({
  inputContainer: {
    marginRight: 25,
    marginLeft: 25, 
    marginTop: 15,
    marginBottom: 0,
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  iconStyle: {
    marginRight: 5, 
    ...Platform.select({
      ios: {
        marginBottom: 5, 
        marginTop: 0,
      },
      android: {
        marginBottom: 5, 
        marginTop: 25,
      },
      default: {
        // other platforms, web for example
        marginBottom: 5, 
        marginTop: 25,
      }
    })
  }
})

export default FormMultilineInput