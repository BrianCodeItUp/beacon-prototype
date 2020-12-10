import { Alert, Button, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useBeaconInfoList, useBeaconScan, useInterval } from '../hooks'

import { BluetoothScanStatus } from '../hooks/useBeaconScan'
import { FullWidthButton } from './components'
import { isEmpty } from 'lodash'
import moment from 'moment'

const BluetoothSearching = require('../asset/bluetoothSearching').default
const BluetoothSuccess = require('../asset/bluetoothSuccess').default
const BluetoothFailed = require('../asset/bluetoothFailed').default

const ContentContainer: ViewStyle = {
  flex: 1,
}

const IconContainer: ViewStyle = {
  height: 417,
  justifyContent: 'center',
  alignItems: 'center',

}

const IconWrapper: ViewStyle = {
  marginTop: 50,
  justifyContent: 'center',
  alignItems: 'center',
}

const TimeContainer: ViewStyle = {
  position: 'absolute',
  bottom: 120,
}

const BluetoothStatusContent: ViewStyle = {
  marginTop: 70,
  width: 320,

}
const BluetoothStatusTitle: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center'
}


const BluetoothPunchCard = () => {
  const [currentTime, setCurrentTime] = useState(moment().valueOf())
  const beaconInfo = useBeaconInfoList()
  const { startScanning, scanStatus, detectedBeacon } = useBeaconScan(beaconInfo); 
 
  useInterval(() => {
    setCurrentTime(moment().valueOf());
  }, 1000);
 
  useEffect(() => {
    if (beaconInfo) {
      startScanning()
    }
  }, [beaconInfo])


  function showBluetoothDetail () {
    Alert.alert(
      '藍芽資訊',
      `uuid: ${detectedBeacon.uuid}`,
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
  }

  function punchCard () {
    Alert.alert(
      '打卡成功', 
      moment(currentTime).format('HH:mm:ss'), 
      [
        { text: 'OK' }
      ]
    )
  }

  const iconSize = 440
  const IconProps = {
    width: iconSize,
    height: iconSize,
  }
  const IconByStatus = {
    [BluetoothScanStatus.SCANNING]: <BluetoothSearching {...IconProps} />,
    [BluetoothScanStatus.SUCCEED]: <BluetoothSuccess {...IconProps}  />,
    [BluetoothScanStatus.FAILED]: <BluetoothFailed {...IconProps} />
  }

  const Icon = IconByStatus[scanStatus] || <BluetoothSearching {...IconProps} />;
  const canPunch = scanStatus === BluetoothScanStatus.SUCCEED
  return (
    <View style={{ flex: 1,  backgroundColor: '#f5f5f5'}}>
      <View style={ContentContainer}>
        <View style={IconContainer}>
          <View style={IconWrapper}>
            {Icon}
            <View style={TimeContainer}>
              <Text style={{ textAlign: 'center', fontSize: 32 }}>{moment(currentTime).format('HH:mm:ss')}</Text>
              <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 5 }}>{moment(currentTime).format('YYYY/MM/DD(ddd)')}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center'  }}>
          <View style={BluetoothStatusContent}>
            {
              scanStatus === null && <View><Text style={BluetoothStatusTitle}>公司指定藍芽訊號掃描中...</Text></View>
            }
            {
              scanStatus === BluetoothScanStatus.SCANNING && <View><Text style={BluetoothStatusTitle}>公司指定藍芽訊號掃描中...</Text></View>
            }
            {
              scanStatus === BluetoothScanStatus.SUCCEED && (
                <View>
                  <Text style={[BluetoothStatusTitle, { marginBottom: 20}]}>藍芽設備名稱: {detectedBeacon.identifier}</Text>
                  <Button title="更多設備資訊" onPress={showBluetoothDetail} />
                </View>
              )
            }
            {
              scanStatus === BluetoothScanStatus.FAILED && (
                <View style={{ alignItems: 'center'}}>
                  <Text style={BluetoothStatusTitle}>掃描不到指定藍芽訊號，您可以嘗試...</Text>
                  <View style={{ marginTop: 10, marginBottom: 10, width: 250}}>
                    <Text>• 與公司管理者確認您的指定藍芽裝置</Text>
                    <Text>• 確認您的手機有開啟位置權限</Text>
                  </View>
                  <Button title="重新偵測" onPress={startScanning} />
                </View>
              )
            }
          </View>
          </View>
      </View>
      <FullWidthButton title="我要打卡" disabled={!canPunch} onPress={punchCard} />
    </View>
  )
}

export default BluetoothPunchCard