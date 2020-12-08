import * as React from 'react';

import { BluetoothMonitor, BluetoothPunchCard, BrickMenu } from './screens'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BrickMenu" component={BrickMenu}  options={{ title:'企業大師' }} />
        <Stack.Screen name="BluetoothPunchCard" component={BluetoothPunchCard} options={{ title:'藍芽打卡' }}  />
        <Stack.Screen name="BluetoothMonitor" component={BluetoothMonitor} options={{ title:'藍芽自動打卡' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;