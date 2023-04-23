import { useEffect, useState } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';

type PropsType = {
  refresh: Function;
};

const RefreshCountdown = ({ refresh }: PropsType) => {
  const countdown = 5;
  const [count, setCount] = useState<number>(countdown);

  useEffect(() => {
    const interval = setInterval(() => {
      let cnt = count - 1;
      cnt = cnt % countdown;

      if (cnt < 0) {
        cnt = countdown;
        refresh();
      }

      setCount(cnt);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <>
      <button className={cn('btn-count')}>
        <span className={cn({ rotate: count === 0 })}>
          <IconCountdown cnt={count} />
        </span>
      </button>
    </>
  );
};

export default RefreshCountdown;

type Props = {
  cnt: number;
  size?: number;
};
const IconCountdown = ({ cnt }: Props) => {
  const viewIcon = () => {
    switch (cnt) {
      case 5:
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_refresh_countdown5.svg' className={cn('count')} />;
      case 4:
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_refresh_countdown4.svg' className={cn('count')} />;
      case 3:
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_refresh_countdown3.svg' className={cn('count')} />;
      case 2:
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_refresh_countdown2.svg' className={cn('count')} />;
      case 1:
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_refresh_countdown1.svg' className={cn('count')} />;
      case 0:
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_refresh_countdown.svg' />;
    }
  };

  return <>{viewIcon()}</>;
};
