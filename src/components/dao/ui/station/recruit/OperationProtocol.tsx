import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { ReactSVG } from 'react-svg';
import { useCharacterFirstUppercase, useDaoCharacterConvert } from '@/hook/useCharacterConverter';

import OutlineButton from '@/components/button/OutlineButton';
import StationTitle from '@components/dao/ui/station/recruit/StationTitle';

interface ProtocolList {
  desc1: string[];
  desc2: string[];
}

const OperationProtocol = ({ smartContract = false }) => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const [activeProtocol, setActiveProtocol] = useState(0);
  const [protocolList, setProtocolList] = useState<ProtocolList[]>([]);

  const neithList = ['station', 'treasury', 'obelisk', 'governance', 'trust', 'incinerator'];

  useEffect(() => {
    setProtocolList(
      t(`station.recruiting.protocol.list`, {
        type: useDaoCharacterConvert(activeDao.value),
        unit1: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
        unit2: t('unit2', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
        returnObjects: true,
      }),
    );
  }, []);

  const neithImage = (neithType: string) => {
    switch (neithType) {
      case 'station':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_station.svg" />;
      case 'trust':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_trust.svg" />;
      case 'treasury':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_treasury.svg" />;
      case 'obelisk':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_stakingpool.svg" />;
      case 'incinerator':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_incinerator.svg" />;
      case 'governance':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_governance.svg" />;
      default:
        return false;
    }
  };

  const protocolListRenderer = (data: ProtocolList) => {
    if (activeProtocol === 3) {
      return (
        <li>
          {data.desc1[0]}
          <ul>
            <li>{data.desc1[1]}</li>
            <li>{data.desc1[2]}</li>
            <li>{data.desc1[3]}</li>
          </ul>
        </li>
      );
    } else {
      {
        return data.desc1.map((el, elIndex) => {
          return <li key={`desc-${elIndex}`}>{el}</li>;
        });
      }
    }
  };

  return (
    <div className={cn('operation-protocol-wrap')}>
      <StationTitle
        title="Protocol"
        desc={t('station.recruiting.protocol.desc', { type: useDaoCharacterConvert(activeDao.value) })}
        button={smartContract && <OutlineButton buttonText={t('station.recruiting.protocol.button')} color="black" size="md" />}
      />

      <div className={cn('operation-content-wrap')}>
        <div className={cn('protocol-item-wrap')}>
          {neithList.map((data, index) => {
            return (
              <button
                type="button"
                className={cn('protocol-item', { active: activeProtocol === index })}
                key={`protocol-item${index}`}
                onClick={() => setActiveProtocol(index)}
              >
                <div className={cn('item-name')}>{useCharacterFirstUppercase(data)}</div>
                <div className={cn('item-image')}>{neithImage(data)}</div>
              </button>
            );
          })}
        </div>

        <div className={cn('protocol-content-wrap')}>
          {protocolList.length > 0 &&
            typeof protocolList !== 'string' &&
            protocolList.map((data, index: number) => {
              if (index === activeProtocol) {
                return (
                  <div key={`item-${index}`} className={cn('content-item')}>
                    <strong className={cn('title')}>{t('station.recruiting.protocol.listTitle', { protocol: neithList[activeProtocol] })}</strong>
                    <ul className={cn('list-dot-wrap')}>{protocolListRenderer(data)}</ul>
                    <strong className={cn('title')}>Smart Contract in {useCharacterFirstUppercase(neithList[activeProtocol])}</strong>
                    <ul className={cn('list-dot-wrap')}>
                      {data.desc2.map((el, elIndex) => {
                        return <li key={`desc-${elIndex}`}>{el}</li>;
                      })}
                    </ul>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default OperationProtocol;
