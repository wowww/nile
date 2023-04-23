import React, { useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import SnkrzTitle from '@/components/life/snkrz/SnkrzTitle';
import FaqAccordion, { faqDataType } from '@/components/faq/FaqAccordion';

const SnkrzOverviewFAQ = () => {
  const { t } = useTranslation(['life', 'common']);
  const faqList = t('snkrz.overview.faq', { returnObjects: true });
  const faqData: faqDataType = [
    {
      question: t('snkrz.overview.faq.0.question'),
      answer: t('snkrz.overview.faq.0.answer'),
    },
  ];

  for (let i = 1; i < Object.keys(faqList).length; i++) {
    faqData.push({
      question: t(`snkrz.overview.faq.${i}.question`),
      answer: t(`snkrz.overview.faq.${i}.answer`),
    });
  }

  return (
    <section className={cn('section faq')}>
      <SnkrzTitle title="FAQ" />
      <FaqAccordion data={faqData} className="light" />
    </section>
  );
};

export default SnkrzOverviewFAQ;
