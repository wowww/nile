import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import { Popover } from 'antd';
import StationTitle from '@components/dao/ui/station/recruit/StationTitle';
import useMediaQuery from '@/hook/useMediaQuery';

interface ProcedureDataType {
  intro?: string;
  title: string;
  list: {
    tooltip?: string;
    data: string;
    remark?: string;
  }[];
  isLink?: boolean;
}

interface Props {
  isAdditional?: boolean;
}

const ParticipantProcedure = ({ isAdditional = false }: Props) => {
  const { t } = useTranslation('dao');

  const isTablet = useMediaQuery('(max-width: 1279px)');

  const additional: ProcedureDataType[] = [
    {
      intro: t('station.recruiting.section.1.2.1.desc'),
      title: t('station.recruiting.section.1.2.1.title'),
      list: [
        {
          data: t('station.recruiting.section.1.2.1.list.1'),
          tooltip: t('station.recruiting.section.1.2.1.list.1-tooltip'),
        },
        {
          data: t('station.recruiting.section.1.2.1.list.2'),
        },
        {
          data: t('station.recruiting.section.1.2.1.list.3'),
        },
        {
          data: t('station.recruiting.section.1.2.1.list.4'),
        },
      ],
    },
    {
      intro: t('station.recruiting.section.1.2.2.desc'),
      title: t('station.recruiting.section.1.2.2.title'),
      list: [
        {
          data: t('station.recruiting.section.1.2.2.list.1'),
        },
        {
          data: t('station.recruiting.section.1.2.2.list.2'),
        },
        {
          data: t('station.recruiting.section.1.2.2.list.3'),
        },
        {
          data: t('station.recruiting.section.1.2.2.list.4'),
        },
      ],
    },
    {
      intro: t('station.recruiting.section.1.2.3.desc'),
      title: t('station.recruiting.section.1.2.3.title'),
      list: [
        {
          data: t('station.recruiting.section.1.2.3.list.1'),
          remark: t('station.recruiting.section.1.2.3.list.1-bold'),
        },
        {
          data: t('station.recruiting.section.1.2.3.list.2'),
          remark: t('station.recruiting.section.1.2.3.list.2-bold'),
        },
        {
          data: t('station.recruiting.section.1.2.3.list.3'),
        },
      ],
    },
  ];

  const init: ProcedureDataType[] = [
    {
      title: t('station.recruiting.section.1.2.4.title'),
      list: [
        {
          data: t('station.recruiting.section.1.2.4.list.1'),
        },
        {
          data: t('station.recruiting.section.1.2.4.list.2'),
        },
      ],
    },
    {
      title: t('station.recruiting.section.1.2.5.title'),
      list: [
        {
          data: t('station.recruiting.section.1.2.5.list.1'),
          remark: t('station.recruiting.section.1.2.5.list.1-bold'),
        },
        {
          data: t('station.recruiting.section.1.2.5.list.2'),
          remark: t('station.recruiting.section.1.2.5.list.2-bold'),
        },
        {
          data: t('station.recruiting.section.1.2.5.list.3'),
        },
      ],
    },
  ];

  const ProcedureData: ProcedureDataType[] = isAdditional ? additional : init;

  return (
    <div className={cn('participant-procedure-wrap')} id="procedure">
      <StationTitle title={t('station.recruiting.participantStep.title')} />
      <ul className={cn('procedure-list', !isAdditional && 'two-columns')}>
        {ProcedureData.map((el, index) => (
          <li key={el.title + index}>
            <div className={cn('left')}>
              <span className={cn('step')}>{'0' + (index + 1)}</span>
              {isAdditional && <span className={cn('intro')}>{el.intro}</span>}
              <strong className={cn('step-title')}>{el.title}</strong>
            </div>
            <div className={cn('right')}>
              <ul className={cn('list-type-dot')}>
                {el.list.map((el, index) => (
                  <li key={el.data + index} className={cn(el.tooltip && 'tooltip-row')}>
                    {el.data}
                    {el.remark && <span className={cn('remark')}>{el.remark}</span>}
                    {el.tooltip && (
                      <Popover
                        overlayClassName="tooltip"
                        placement={!isTablet ? 'top' : 'topRight'}
                        content={<div className={cn('tooltip-contents')}>{el.tooltip}</div>}
                        trigger="click"
                        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                      >
                        <button type="button">
                          <span className={cn('a11y')}>tooltip</span>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                        </button>
                      </Popover>
                    )}
                  </li>
                ))}
              </ul>
              {el.isLink && (
                <a href="#" className={cn('link')}>
                  {t('station.recruiting.section.1.2.1.link')}
                  <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_arrow_24.svg" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantProcedure;
