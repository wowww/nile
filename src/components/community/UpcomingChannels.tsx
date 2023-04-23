import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { message } from 'antd';
import { IconLogo } from '@/components/logo/IconLogo';

const UpcomingChannels = () => {
  const { t } = useTranslation('community');

  const UpcomingChannelList = [
    {
      logo: 'wonder',
      fullType: true,
    },
    {
      logo: 'g.wonder',
      fullType: true,
    },
    /* 23.03.23 수정: 까리 영문 명칭 kari로 변경 */
    /* 23.04.10 수정: 까리 공식채널 추가로 인한 upcoming 채널에서 삭제 */
    {
      logo: 'snkrz',
      fullType: false,
    },
    {
      logo: 'skz',
      fullType: false,
    },
    {
      logo: 'arteum',
      fullType: false,
    },
    {
      logo: 'g.arteum',
      fullType: false,
    },
    {
      logo: 'delta',
      fullType: false,
    },
    {
      logo: 'g.delta',
      fullType: false,
    },
    {
      logo: 'zero',
      fullType: false,
    },
  ];

  return (
    <div className={cn('channel-list-wrap')}>
      <h2 className={cn('community-section-title')}>{t(`upcoming.title`)}</h2>
      <ul className={cn('channel-list-inner')}>
        {UpcomingChannelList.map((v, i) => {
          return (
            <li className={cn('channel-items')} key={`channel-${i}`}>
              <button
                className={cn('channel-button')}
                onClick={() => {
                  message.info({ content: t('upcoming.toast'), key: 'toast' });
                }}
              >
                <span className={cn('logo')}>
                  <IconLogo type={v.logo} size={44} fullType={v.fullType} />
                </span>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t(`upcoming.name.${i + 1}`)}</strong>
                  <span className={cn('schedule')}>{t(`upcoming.schedule.${i + 1}`)}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UpcomingChannels;
