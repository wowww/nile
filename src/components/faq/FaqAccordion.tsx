import cn from 'classnames';
import { Collapse } from 'antd';
import { ReactSVG } from 'react-svg';
/* 23.03.21 수정: TextButton 컴포넌트 추가 */
import TextButton from '@/components/button/TextButton';
/* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

const { Panel } = Collapse;

export type faqDataType = {
  question: string;
  answer: string;
  desc?: string;
  /* 23.03.21 수정: button 케이스 추가 */
  button?: {
    name: string;
    link: string;
    href?: boolean;
  }[];
}[];

type faqDataBoxType = {
  question: string;
  answer: string;
  desc?: string;
  index: number;
  /* 23.03.21 수정: button 케이스 추가 */
  button?: {
    name: string;
    link: string;
    href?: boolean;
  }[];
};

type dataType = {
  data: faqDataType;
  className?: string;
};

/* 23.04.12 수정: 클래스 네임 props 추가 */
const FaqAccordion = ({ data, className }: dataType) => {
  return (
    <div className={cn('faq-contain', className && className)}>
      <ul className={cn('faq-wrap')}>
        {data.map((item, i) => (
          /* 23.03.21 수정: button 케이스 추가 */
          <FaqBox question={item.question} answer={item.answer} desc={item.desc} button={item.button} index={i} key={`faq-box-${i}`} />
        ))}
      </ul>
    </div>
  );
};

/* 23.03.21 수정: button 케이스 추가 */
const FaqBox = ({ question, answer, desc, index, button }: faqDataBoxType) => {
  /* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');
  return (
    <li className={cn('faq-box')}>
      {isMobile ? (
        <Collapse
          expandIconPosition="end"
          expandIcon={() => <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_accordion_arrow.svg" />}
        >
          <Panel header={question} key={index + 1}>
            <p className={cn('faq-answer')}>{answer}</p>
            {desc && <p className={cn('faq-desc')}>*{desc}</p>}
            {/* 23.04.14 수정 start: button 케이스 추가 */}
            {button && (
              <ul className={cn('faq-btn')}>
                {button.map((data, index) => {
                  return (
                    <li key={`button-${index}`}>
                      <TextButton
                        buttonText={data.name}
                        size="sm"
                        iconValue="link"
                        gapSpacing="sm"
                        href={data.link}
                        target={data.href ? '_blank' : undefined}
                        direction="right"
                      />
                    </li>
                  );
                })}
              </ul>
            )}
            {/* 23.04.14 수정 end: button 케이스 추가 */}
          </Panel>
        </Collapse>
      ) : (
        <div className={cn('faq-detail')}>
          <strong className={cn('faq-question')}>{question}</strong>
          <p className={cn('faq-answer')}>{answer}</p>
          {desc && <p className={cn('faq-desc')}>*{desc}</p>}
          {/* 23.03.21 수정 start: button 케이스 추가 */}
          {button && (
            <ul className={cn('faq-btn')}>
              {button.map((data, index) => {
                return (
                  <li key={`button-${index}`}>
                    <TextButton
                      buttonText={data.name}
                      size="sm"
                      iconValue="link"
                      gapSpacing="sm"
                      href={data.link}
                      target={data.href ? '_blank' : undefined}
                      direction="right"
                    />
                  </li>
                );
              })}
            </ul>
          )}
          {/* 23.03.21 수정 end: button 케이스 추가 */}
        </div>
      )}
    </li>
  );
};
export default FaqAccordion;
