import cn from 'classnames';
import Image from 'next/image';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';

import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';

const ArtistInfo = () => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['life', 'common']);

  return (
    <div className={cn('artist-info-wrap')}>
      <div className={cn('artist-info-inner')}>
        <h3>{t('creator', { ns: 'common' })}</h3>
        <div className={cn('artist-info-contents')}>
          <div className={cn('artist-name-wrap')}>
            <div>
              <div className={cn('image-wrap')}>
                {/* 22.11.09 수정: 이미지 속성 수정 */}
                <Image src="/assets/images/icon/ico_lus_artist_male.png" layout="fill" alt="Zeeha" quality="100" loading="eager" loader={NileCDNLoader} />
              </div>
              <span>Zeeha</span>
            </div>
            <div>
              <div className={cn('image-wrap')}>
                {/* 22.11.09 수정: 이미지 속성 수정 */}
                <Image src="/assets/images/icon/ico_lus_artist_female.png" layout="fill" alt="Locho" quality="100" loading="eager" loader={NileCDNLoader} />
              </div>
              <span>Locho</span>
            </div>
          </div>
          <div className={cn('info-detail')}>
            <p>{t('lus.artist.desc1')}</p>
            <p>{t('lus.artist.desc2')} </p>
            <ul className={cn('btn-wrap')}>
              <li>
                <a href="https://picdotstudio.com" target="_blank" rel="noopener noreferrer" title="새창열림">
                  <ReactSVG src="https://file.mir4global.com/nile/resources/public/icons/ico_homepage.svg" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/PICDOT" target="_blank" rel="noopener noreferrer" title="새창열림">
                  <ReactSVG src="https://file.mir4global.com/nile/resources/public/icons/ico_twitter.svg" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/picdot_studio/" target="_blank" rel="noopener noreferrer" title="새창열림">
                  <ReactSVG src="https://file.mir4global.com/nile/resources/public/icons/ico_instagram.svg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
