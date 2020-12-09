import { useEffect, useRef } from 'react';

/**
 * reference: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param {() => void} callback - 要在 interval 裡執行的 callback
 * @param {number}     delay    - 多久執行一次
 */
function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<Function>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
