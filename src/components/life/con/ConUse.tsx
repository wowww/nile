import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { ReactNode } from 'react';
import OutlineButton from '@/components/button/OutlineButton';
import { NileCDNLoader } from '@utils/image/loader';

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

const ConUse = () => {
  const { t } = useTranslation('life');
  return (
    <>
      <div className={cn('con-use')}>
        <p>
          <strong>{t('con.use.title')}</strong>
        </p>
        <ul>
          <Content
            index="covenant"
            img="/images/img_con_covenant.png"
            title={t('con.use.covenant.title')}
            description={t('con.use.covenant.description')}
            button={<OutlineButton color="black" size="sm" buttonText={t('con.main.btn')} href="/neith-station" />}
          />
          <Content
            index="protocol"
            img="/images/img_con_protocol.png"
            title={t('con.use.protocol.title')}
            description={t('con.use.protocol.description')}
          />
          <Content
            index="community"
            img="/images/img_con_community.png"
            title={t('con.use.community.title')}
            description={t('con.use.community.description')}
            button={<OutlineButton color="black" size="sm" buttonText={t('con.use.btnPapyrus')} href="/community" />}
          />
        </ul>
      </div>
    </>
  );
};
export default React.memo(ConUse);
