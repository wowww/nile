import cn from 'classnames';
/* 23.02.23 수정: daoThemeAtom, useAtomValue, useTranslation 추가 */
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'next-i18next';
import RecruitmentInformationBox, { BoxProps } from './RecruitmentInformationBox';

const RecruitmentInformation = () => {
  /* 23.02.23 수정: daoThemeAtom, useTranslation 추가 */
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  const InfoData: BoxProps[] = [
    {
      subject: 'Recruitment Token unit',
      contents: 'WEMIX',
    },
    {
      subject: 'Minimum participation quantity',
      contents: '10',
      unit: 'WEMIX',
    },
    {
      subject: 'Maximum Participation Quantity',
      contents: 'No limit',
    },
    {
      subject: 'Wonder total supply',
      /* 23.03.01 수정: 발행량 수정 */
      contents: '1,900,000',
      /* 23.02.23 수정: 23.02.23 수정: WDR 티커 단위 다국어 처리 */
      unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
    },
    {
      subject: 'Wonder distribution method',
      contents: 'Prorated distribution',
      subInfo: '(According to participation ratio)',
    },
    {
      subject: 'Exchange rate upon successful recruitment',
      contents: '1:1',
      /* 23.02.23 수정: 23.02.23 수정: WDR 티커 단위 다국어 처리 */
      subInfo: `(WEMIX : ${t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })})`,
    },
  ];

  return (
    <div className={cn('recruitment-information-wrap')}>
      <strong className={cn('recruit-wrapper-title')}>Recruitment information</strong>
      <ul className={cn('info-box-list')}>
        {InfoData.map((el, index) => (
          <RecruitmentInformationBox key={el.subject + index} {...el} />
        ))}
      </ul>
      <ul className={cn('desc-list')}>
        <li>
          *If the participating WEMIX quantity is greater than the WEMIX quantity corresponding to the distributed Wonder quantity, the difference
          will be refunded.
        </li>
        <li>*Additional participation and cancellation of participation are only possible during the recruitment period.</li>
        <li>*Recruitment information may change later.</li>
      </ul>
      <div className={cn('distribution-method-wrap')}></div>
    </div>
  );
};

export default RecruitmentInformation;
