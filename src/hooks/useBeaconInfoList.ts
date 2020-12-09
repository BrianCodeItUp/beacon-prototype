import { useEffect, useState } from 'react'

interface BeaconInfo {
  identifier: string;
  uuid: string;
  major: number;
  minor: number;
}
const useBeaconInfoList = () => {
  const [beaconInfos, setBeaconInfos] = useState<BeaconInfo[]>([])
  useEffect(() => {
    setTimeout(() => {
      setBeaconInfos(prev => [...prev, {
        identifier: '測試 beacon',
        uuid: '7A77FF0A-9EFE-4537-B12D-4FF0D861283D',
        major: 12345,
        minor: 4444
      }])
    }, 2000)
  },[])

  return beaconInfos
}

export default useBeaconInfoList