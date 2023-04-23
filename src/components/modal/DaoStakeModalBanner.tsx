import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { ReactSVG } from 'react-svg';

// components
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

const DaoStakeModalBanner = ({ desc }: { desc: string }) => {
  const activeDao = useAtomValue(daoThemeAtom);
  return (
    <div className={cn('banner-block')}>
      <div className={cn('text-block')}>
        <ReactSVG
          src={`https://nile.blob.core.windows.net/images/assets/images/icon/dao_badge/ico_${activeDao.value}_badge_sm.svg`}
          beforeInjection={(svg) => {
            svg.classList.add('badge-svg');
          }}
        />
        <h2 className={cn('title')}>{`${useDaoCharacterConvert(activeDao.value)} DAO`}</h2>
        <p className={cn('desc')}>{desc}</p>
      </div>
      <div className={cn('img-block')}>
        <Image src={`/images/bg_showcase_${activeDao.value}.svg`} layout="fill" loader={NileCDNLoader} alt="" />
      </div>
    </div>
  );
};

export default React.memo(DaoStakeModalBanner);
