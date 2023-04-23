import cn from 'classnames';
import OutlineButton from '../button/OutlineButton';
import BgButton from '../button/BgButton';
import { useTranslation } from 'next-i18next';

const CommunityBanner = () => {
  const { t } = useTranslation('community');

  return (
    <div className={cn('banner')}>
      <div className={cn('info')}>
        <p className={cn('title')}>{t('banner.title')}</p>
        {/* 23.03.24 수정: 베타 뱃지 추가 */}
        <strong>
          PAPYRUS<span className={cn('beta-beige')}>Beta</span>
        </strong>
        <p className={cn('description')}>{t('banner.description')}</p>
      </div>
      <div className={cn('buttons')}>
        <ul>
          <li>
            <BgButton
              buttonText={t('banner.googlePlay')}
              color="black"
              size="md"
              iconType
              iconValue="android"
              href="https://play.google.com/store/apps/details?id=com.wemix.papyrus"
              target="_blank"
            />
          </li>
          <li>
            <BgButton
              buttonText={t('banner.appStore')}
              color="black"
              size="md"
              iconType
              iconValue="ios"
              // href="https://apps.apple.com/app/papyrus-messenger/id6444429303"
              // target="_blank"
              disabled
            />
          </li>
          <li>
            <OutlineButton buttonText={t('banner.download')} color="black" size="md" href="https://www.papyrus.im" target="_blank" />
          </li>
        </ul>
        {/* 23.03.24 수정: 파피루스 공개 예정 문구 추가. (현재는 필요한 문구라고 하네요) */}
        <p className={cn('info')}>{t('comingSoon2')}</p>
      </div>
    </div>
  );
};

export default CommunityBanner;
