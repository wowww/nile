import cn from 'classnames';
import OutlineButton from '@/components/button/OutlineButton';

import { ReactSVG } from 'react-svg';

const DaoStationMission = () => {
  return (
    <div className={cn('dao-station-mission', 'dao-station-section')}>
      <div className={cn('img-block')}></div>
      <div className={cn('text-block')}>
        <h3 className={cn('title')}>Our Mission</h3>
        <p className={cn('desc')}>
          WONDER DAO(Wemix On-chain Network Decentralized Ecosystem Regulator) contributes to decentralization and security of WEMIX3.0 by
          participating in the talknomics, technology and policymaking process of the WEMIX blockchain.
        </p>
        <div className={cn('button-wrap')}>
          <OutlineButton buttonText="Whitepaper" color="black" size="md" type="link" href="/" target="_blank" />
        </div>

        <a href="#" target="_blank" className={cn('mission-link')}>
          <span>Read a Value &amp; Vision of WEMIX Blockchain Ecosystem</span>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_right.svg' />
        </a>
      </div>
    </div>
  );
};

export default DaoStationMission;
