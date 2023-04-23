import { useState } from 'react';
import cn from 'classnames';

import ContentTitle from '@/components/marketplace/ContentTitle';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Step1 from '@/components/mypage/withdrawal/Step1';
import Step2 from '@/components/mypage/withdrawal/Step2';

const Withdrawal = () => {
  const { t } = useTranslation('mypage');
  const [step, setStep] = useState<number>(1);

  return (
    <div className={cn('withdrawal-wrap')}>
      <ContentTitle title={t('withdrawal.title')} />
      {step === 1 ? <Step1 step={step} setStep={setStep} /> : step === 2 ? <Step2 step={step} setStep={setStep} /> : null}
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

export default Withdrawal;
