import cn from 'classnames';
import Tag from '@components/tag/Tag';
import { ReactElement, useCallback, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';

interface ProtocolListType {
  name: string;
  new: boolean;
  img: ReactElement;
  amount?: string;
  count?: number;
}

const DaoIndividualHomeNeithProtocol = () => {
  const [currentProtocol, setCurrentProtocol] = useState<string>('');

  const protocolList: ProtocolListType[] = useMemo(
    () => [
      {
        name: 'Station',
        new: true,
        count: 12,
        img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_station.svg" />,
      },
      {
        name: 'Treasury',
        new: true,
        count: 12,
        img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_treasury.svg" />,
        amount: '120,293,482',
      },
      {
        name: 'Trust',
        new: true,
        count: 12,
        img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_trust.svg" />,
      },
      {
        name: 'Incinerator',
        new: true,
        count: 12,
        img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_incinerator.svg" />,
      },
      {
        name: 'Staking Pool',
        new: true,
        count: 12,
        img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_staking_pool.svg" />,
      },
      {
        name: 'Governance',
        new: true,
        count: 12,
        img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_governance.svg" />,
      },
    ],
    []
  );

  const onClickProtocol = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setCurrentProtocol(target.value);
  }, []);

  return (
    <ul className={cn('protocol-list')}>
      {protocolList.map((item) => (
        <li
          key={item.name}
          className={cn(
            'protocol-item',
            item.name.split(' ').join('-').toLocaleLowerCase(),
            currentProtocol === item.name.split(' ').join('-').toLocaleLowerCase() && 'active',
            item.name === 'Treasury' && 'protocol-item-lg',
            (item.name === 'Trust' || item.name === 'Incinerator') && 'protocol-item-md'
          )}
        >
          <button type="button" value={item.name.split(' ').join('-').toLocaleLowerCase()} onClick={onClickProtocol}>
            <span className={cn('protocol-name')}>{item.name}</span>
            {item.new && (
              <Tag size="s" type="primary">
                {item.count}
              </Tag>
            )}
            {item.amount && (
              <div className={cn('amount-wrap')}>
                <span className={cn('unit')}>$</span>
                <span className={cn('amount')}>{item.amount}</span>
              </div>
            )}
            {item.img}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DaoIndividualHomeNeithProtocol;
