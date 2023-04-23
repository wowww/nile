import cn from 'classnames';
import { Popover } from 'antd';

import Formula from './Formula';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

const Step3 = () => {
  const { t } = useTranslation(['dao', 'common']);
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('step3-wrap')}>
      <p>{t('station.participationProcess.noteHead')}</p>
      <strong>{t('station.participationProcess.noteTitle1', { type: useDaoCharacterConvert(activeDao.value) })}</strong>
      <ul className={cn('list-type-dot')}>
        <li>{t('station.participationProcess.note1', { type: useDaoCharacterConvert(activeDao.value), num: 24 })}</li>
        <li>{t('station.participationProcess.note2', { type: useDaoCharacterConvert(activeDao.value) })}</li>
        <li>{t('station.participationProcess.note3', { type: useDaoCharacterConvert(activeDao.value) })}</li>
      </ul>
      <strong>{t('station.participationProcess.noteTitle2')}</strong>
      <ul className={cn('list-type-dot')}>
        <li>{t('station.participationProcess.note4')}</li>
        <li>{t('station.participationProcess.note5')}</li>
        <li>{t('station.participationProcess.note6')}</li>
      </ul>
      <span>*{t('station.participationProcess.noteRef1')}</span>
      {/* <li>
          참여로 획득하게될 DAO Token의 양은 모집이 마감된 시점의 총 모집금액과 참여금액의 비율로 배분될 예정입니다.
          <div className={cn('info-text')}>
            배분 계산 공식
            <Popover
              overlayClassName="tooltip"
              placement="bottom"
              content={
                <div className={cn('tooltip-contents')}>
                  <Formula />
                </div>
              }
              trigger="click"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              transitionName=""
            >
              <button type="button">
                <span className={cn('a11y')}>tooltip</span>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg' />
              </button>
            </Popover>
          </div>
        </li>
        <li>
          지갑에서 자금 전송을 위한 가스비가 결제됩니다. 네트워크 트래픽 상황에 따라서 예상 가스비는 달라질 수 있습니다.
          <div className={cn('info-text')}>예상 가스비 = 0.9 WEMIX</div>
        </li>
        <li>참여를 위해 사용된 WEMIX는 DAO 운영을 위해 사용될 예정이며, 모집이 종료된 이후에는 환불이 불가합니다. </li> */}
    </div>
  );
};

export default Step3;
