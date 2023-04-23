import { useTranslation } from 'next-i18next';

import MysterySale from './MysterySale';
import MysteryBoxContents from './MysteryBoxContents';
import MysteryGuid from './MysteryGuid';
// 22.11.17 수정: 스니커즈 배너 위치 이동으로 삭제
import cn from 'classnames';

const SnkrzMysteryBox = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    <>
      <div className={cn('life-snkrz-inner mystery-box')}>
        <MysterySale />
        <MysteryBoxContents />
      </div>
      <MysteryGuid />
      {/* 22.11.17 수정: 스니커즈 배너 위치 이동으로 삭제 */}
    </>
  );
};

export default SnkrzMysteryBox;
