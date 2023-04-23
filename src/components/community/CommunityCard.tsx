import cn from 'classnames';
import Tag from '@/components/tag/Tag';
import Image from 'next/image';
import BgButton from '../button/BgButton';
import { useEffect, useState } from 'react';
import { CommunityCardData } from 'pages/community';
import { message } from 'antd';
import ModalLayout from '../modal/ModalLayout';
/* 22.11.02 수정: 다국어 추가 */
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import useMediaQuery from '@/hook/useMediaQuery';

interface ICommunityCard {
  login: boolean; // 임시 props 입니다.
  data: CommunityCardData;
}

const CommunityCard = ({ data, login }: ICommunityCard) => {
  const { t } = useTranslation('community');

  const [modalActive, setModalActive] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');

  const ActionButton = ({ join, type }: { join: boolean; type: { name: string; status?: boolean } }) => {
    return (
      <>
        {/* START: 22.11.07 11/11 오픈 콘텐츠 */}
        {!login && (
          /* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */
          <BgButton
            type="primary"
            buttonText={t('card.participate')}
            color="black"
            size="md"
            onClick={() => message.info({ content: t('unfoldingSoon'), key: 'toast' })}
          />
        )}
        {/* END: 22.11.07 11/11 오픈 콘텐츠 */}
        {/* START: 22.11.07 11/11 오픈 제외 콘텐츠 */}
        {/* {!login && <BgButton buttonText={t('card.participate')} color="black" size="md" disabled onClick={() => setModalActive(true)} />} */}
        {/* END: 22.11.07 11/11 오픈 제외 콘텐츠 */}
        {login && join && (
          <BgButton href="" target="_blank" buttonText={t('card.link', { link: 'PAPYRUS' })} color="black" size="md" onClick={() => {}} />
        )}
        {login && !join && type.name === 'nft' && (
          <>
            <p className="join-info">{t('card.needNFT')}</p>
            <BgButton href="" target="_blank" buttonText={t('card.link', { link: 'Marketplace' })} color="black" size="md" onClick={() => {}} />
          </>
        )}
        {login && !join && type.name === 'dao' && type.status && (
          <>
            <p className="join-info">{t('card.needToken', { token: data.token })}</p>
            <BgButton
              href=""
              target="_blank"
              buttonText={t('card.link', { link: 'WEMIX.Fi' })}
              color="black"
              size="md"
              iconType
              iconValue="link"
              align
              onClick={() => {}}
            />
          </>
        )}
        {login && !join && type.name === 'dao' && !type.status && (
          <>
            <p className="join-info">{t('card.needDao', { dao: data.description })}</p>
            <BgButton href="" target="_blank" buttonText={t('card.link', { link: 'Station' })} color="black" size="md" onClick={() => {}} />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <div className={cn('community-card')}>
        <div className={cn('info')}>
          <div className={cn('info-image')}>
            <Image
              src={data.thumbnail}
              layout="fill"
              objectFit={isMobile ? 'cover' : 'contain'}
              alt={data.title + `${t('representativeImage')}`}
              loader={NileCDNLoader}
            />
          </div>
          <div className={cn('info-content')}>
            <ul>
              <li>
                {data.tags &&
                  data.tags.map((tag, index) => (
                    <Tag key={'tags' + index} size="s" color="black">
                      {tag}
                    </Tag>
                  ))}
              </li>
              <li className={cn('info-title')}>{data.title}</li>
              <li className={cn('info-description')}>
                {/* 22.11.02 수정: 다국어를 위한 dao/nft 분기처리 */}
                {data.type.name === 'dao' ? (
                  <p>{t('card.daoText', { name: data.description })}</p>
                ) : (
                  <p>{t('card.nftText', { name: data.description })}</p>
                )}
              </li>
            </ul>

            {(isMobile || isTablet) && (
              <div className={cn('action-button')}>
                <ActionButton join={data.join} type={data.type} />
              </div>
            )}
          </div>

          {/* 22.11.01 수정: 모바일 버튼 위치 수정 */}
          {isMobile && (
            <div className={cn('is-size-sm-action-button')}>
              <ActionButton join={data.join} type={data.type} />
            </div>
          )}
        </div>
        {/* START: 22.11.03 11/11 오픈 제외 콘텐츠 */}
        {/* <div className={cn('extra-info')}>
          <ul>
            <li className={cn('members-wrap')}>
              <span className={cn('title')}>{t('card.totalMembers')}</span>
              <div className={cn('members')}>
                <Avatar.Group maxCount={3}>
                  {data.members &&
                    data.members.map((member, index) => (
                      <Avatar key={'user-avatar' + index} src={member.avatar} className={cn('user-image')} size={32}>
                        <span className={cn('a11y')}>
                          {member.name}
                          {t('openProfile')}
                        </span>
                      </Avatar>
                    ))}
                </Avatar.Group>
                <span className={cn('unit')}>+{data.members && data.members.length}</span>
              </div>
            </li>
            <li>
              <span className={cn('title')}>{t('card.lastConversation')}</span>
              <p>
                {data.latest.value} <span className={cn('unit')}>{data.latest.format}</span>
              </p>
            </li>
            <li>
              {data.tags.includes('DAO') && <span className={cn('title')}>Market Cap</span>}
              {data.tags.includes('NFT') && <span className={cn('title')}>{t('card.nftVolume')}</span>}
              <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.marketCap)}</p>
            </li>
          </ul>
        </div> */}
        {/* END: 22.11.03 11/11 오픈 제외 콘텐츠 */}
      </div>
      <ModalLayout
        isOpen={modalActive}
        setIsOpen={setModalActive}
        size="sm"
        title={t('card.walletRequired')}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <BgButton
            buttonText={t('card.connectWallet')}
            color="black"
            size="md"
            key="Connect Wallet"
            onClick={() => {
              setModalActive(false);
            }}
          />,
        ]}
      >
        <p>{t('card.connectWalletAnnounce')}</p>
      </ModalLayout>
    </>
  );
};

export default CommunityCard;
