import { useCallback, useEffect, useState } from 'react';

export type CountdownProps = {
  seconds: number;
  activeUnderZero?: boolean;
  active?: boolean;
  interval?: number;
  onChange?: (seconds: number) => void;
  onFinish?: () => void;
  onRefresh?: () => void;
};

export const useCountdown = ({ seconds, activeUnderZero, interval, onChange, onFinish, onRefresh }: CountdownProps) => {
  const [remainTime, setRemainTime] = useState<number>(seconds);
  const [timer, setTimer] = useState<any>();
  const refresh = useCallback(() => {
    onRefresh?.();
    setRemainTime(seconds);
  }, [onRefresh, setRemainTime, seconds]);

  useEffect(() => {
    setRemainTime(seconds);
  }, [seconds, setRemainTime]);

  useEffect(() => {

    const timer = setInterval(() => {
      setRemainTime((prev) => {
        const next = prev - 1;
        if (activeUnderZero) {
          return next;
        }
        return next > 0 ? next : 0;
      });
    }, interval ?? 1000);

    setTimer(timer);

    return () => {
      clearInterval(timer);
      setTimer(undefined);
    };
  }, [interval, setRemainTime]);

  useEffect(() => {
    if (remainTime <= 0) {
      onFinish?.();
      clearInterval(timer);
      setTimer(undefined);
    }
  }, [remainTime, onChange, onFinish]);

  return ({
    remainTime,
    refresh,
  });
};
