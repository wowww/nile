import { useEffect, useRef } from 'react';

function useInterval(callback: any, delay: number) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    // function tick() {
    //   savedCallback.current();
    // }

    // let id = setInterval(tick, delay);
    // return () => clearInterval(id);
  }, []);
}

export default useInterval;
