import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
interface Props {
  mainTitle?: string;
  menuName: string;
  desc: string;
  onClick: (active: boolean) => void;
}
export default function NileHeroVideoItem({ mainTitle, menuName, desc, onClick }: Props) {
  return (
    <div
      className={cn('item-wrap')}
      onClick={() => {
        onClick(true);
      }}
    >
      <div className={cn('contents-wrap')}>
        <div className={cn('img-wrap')}>
          {/* 23.02.13 수정: 이미 최적화 jpg로 변경 */}
          <Image src="/assets/images/img/daoShowcase/img_daoshowcase.jpg" alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} priority />
          {/* 23.04.13 수정: 배너이미지 수정으로 재생아이콘 삭제 */}
          {/* <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_play_btn.svg" className={cn('play-btn')} /> */}
        </div>
        <div className={cn('info-wrap')}>
          <p className={cn('info-title')}>{menuName}</p>
          <div className={cn('info-bottom')}>
            <span className={cn('info-desc')}>{desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
