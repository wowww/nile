import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';

import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';

const DaoHomeGovernance = () => {
  const { t } = useTranslation('daoHome');

  const daoTheme = useAtomValue(daoThemeAtom).value;

  const tagList: string[] = t(`governance.${daoTheme}.tag`, { returnObjects: true });

  return (
    <div className={cn('dao-home-governance-wrap')}>
      <div className={cn('dao-home-governance-inner')}>
        <span className={cn('section-name')}>Governance</span>
        <strong className={cn('title')}>{t(`governance.${daoTheme}.title`)}</strong>
        <span className={cn('desc')}>{t(`governance.${daoTheme}.desc`)}</span>
        <div className={cn('visualization-area')}>
          <div className={cn('tag-box-area')}>
            <ul className={cn('tag-box-list')}>
              {tagList.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_more_vertical.svg" />
          </div>
          <div className={cn('step-area')}>
            <span className={cn('desc')}>{t(`governance.${daoTheme}.stepDesc`)}</span>
            <ul className={cn('step-list')}>
              <li>
                Temperature
                <br />
                Check
              </li>
              <li>
                Consensus
                <br />
                Check
              </li>
              <li>
                Governance
                <br />
                Check
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaoHomeGovernance;
