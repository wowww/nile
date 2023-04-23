import { Trans, useTranslation } from 'next-i18next';
import cn from 'classnames';
import { NileCDNLoader } from '@utils/image/loader';
import Tag from '@/components/tag/Tag';
import Image from 'next/image';

const SnkrzEventBanner = () => {
  const { t } = useTranslation('life');
  const eventList = t(`snkrz.nft.event.descList`, { returnObjects: true });

  return (
    <div className="nft-event-banner">
      <div className={cn('inner')}>
        <div className={cn('title-wrap')}>
          <Tag size="s" bg={true} color="opacity-white">
            Event
          </Tag>
          <strong className="title">{t('snkrz.nft.event.title')}</strong>
        </div>
        <div className="desc">
          <Trans
            i18nKey={`snkrz.nft.event.desc.normal`}
            ns="life"
            values={{
              strong: t(`snkrz.nft.event.desc.strong`),
            }}
          >
            <strong></strong>
          </Trans>
        </div>
        <ul className="list-type-dot dark">
          {Object.keys(eventList).map((list, index) => {
            return <li key={`list-type-dot-${index}`}>{t(`snkrz.nft.event.descList.${index}`)}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default SnkrzEventBanner;
