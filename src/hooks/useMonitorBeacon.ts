import { useEffect, useState } from 'react'

import BeaconManager from 'react-native-beacons-manager'
import { Platform } from 'react-native'

interface region {
  uuid: string;
  identifier: string;
}
const useMonitorBeacon = (region: region) => {
  const [monitoredBeacon, setMonitoredBeacon] = useState<any>(null)
  const [beaconInRange, setBeaconInRange] = useState([])
  const platform = Platform.OS

  useEffect(() => {
    if (platform === 'ios') {
      BeaconManager.requestWhenInUseAuthorization();
      BeaconManager.requestAlwaysAuthorization();
    }
  }, [])

  function startMonitoring() {
    if (platform === 'ios') {
      BeaconManager.startMonitoringForRegion(region);
    }

    BeaconManager.BeaconsEventEmitter.addListener(
      'regionDidEnter',
      data => {
        setMonitoredBeacon(data)
      },
    );
  }

  function startRanging () {
     BeaconManager.startRangingBeaconsInRegion(region)
     BeaconManager.BeaconsEventEmitter.addListener(
      'beaconsDidRange',
      data => {
        const { beacons } = data
        // console.log(beacons)
        console.log(data)
        setBeaconInRange(prev => [...prev, ...beacons ])
      },
    );
  }

  function stopRanging () {
    BeaconManager.stopRangingBeaconsInRegion(region)

  }

  return {
    startMonitoring,
    monitoredBeacon,
    startRanging,
    stopRanging,
    beaconInRange
  };
}

export default useMonitorBeacon;