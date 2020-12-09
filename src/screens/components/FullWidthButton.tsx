import { Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import React from 'react'

const ButtonContainer: ViewStyle = {
  width: '100%',
  height: 80,
  backgroundColor: 'white',
  borderRadius: 0,
  alignItems: 'center',
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  paddingTop: 15
}
const ButtonStyle: ViewStyle = {
  width: 325,
  height: 44,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
}

const Button = ({ disabled = false,  title, onPress }) => {
  const buttonColor = disabled ? '#bbbbbb' : '#ffab2e';
  return (
    <View style={ButtonContainer}>
        <TouchableOpacity style={[ButtonStyle,  { backgroundColor: buttonColor }]} activeOpacity={0.6} disabled={disabled} onPress={onPress}>
        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Button;