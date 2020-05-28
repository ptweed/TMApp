import React from 'react'
import { Platform, StyleSheet, View, Keyboard, TextInput } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

const FormInput = ({
  iconName,
  iconColor,
  name,
  placeholder,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <FontAwesome5 name={iconName} size={28} color={iconColor} style={styles.iconStyle} />
    <TextInput
      {...rest}
      placeholderTextColor='grey'
      name={name}
      placeholder={placeholder}
      multiline={false}
      numberOfLines={4}
      style={{fontSize: 17, maxHeight: 150, width: '100%'}}
      blurOnSubmit={true}
      onSubmitEditing={()=>{Keyboard.dismiss()}}
      keyboardType="default"
      returnKeyType="next"
    />
  </View>
)

const styles = StyleSheet.create({
  inputContainer: {
    marginRight: 25,
    marginLeft: 25, 
    marginTop: 25,
    marginBottom: 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 0,
  },
  iconStyle: {
    marginRight: 10, 
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

export default FormInput