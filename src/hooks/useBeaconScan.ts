import { useEffect, useRef, useState } from 'react'

import Beacons from 'react-native-beacons-manager'
import { Platform } from 'react-native'
import beacons from 'react-native-beacons-manager'
import { isEmpty } from 'lodash'

const currentOS = Platform.OS

interface BeaconInfo {
  identifier: string;
  uuid: string;
  major: number;
  minor: number;
}

export enum BluetoothScanStatus {
  SCANNING,
  SUCCEED,
  FAILED    
}


/** 開啟偵測 Beacon 功能時長 */
const RANGING_TIME = 5000;
const useBeaconScan = (beaconInfoList: BeaconInfo[]) => {
  // const [beacon, setBeacon] = useState<BeaconInfo>(null)
  const [scanStatus, setScanStatus] = useState<BluetoothScanStatus>(null)
  const beacon = useRef(null)
  const isComponentExist = useRef(true)
  function startScanning () {
    setScanStatus(BluetoothScanStatus.SCANNING)
    
    /** 模擬掃到打卡 Beacon */
    setTimeout(() => {
      if (isComponentExist.current) {
        beacon.current = {
          identifier: '測試 beacon',
          uuid: '7A77FF0A-9EFE-4537-B12D-4FF0D861283D',
          major: 12345,
          minor: 4444
        }
      } 
    }, 3000)
  
    setTimeout(() => {
      if (isComponentExist.current) {
        console.log(beacon)
        const result = isEmpty(beacon) ? BluetoothScanStatus.FAILED : BluetoothScanStatus.SUCCEED
        setScanStatus(result)
      }
    }, RANGING_TIME)
  }

  useEffect(() => {
    beaconInfoList.map(beaconInfo => {
        Beacons.startRangingBeaconsInRegion(beaconInfo);
    })
  }, [beaconInfoList])

  useEffect(() => {
    return () => {
      console.log('fire fire')
      isComponentExist.current = false
    }
  }, [])
  return {
    startScanning,
    beacon: beacon.current,
    scanStatus
  }
}

export default useBeaconScan