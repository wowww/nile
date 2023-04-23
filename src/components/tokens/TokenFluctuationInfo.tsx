import cn from 'classnames';
import { useTranslation } from 'next-i18next';

// components
import TagFluctuationRate from '../tag/TagFluctuationRate';
import millify from 'millify';

interface InfoItemProps {
  name: string;
  figure: string;
  fluctuationRate: number;
}

interface Props {
  token: any;
}

const TokenFluctuationInfo = ({ token }: Props) => {
  console.log(token);
  const { t } = useTranslation(['tokens']);
  const infoList: InfoItemProps[] = [
    {
      name: t('tokenFluctuationInfo.liquidity'),
      figure: millify(token['liquidity'], { precision: 2 }),
      fluctuationRate: token['24h'].liquidity_change,
    },
    {
      name: t('tokenFluctuationInfo.transactions'),
      figure: millify(token['24h'].tx_number, { precision: 0 }),
      fluctuationRate: token['24h'].tx_change,
    },
    {
      name: t('tokenFluctuationInfo.volume24h'),
      figure: millify(token['24h'].volume, { precision: 2 }),
      fluctuationRate: token['24h'].volume_change,
    },
    {
      name: t('tokenFluctuationInfo.volume7d'),
      figure: millify(token['7d'].volume, { precision: 2 }),
      fluctuationRate: token['7d'].volume_change,
    },
  ];

  return (
    <div className={cn('fluc-info-box')}>
      <div className={cn('top')}>
        <span className={cn('figure')}>${millify(token.price, { precision: 2 })} </span>
        <TagFluctuationRate figure={token['24h'].price_change} />
      </div>
      <div className={cn('bottom')}>
        {infoList.map((el, idx) => (
          <InfoItem key={el.name} {...el} />
        ))}
      </div>
    </div>
  );
};

const InfoItem: React.FC<InfoItemProps> = ({ name, figure, fluctuationRate }) => {
  return (
    <div className={cn('item')}>
      <span className={cn('info-name')}>{name}</span>
      <span className={cn('figure')}>{figure}</span>
      <TagFluctuationRate figure={fluctuationRate} />
    </div>
  );
};

export default TokenFluctuationInfo;
