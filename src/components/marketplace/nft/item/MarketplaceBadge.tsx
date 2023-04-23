import cn from 'classnames';
import { ReactSVG } from 'react-svg';

const MarketplaceBadge = ({ covenantValue }: { covenantValue: string }) => {
  return (
    <div className={cn('covenant-value-badge-wrap')}>
      {/* 23.03.11 수정: 이미지 교체 */}
      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/neithCollections/img_covenant_badge.svg" />

      <span className={cn('covenant-value')}>
        <strong>{covenantValue.replace('WEMIX', '').trim()}</strong>
        <span className={cn('unit')}>WEMIX</span>
      </span>
    </div>
  );
};

export { MarketplaceBadge };
