import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import LifeStripBanner from '@components/life/LifeStripBanner';
import TangledTitle from '@components/life/tangled/TangledTitle';

const TangledVideo = () => {
  const { t } = useTranslation(['life', 'common']);

  const stripBannerContent = {
    logoUrl: '/assets/images/icon/ico_tipo_token.png',
    desc: (
      <Trans i18nKey="tangled.stripBanner.desc" ns="life">
        <strong></strong>
        <span></span>
      </Trans>
    ),
    link: '/tokens',
    linkText: t('eventPopup.tipo.btn3', { ns: 'common' }),
  };

  return (
    <div className={cn('introducing-tipo-wrap')}>
      <TangledTitle title="Introducing TIPO" />
      <div className={cn('tangled-video-wrap')}>
        <iframe src="https://www.youtube.com/embed/KH4QXs1FA6g" title="YouTube video player" height={'100%'} allowFullScreen></iframe>
        <LifeStripBanner stripBannerContent={stripBannerContent} />
      </div>
    </div>
  );
};

export default TangledVideo;
