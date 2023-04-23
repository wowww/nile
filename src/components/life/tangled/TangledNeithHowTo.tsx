import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { ReactNode } from 'react';
import { NileCDNLoader } from '@utils/image/loader';

import OutlineButton from '@/components/button/OutlineButton';

const Content = ({
  index,
  img,
  title,
  description,
  button,
}: {
  index: string;
  img: string;
  title: string;
  description: string;
  button?: ReactNode;
}) => {
  return (
    <li>
      <div className={cn('img-wrap', `${index}`)}>
        <div className={cn('img')}>
          <Image src={img} alt={title} layout="fill" objectFit="contain" loader={NileCDNLoader} />
        </div>
      </div>
      <div className={cn('title-description-wrap')}>
        <p className={cn('title')}>
          <strong>{title}</strong>
        </p>
        <p className={cn('description')}>{description}</p>
      </div>
      {button && (
        /* 23.03.13 수정: disabled 버튼 링크 이동 막는 임시 코드 */
        <div className={cn('button')} onClick={(e) => e.preventDefault()}>
          {button}
        </div>
      )}
    </li>
  );
};

const TangledNeithHowTo = () => {
  const { t } = useTranslation('life');

  return (
    <div className={cn('how-to-wrap')}>
      <p>
        <strong>{t('tangled.neith.use.title')}</strong>
      </p>
      <ul>
        <Content
          index="covenant"
          img="/images/img_tangled_covenant.png"
          title={t('tangled.neith.use.covenant.title')}
          description={t('tangled.neith.use.covenant.description')}
          button={<OutlineButton color="white" size="sm" buttonText={t('tangled.neith.use.btnStation')} href="/neith-station" />}
        />
        <Content
          index="protocol"
          img="/images/img_tangled_protocol.png"
          title={t('tangled.neith.use.protocol.title')}
          description={t('tangled.neith.use.protocol.description')}
        />
        <Content
          index="community"
          img="/images/img_tangled_community.png"
          title={t('tangled.neith.use.community.title')}
          description={t('tangled.neith.use.community.description')}
          // Papyrus 버튼 딤처리
          button={<OutlineButton color="white" size="sm" buttonText={t('tangled.neith.use.btnPapyrus')} target="_blank" href="#" disabled />}
        />
      </ul>
    </div>
  );
};

export default React.memo(TangledNeithHowTo);
