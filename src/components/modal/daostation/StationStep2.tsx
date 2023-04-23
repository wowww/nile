import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Form, Popover } from 'antd';

import OutlineButton from '@/components/button/OutlineButton';
import { IconLogo } from '@/components/logo/IconLogo';
import Formula from './Formula';

import { ReactSVG } from 'react-svg';
/* 23.03.01 수정: 다국어 적용을 위한 추가 */
import { useTranslation, Trans } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

/* 23.03.01 수정: 추가 참여일 경우 체크를 위한 프롭스 추가 */
interface Props {
  state?: string;
}

const Step2 = ({ state }: Props) => {
  const [isInputAmount, setInputAmount] = useState(false);
  const [tooltipArrowPos, setTooltipArrowPos] = useState<number>(0);
  const [isError, setError] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const tooltipWrap = useRef<null | HTMLDataElement>(null);
  /* 23.03.01 수정: 다국어 적용을 위한 추가 */
  const { t } = useTranslation(['dao', 'common']);
  const activeDao = useAtomValue(daoThemeAtom);

  const tooltipArrowStyle = {
    '--tooltip-wrapper-width': `${tooltipArrowPos - 6}px`,
  } as React.CSSProperties;

  useEffect(() => {
    if (tooltipWrap.current !== null) {
      setTooltipArrowPos(tooltipWrap.current?.offsetWidth);
    }
  }, [tooltipWrap.current]);

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className={cn('step2-wrap')}>
      <Form name="nest-messages" layout="vertical" onFinish={onFinish} size="large">
        <div className={cn('station-form-item ant-form-item')}>
          <strong className={cn('label')}>{t('station.participationProcess.inputWemix')}</strong>
          <StationInput isDisabled={isDisabled} isError={isError} />
          {isError && (
            <div className={cn('error-message')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
              <span>{t('station.participationProcess.errorMessage1')}</span>
              {/* <span>{t('station.participationProcess.errorMessage2', { num: '10' })}</span> */}
              {/* <span>{t('station.participationProcess.errorMessage3')}</span> */}
              {/* <span>{t('station.participationProcess.errorMessage4')}</span> */}
            </div>
          )}

          <p className={cn('announce-text')}>{t('station.participationProcess.infoText1', { type: useDaoCharacterConvert(activeDao.value) })}</p>
        </div>
      </Form>
      <div className={cn('high-rank-block', isError && 'error')}>
        <p className={cn('title')}>
          {/* 23.03.01 수정: 최초 참여일때와 추가 참여일때 노출되는 텍스트가 다름 */}
          {state === 'add' ? (
            <Trans
              i18nKey="station.participationProcess.rankText2"
              ns="dao"
              values={{
                amount: '1,000,000.0000',
                totalNum: '2,000',
                num: '?',
              }}
            >
              <span></span>
              <strong></strong>
            </Trans>
          ) : (
            <Trans
              i18nKey="station.participationProcess.rankText"
              ns="dao"
              values={{
                totalNum: '2,000',
                num: '?',
              }}
            >
              <span></span>
              <strong></strong>
            </Trans>
          )}
        </p>
        <ul className={cn('list-type-dot')}>
          <li>
            <dl>
              <dt>{t('station.participationProcess.maximumAmount')}</dt>
              <dd>
                9,000,000.0000
                <span className={cn('unit')}>WEMIX</span>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>{t('station.participationProcess.averageAmount')}</dt>
              <dd>
                1,000,000.0000
                <span className={cn('unit')}>WEMIX</span>
              </dd>
            </dl>
          </li>
        </ul>
        <div className={cn('station-img-wrap')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_station.svg" />
        </div>
      </div>
    </div>
  );
};

const StationInput = ({ isError, isDisabled }: { isError: boolean; isDisabled: boolean }) => {
  const { t } = useTranslation('dao');
  const [value, setValue] = useState<number | string>();
  const [inputFocus, setInputFocus] = useState(false);
  return (
    <div className={cn('input-block', isError && 'error', isDisabled && 'disabled', inputFocus && 'focus')}>
      <span className={cn('unit')}>WEMIX</span>
      <div className={cn('input-wrap')}>
        <input
          type="number"
          placeholder={t('station.participationProcess.placeholder2', { num: '10' })}
          disabled={isDisabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={(e: any) => setInputFocus(true)}
          onBlur={(e: any) => setInputFocus(false)}
        />
        <OutlineButton buttonText={t('stakingPool.modal.input.max')} size="sm" color="black" disabled={isDisabled} />
      </div>
    </div>
  );
};

export default Step2;
