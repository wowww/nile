import React from 'react';
import cn from 'classnames';

const DaoStation3Points = () => {
  return (
    <div className={cn('dao-station-points', 'dao-station-section')}>
      <div className={cn('title-wrap')}>
        <h3 className={cn('title')}>3Points you need to know Participate in</h3>
      </div>
      <ol className={cn('dao-points-list')}>
        <li>
          <strong className={cn('point-title')}>01 Recruiting Period</strong>
          <div className={cn('point-desc')}>
            If you participate within the recruiting period, we will give you DT as much as you stake in. If you wish to participate in a period you
            must obtain a DT in WDS. Hurry up! If you sign up through the station, we'll give you NFT!
          </div>
        </li>
        <li>
          <strong className={cn('point-title')}>02 Minimum cost</strong>
          <div className={cn('point-desc')}>
            The minimum is 10 WEMIX. Additional Staking is possible, and the additional unit is 1 WEMIX.The more Staking there are, the more DAO
            Tokens are compensated.
          </div>
        </li>
        <li>
          <strong className={cn('point-title')}>03 DAO Token Information </strong>
          <div className={cn('point-desc')}>
            Since only a limited number of DAO tokens have been minted, if all tokens are exhausted, you must purchase them directly from WDS. Try to
            get DT before it's too late.
            <ul className={cn('list-type-dot')}>
              <li>The Ratio of WEMIX : DT = 1 : 1.142</li>
              <li>Total Amount of DTs for Station : 13,500,000 DT </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default DaoStation3Points;
