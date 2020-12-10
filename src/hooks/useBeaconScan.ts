import { useEffect, useRef, useState } from 'react'

import Beacons from 'react-native-beacons-manager'
import { Platform } from 'react-native'
import { isEmpty } from 'lodash'

const currentOS = Platform.OS

interface Beacon {
  identifier: string;
  uuid: string;
}

export enum BluetoothScanStatus {
  SCANNING,
  SUCCEED,
  FAILED    
}


/** 開啟偵測 Beacon 功能時長 */
const RANGING_TIME = 5000;
const useBeaconScan = (beaconInfo: Beacon) => {
  const [detectedBeacon, setDetectedBeacon] = useState<Beacon>(null)
  const [scanStatus, setScanStatus] = useState<BluetoothScanStatus>(null)
  const isComponentExist = useRef(true)

  

  async function startScanning () {
    
    if (isEmpty(beaconInfo)) {
      return;
    }

    setScanStatus(BluetoothScanStatus.SCANNING)


    if(Platform.OS === 'ios') {
      Beacons.startRangingBeaconsInRegion(beaconInfo);

    }
  

    if(Platform.OS === 'android') {
      
      // Start detecting all iBeacons in the nearby
      try {
        await Beacons.startRangingBeaconsInRegion(beaconInfo)
        console.log(`Beacons ranging started succesfully!`)
      } catch (err) {
        console.log(`Beacons ranging not started, error: ${err}`)
      }
    }

    const id = setTimeout(() => {
      if (isComponentExist.current) {
        setScanStatus(BluetoothScanStatus.FAILED)
        Beacons.stopRangingBeaconsInRegion(beaconInfo)
      }
    }, RANGING_TIME)
  
    Beacons.BeaconsEventEmitter.addListener(
      'beaconsDidRange',
      async (data) => {
        const { beacons } = data

        if (beacons.length > 0) {
          const { region } = data
          if (Platform.OS === 'ios') {
            const { uuid } = beacons[0];
            const identifier = region.identifier

            setDetectedBeacon({
              identifier,
              uuid
            })

            setScanStatus(BluetoothScanStatus.SUCCEED);
            clearTimeout(id)
            Beacons.stopRangingBeaconsInRegion(region);
          }

          if (Platform.OS === 'android') {
            /**
              * beacons: [{…}]
              * identifier: "測試 beacon"
              * uuid: "7a77ff0a-9efe-4537-b12d-4ff0d861283d"
             */
            const { identifier, uuid } = data
            setDetectedBeacon({
              identifier,
              uuid
            })
            setScanStatus(BluetoothScanStatus.SUCCEED);
            clearTimeout(id)
            
            Beacons.stopRangingBeaconsInRegion(beaconInfo);
          }

        }
      },
    );
  

  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Beacons.requestWhenInUseAuthorization();
      Beacons.requestAlwaysAuthorization();
    }
    Beacons.detectIBeacons()


  }, [])

  useEffect(() => {
    return () => {
      isComponentExist.current = false
    }
  }, [])
  return {
    startScanning,
    detectedBeacon,
    scanStatus
  }
}

export default useBeaconScan