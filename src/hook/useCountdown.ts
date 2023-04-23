import { useCallback, useEffect, useState } from 'react';

export type CountdownProps = {
  seconds: number;
  active?: boolean;
  interval?: number;
  onChange?: (seconds: number) => void;
  onFinish?: () => void;
  onRefresh?: () => void;
};

export const useCountdown = ({ seconds, interval, onChange, onFinish, onRefresh }: CountdownProps) => {
  const [remainTime, setRemainTime] = useState<number>(seconds);
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
        return next > 0 ? next : 0;
      });
    }, interval ?? 1000);

    return () => {
      clearInterval(timer);
    };
  }, [interval, setRemainTime]);

  useEffect(() => {
    onChange?.(remainTime);
    if (remainTime === 0) {
      onFinish?.();
    }
  }, [remainTime, onChange, onFinish]);

  return ({
    remainTime,
    refresh,
  });
};
