import { useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Radio, Select } from 'antd';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import TextButton from '@/components/button/TextButton';
import InfiniteLoader from '@/components/loader/InfiniteLoader';
import Empty from '@/components/empty/Empty';
import { NileApiService } from '@/services/nile/api';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { userProfileAtom } from '@/state/accountAtom';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import dynamic from "next/dynamic";

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
  setProfileImage?: (v: string) => void;
}

const { Option } = Select;

const PfpModal = ({ isOpen, setIsOpen, setProfileImage }: Props) => {
  const { t } = useTranslation(['mypage', 'common']);
  const api = NileApiService();

  const userProfile = useAtomValue(userProfileAtom);

  const [selectedImage, setSelectedImage] = useState<string>(userProfile?.img ?? '');

  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    if(isOpen) {
      api.mypage.nft
        .getList(userProfile.address ?? '')
        .then(({ data }) => setNftList(data.results))
        .catch((err) => {
          return null;
        });
    }
  }, [isOpen]);

  return (
    <ModalLayout
      wrapClassName="pfp-modal"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="md"
      title={t('pfp.title')}
      footer
      destroyOnClose={true}
      footerContent={[
        <OutlineButton
          key="Cancel"
          buttonText={t('pfp.cancel')}
          color="black"
          size="md"
          onClick={() => {
            setIsOpen(false);
          }}
        />,
        <BgButton
          key="Apply"
          buttonText={t('pfp.apply')}
          color="black"
          size="md"
          onClick={() => {
            setIsOpen(false);
            if (selectedImage) setProfileImage?.(selectedImage);
          }}
        />,
      ]}
    >
      <div className={cn('pfp-modal-inner')}>
        <div className={cn('title-wrap')}>
          <strong>{nftList.length > 0 && nftList.length} Owned NFT</strong>
          {nftList.length > 0 && (
            <Select
              size="small"
              defaultValue="recently"
              suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
              popupClassName="select-size-sm-dropdown"
              maxTagCount={1}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <Option value="recently">{t('sorting.1')}</Option>
              <Option value="highest">{t('sorting.5')}</Option>
              <Option value="lowest">{t('sorting.6')}</Option>
            </Select>
          )}
        </div>
        {nftList.length > 0 ? (
          <>
            <Radio.Group onChange={(e) => setSelectedImage(e.target.value)} value={selectedImage} className={cn('profile-list nft')}>
              {nftList.map((item: NileNftToken, index: number) => (
                <Radio.Button value={item?.imageUrl} key={`nft-list-${index}`}>
                  <span className={cn('img-wrap')}>
                    {item?.imageUrl && (
                      <Image src={item?.imageUrl} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
                    )}
                  </span>
                </Radio.Button>
              ))}
            </Radio.Group>
          </>
        ) : (
          <Empty
            subText={t('pfp.empty1')}
            button={<TextButton buttonText={t('pfp.empty2')} iconValue="arrow" size="sm" href="/marketplace" type="link" />}
          />
        )}
      </div>
    </ModalLayout>
  );
};

export default PfpModal;
