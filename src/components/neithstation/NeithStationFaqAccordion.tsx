import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import FaqAccordion, { faqDataType } from '@/components/faq/FaqAccordion';
import NeithContentTitle from '@/components/neithstation/NeithContentTitle';

const NeithStationFaqAccordion = () => {
  /* 23.03.21 수정: common json 추가 */
  const { t } = useTranslation(['neithStation', 'common']);
  const faqData: faqDataType = [
    {
      question: t('faq.1.question'),
      answer: t('faq.1.answer'),
      desc: t('faq.1.desc'),
    },
    {
      question: t('faq.2.question'),
      answer: t('faq.2.answer'),
    },
    {
      question: t('faq.3.question'),
      answer: t('faq.3.answer'),
    },
    {
      question: t('faq.4.question'),
      answer: t('faq.4.answer'),
      desc: t('faq.4.desc'),
    },
    /* 23.03.21 수정: faq 내용 추가 */
    {
      question: t('faq.5.question'),
      answer: t('faq.5.answer'),
      button: [
        { name: t('goToBtn', { ns: 'common', name: 'PAPYRUS' }), link: '/community' },
        { name: t('goToBtn', { ns: 'common', name: 'Discord' }), link: 'https://discord.gg/78wzkvrsbj', href: true },
      ],
    },
  ];
  return (
    <div className={cn('faq-contain-box')}>
      <NeithContentTitle field="FAQ" title={t('home.faq.title')} />
      <FaqAccordion data={faqData} />
    </div>
  );
};

export default NeithStationFaqAccordion;
