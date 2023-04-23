import Image from 'next/image';

import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';
import { NileCDNLoader } from '@/utils/image/loader';
import { message } from 'antd';
import { useRouter } from 'next/router';

const ConTop = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    /* 23.04.07 수정: 클래스명 바인딩 삭제 */
    /* 23.04.06 수정: 클래스명 바인딩 */
    <div className={cn('life-top-section', 'con')}>
      <div className={cn('con-inner')}>
        <h2>
          <span className={cn('title')}>
            <span className={cn('symbol')}>
              <Image src="/assets/images/img/img_con_symbol.png" layout="fill" alt="" quality="100" loader={NileCDNLoader} />
            </span>
            <span className={cn('text')}>
              <Image src="/assets/images/img/img_con_logo_text.png" alt="City Of Nile" layout="fill" quality="100" loader={NileCDNLoader} />
            </span>
          </span>
          <strong>{t('con.main.title')}</strong>
        </h2>
        <div className={cn('btn-wrap')}>
          {/* 23.04.04 수정: OutlineButton 삭제 */}
          <BgButton href="/marketplace/CORA" color="white" size="lg" buttonText={t('goToCollection', { ns: 'common' })} />
        </div>
      </div>
    </div>
  );
};

export { ConTop };
