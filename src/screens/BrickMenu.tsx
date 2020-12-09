import React, { useState } from 'react'
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native'

const BeaconIcon = require('../asset/beacon').default
const BluetoothIcon = require('../asset/bluetooth').default

const BrickStyle: ViewStyle = {  
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  borderWidth: 0.1,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  padding: 20
}


const Brick = ({ brickWidth, title, Icon, iconSize = 60, onBrickPress }) => {
  return (
    <TouchableOpacity 
      style={[BrickContainer, { width: brickWidth, height: brickWidth }]} 
      activeOpacity={0.6} 
      onPress={onBrickPress}
    >
      <View style={BrickStyle}>
        <Icon width={iconSize} height={iconSize} />
        <View style={{ marginTop: 20}}> 
          <Text style={{ color: '#999999'}}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const Container: ViewStyle = {
  flex: 1,
  padding: 20,
  backgroundColor: '#ffffff'
}

const MenuWrapper: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap'
}

const BrickContainer: ViewStyle = {
  padding: 20
}

const BrickMenu = ({ navigation }) => {
  const [menuWidth, setMenuWidth] = useState(0)
  const brickWidth = menuWidth / 2

  function navigateTo (path) {
    navigation.navigate(path)
  }
  return (
    <View style={Container}>
      <View style={MenuWrapper} onLayout={(e) => setMenuWidth(e.nativeEvent.layout.width)}>
        <Brick 
          title='藍芽偵測打卡' 
          brickWidth={brickWidth} 
          Icon={BluetoothIcon} 
          onBrickPress={() => navigateTo('BluetoothPunchCard')}
        />
        <Brick 
          title='藍芽自動打卡' 
          brickWidth={brickWidth} 
          Icon={BeaconIcon} 
          iconSize={70} 
          onBrickPress={() => navigateTo('BluetoothMonitor')} 
        />
      </View>
    </View>
  )
}

export default BrickMenu