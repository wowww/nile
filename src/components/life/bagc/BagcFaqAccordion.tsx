import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import FaqAccordion, { faqDataType } from '@/components/faq/FaqAccordion';

const BagcFaqAccordion = () => {
  /* 23.03.21 수정: common json 추가 */
  const { t } = useTranslation(['life', 'common']);
  const faqData: faqDataType = [
    {
      question: t('bagc.faq.1.question'),
      answer: t('bagc.faq.1.answer'),
      button: [
        { name: t('goToBtn', { ns: 'common', name: 'ALTAVA Discord' }), link: 'https://discord.gg/altava', href: true },
        { name: t('goToBtn', { ns: 'common', name: 'PAPYRUS' }), link: 'https://www.nile.io/community', href: true },
      ],
    },
    {
      question: t('bagc.faq.2.question'),
      answer: t('bagc.faq.2.answer'),
    },
    {
      question: t('bagc.faq.3.question'),
      answer: t('bagc.faq.3.answer'),
    },
    {
      question: t('bagc.faq.4.question'),
      answer: t('bagc.faq.4.answer'),
    },
    /* 23.03.21 수정: faq 내용 추가 */
    {
      question: t('bagc.faq.5.question'),
      answer: t('bagc.faq.5.answer'),
    },
  ];
  return (
    <div className={cn('faq-contain-box', 'bagc')}>
      <div className={cn('title')}>
        <strong>FAQ</strong>
      </div>
      <FaqAccordion data={faqData} />
    </div>
  );
};

export default BagcFaqAccordion;
