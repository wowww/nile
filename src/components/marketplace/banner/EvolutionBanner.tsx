import Image from 'next/image';
import cn from 'classnames';
import { NileCDNLoader } from '@utils/image/loader';

const EvolutionBanner = () => {
  const copyEvent = (times: number, image: string) => {
    let newList = [];

    for (let i = 0; i < times; i++) {
      newList.push(image);
    }

    return (
      <>
        {newList.map((item, index) => (
          <div key={`banner-img-${index}`} className={cn('img-box')}>
            <Image src={item} alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} />
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className={cn('marketplace-banner marketplace-banner-type3')}>
        <div className={cn('banner-inner')}>
          <div className={cn('text-wrap')}>
            <div className={cn('title-wrap')}>
              {/* 22.11.11 수정: 문구 변경 */}
              <h2>NFT Is Life Evolution</h2>
            </div>
          </div>
        </div>
        <div className={cn('banner-bg')}>
          <div className={cn('bg-wrap')}>
            <div className={cn('img-wrap top')}>{copyEvent(3, '/assets/images/img/banner/img_marketplace_evolution_top.png')}</div>
            <div className={cn('img-wrap mid')}>{copyEvent(3, '/assets/images/img/banner/img_marketplace_evolution_mid.png')}</div>
            <div className={cn('img-wrap bottom')}>{copyEvent(3, '/assets/images/img/banner/img_marketplace_evolution_bottom.png')}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvolutionBanner;
