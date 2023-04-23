import { useMemo, useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import useMediaQuery from '@/hook/useMediaQuery';

interface ComponentProps {
  type: string;
}

type badgeType = {
  [key: string]: string;
};

const DaoBadge = ({ type }: ComponentProps) => {
  const [isDaoWrap, setDaoWrap] = useState<boolean>(false);
  const [size, setSize] = useState<'lg' | 'sm'>('lg');
  const isDaoLg = useMediaQuery('(min-width: 1440px)');
  const isLg = useMediaQuery('(min-width: 1280px)');

  const badge: badgeType = useMemo(
    () => ({
      wonder: '/ico_wonder_badge',
    }),
    [],
  );

  const sizeHandler = () => {
    if (isDaoWrap) {
      if (isDaoLg) {
        return 'lg';
      } else {
        return 'sm';
      }
    } else {
      if (isLg) {
        return 'lg';
      } else {
        return 'sm';
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const body = document.querySelector('body');

      if (body?.classList.contains('dao-wrap')) {
        setDaoWrap(true);
      }
    });
  }, [isDaoWrap]);

  useEffect(() => {
    setSize(sizeHandler());
  }, [isDaoLg, isLg, isDaoWrap]);

  return (
    <ReactSVG
      src={`https://nile.blob.core.windows.net/images/assets/images/icon/dao_badge${badge[type ?? '']}_${size}.svg`}
      beforeInjection={(svg) => {
        svg.classList.add('badge-svg');
      }}
    />
  );
};

export default DaoBadge;
