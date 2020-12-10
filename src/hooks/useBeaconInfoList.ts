import { useEffect, useState } from 'react'

interface BeaconInfo {
  identifier: string;
  uuid: string;
}
const useBeaconInfoList = () => {
  const [beaconInfo, setBeaconInfo] = useState<BeaconInfo>(null)
  useEffect(() => {
    setTimeout(() => {
      setBeaconInfo({
        identifier: '測試 beacon',
        uuid: '7A77FF0A-9EFE-4537-B12D-4FF0D861283D',
      })
    }, 2000)
  },[])

  return beaconInfo
}

export default useBeaconInfoList