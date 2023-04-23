import cn from 'classnames';
import Image from 'next/image';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';

// 22.11.09 수정: Props 추가
interface Props {
  desc?: string;
  // 22.11.24 수정: 동영상 관련 속성 삭제
}

// 22.11.09 수정: Props 추가
// 22.11.24 수정: 동영상 관련 속성 삭제
const LifeWhoNext: React.FC<Props> = ({ desc }) => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation('life');

  return (
    <div className={cn('life-next')}>
      {/* 수정 : 22.11.09 수정 start: bg-wrap 추가, desc 추가 */}
      {/* 22.11.24 수정 start: 영상대신 이미지 교체로 마크업 수정 */}
      <div className={cn('bg-star-wrap')}></div>
      {/* 22.11.24 수정 end: 영상대신 이미지 교체로 마크업 수정 */}
      <div className={cn('next-text')}>
        <strong className={cn('next-title')}>Who’s Next?</strong>
        <p className={cn('next-cont')}>{desc}</p>
      </div>
      {/* 수정 : 22.11.09 수정 end: bg-wrap 추가, , desc 추가 */}
    </div>
  );
};

export default LifeWhoNext;
