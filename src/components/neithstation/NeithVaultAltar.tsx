import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import BgButton from '@components/button/BgButton';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';

const imgRoot = 'https://nile.blob.core.windows.net/images/assets/images/icon';

const NeithVaultAltar = () => {
  const { t } = useTranslation('neithStation');
  const altarList = t('vault.altar.list', { returnObjects: true });

  return (
    <div className={cn('neith-vault-altar-wrap')}>
      <div className={cn('neith-vault-altar-inner')}>
        <div className={cn('neith-vault-alta-container')}>
          <div className={cn('vault-altar-content')}>
            <div className={cn('altar-title')}>
              <h3 className={cn('title')}>
                <ReactSVG src={`${imgRoot}/ico_altar.svg`} />
                <span>NEITH Altar</span>
              </h3>
              <p className={cn('desc')}>{t('vault.altar.titleDesc')}</p>
            </div>
            <div className={cn('altar-img-wrap')}>
              <div className={cn('altar-img')}>
                <div className={cn('altar')}>
                  <Image src="/assets/images/img/img_altar_empty_card.png" alt="altar" layout="fill" objectFit="contain" loader={NileCDNLoader} />
                </div>
              </div>
            </div>
            <div className={cn('vault-altar-box-wrap')}>
              {/* 23.03.12 수정 start: box-inner-wrap 추가 */}
              <div className="box-inner-wrap">
                <ol>
                  {Object.keys(altarList).map((list, index) => (
                    <li key={`altar-list-${index}`}>{t(`vault.altar.list.${index + 1}`)}</li>
                  ))}
                </ol>
              </div>
              {/* 23.03.12 수정 end: box-inner-wrap 추가 */}
              <div className={cn('vault-altar-box')}>
                <div className={cn('empty-text')}>
                  <strong>{t('vault.altar.empty.title')}</strong>
                  <span>{t('vault.altar.empty.desc')}</span>
                </div>
              </div>
            </div>
            <div className={cn('vault-altar-btn-wrap')}>
              <BgButton buttonText={t('vault.altar.btn')} disabled size="lg" color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NeithVaultAltar };
