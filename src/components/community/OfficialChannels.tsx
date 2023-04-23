import {useEffect, useMemo, useState} from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';

import CommunityChannelAdmissionModal from '@/components/modal/CommunityChannelAdmissionModal';
import axios from 'axios';

interface Channel {
  appBackgroundUrl: string;
  categories: string[];
  channelDesc: string;
  channelLink: string;
  channelName: string;
  channelNo: number;
  channelQr: string;
  channelType: string;
  communityName: string;
  communityNo: number;
  imBackgroundUrl: string;
  logoPath: string;
  memberCount: number;
  official: boolean;
  onedayMessageCount: number;
  regDate: number;
}

const OfficialChannels = () => {
  const { t } = useTranslation('community');
  const [isCommunityModal, setCommunityModal] = useState<boolean>(false);
  const [currentChannel, setCurrentChannel] = useState<number>(0);
  const [channelList, setChannelList] = useState<Channel[]>([]);

  useEffect(() => {
    axios
      .get('/api/papyrus/channel')
      .then(({ data }) => setChannelList(data))
      .catch((err) => console.log(err));
  }, []);

  const nileChannel = useMemo(() => {
    return channelList?.filter((item) => item?.categories?.includes('NILE'))
  }, [channelList]);

  return (
    <div className={cn('community-official-wrap')}>
      <h2 className={cn('community-section-title')}>{t(`official.title`)}</h2>
      <ul className={cn('official-lists')}>
        {nileChannel?.length > 0 &&
          nileChannel
            .filter((item) => item.official)
            .map((data, index) => (
              <li key={`official-${index}`} className={cn('official-lists-item')}>
                <a
                  className={cn('official-card')}
                  onClick={() => {
                    setCommunityModal(true);
                    setCurrentChannel(data.channelNo);
                  }}
                >
                  <div className={cn('thumbnail')}>
                    <Image
                      src={data.imBackgroundUrl}
                      layout="fill"
                      objectFit="cover"
                      alt={`${data.channelName} ${t('representativeImage')}`}
                      loader={NileCDNLoader}
                    />
                  </div>
                  <div className={cn('content')}>
                    <div className={cn('logo')}>
                      <span className={cn('icon-logo-wrap')} style={{ width: '44px', height: '44px' }}>
                        <Image src={data.logoPath} alt="" layout="fill" quality={100} loader={NileCDNLoader} />
                      </span>
                      {data.official && (
                        <span className={cn('icon-official')}>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_official.svg" />
                        </span>
                      )}
                    </div>
                    <div className={cn('text-area')}>
                      <strong className={cn('name')}>{data.channelName}</strong>
                    </div>
                    <ul className={cn('info-area')}>
                      <li>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_member.svg" />
                        {data.memberCount}
                      </li>
                      <li>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_talks.svg" />
                        {data.onedayMessageCount}
                      </li>
                    </ul>
                  </div>
                </a>
                <CommunityChannelAdmissionModal
                  key={`official-popup-${index}`}
                  isOpen={isCommunityModal && currentChannel === data.channelNo}
                  setIsModal={setCommunityModal}
                  warning={data.channelName}
                  warningDetail={data.channelDesc}
                  copyLink={data.channelLink}
                  qrSvg={data.channelQr}
                  warningSvg={data.logoPath}
                />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default OfficialChannels;
