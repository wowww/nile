import cn from 'classnames';

import ContentTitle from '@/components/marketplace/ContentTitle';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Step3Ongoing from '@/components/mypage/withdrawal/Step3Ongoing';

const WithdrawalStep3 = () => {
  const { t } = useTranslation('mypage');

  return (
    <div className={cn('withdrawal-wrap', 'step-last')}>
      <ContentTitle title={t('withdrawal.title')} />
      <Step3Ongoing />
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'mypage'])),
    },
  };
};

export default WithdrawalStep3;
