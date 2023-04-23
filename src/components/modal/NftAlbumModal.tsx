import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';

import { Checkbox } from 'antd';
import { nftCardData } from '@/components/marketplace/cardData';

import TextButton from '@/components/button/TextButton';
import Empty from '@/components/empty/Empty';
import { ReactSVG } from 'react-svg';
import { NileCDNLoader } from '@utils/image/loader';
import dynamic from "next/dynamic";

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}

const PopNftAlbum = ({ isModal, setIsModal }: Props) => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);
  const [isOptionsOpen, setIsOptionsOpen] = useState([false, false]);
  const [collection, properties] = isOptionsOpen;
  const [selectedOption, setSelectedOption] = useState(0);
  const [isChecked, setIsChecked] = useState<string[]>([]);
  const [filterSelected, setFilterSelected] = useState(0);
  const optionsListCollect = [
    { icon: '/icons/ico_lus264.svg', optionName: 'London Underground Station(LUS) 264 Genesis' },
    { icon: '/icons/ico_sight_of_nile.svg', optionName: 'Sights of NILE(SON)' },
  ];
  const optionsListProperties = [
    { title: 'Zone', checkList: ['Zone1', 'Zone2', 'Zone3', 'Zone4', 'Zone5', 'Zone6', 'Zone7', 'Zone8'] },
    {
      title: 'State Line',
      checkList: [
        'Bekerloo',
        'Central',
        'Central',
        'Circle',
        'District',
        'Hammersmith & City',
        'Jubilee',
        'Metropolitan',
        'Northern',
        'Piccadilly',
        'Victoria',
        'Victoria',
      ],
    },
    { title: 'Staton with Car Parks', checkList: ['Yes', 'No'] },
    { title: 'Station with Bicycle Parking', checkList: ['Yes', 'No'] },
    { title: 'Toilets outside ticket gateline', checkList: ['None', 'Male', 'Female', 'Baby Changing', 'Accessible'] },
    { title: 'Toilets inside ticket gateline', checkList: ['None', 'Male', 'Female', 'Baby Changing', 'Accessible'] },
  ];
  let currentTarget: HTMLElement;

  const onToggleOptions = (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLElement>) => {
    currentTarget = event.currentTarget as HTMLButtonElement;

    if (currentTarget.classList.contains('custom-select-mask')) {
      setIsOptionsOpen([false, false]);
      setFilterSelected(isChecked.length);

      return;
    }
    if (currentTarget.getAttribute('aria-controls') === 'collection') {
      setIsOptionsOpen([!collection, properties]);
      return;
    }
    setIsOptionsOpen([false, !properties]);
    setFilterSelected(isChecked.length);
  };

  const onBlurSelectHandler = (event: React.FocusEvent<HTMLButtonElement>) => {
    currentTarget = event.currentTarget;
    const eTarget = event.target;

    setSelectedOption(selectedOption);
    // setFilterSelected(isChecked.length);
    setTimeout(() => {
      if (currentTarget === eTarget) {
        setIsOptionsOpen([false, properties]);
      }
    }, 150);
  };

  const onVisibleOption = (event: React.MouseEvent<HTMLUListElement>) => {
    currentTarget = event.currentTarget;

    setIsOptionsOpen([collection, true]);
  };

  const setSelectedThenCloseDropdown = (event: React.MouseEvent<HTMLElement>, index: React.SetStateAction<number>) => {
    currentTarget = event.currentTarget as HTMLElement;
    const targetParents = event.currentTarget.parentNode as HTMLElement;

    if (targetParents.getAttribute('id') === 'collection') {
      setIsOptionsOpen([!collection, properties]);
      setSelectedOption(index);
    } else {
      setIsOptionsOpen([collection, !properties]);
      setFilterSelected(isChecked.length);
    }
  };

  const onCheckedChange = (event: any) => {
    const checkedTarget = event.target as HTMLInputElement;

    if (checkedTarget.checked) {
      // 체크
      setIsChecked([...isChecked, checkedTarget.id]);
    } else {
      // 체크 해제
      isChecked.forEach((checked, index) => {
        if (checked === checkedTarget.id) {
          setIsChecked((isChecked) => [...isChecked.slice(0, index), ...isChecked.slice(index + 1)]);
        }
      });
    }
  };
  useEffect(() => {
    if (!isModal) {
      setIsOptionsOpen([false, false]);
      setFilterSelected(isChecked.length);
    }
  }, [isModal, filterSelected]);

  // 모바일 커스텀 vh
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  return (
    <ModalLayout
      isOpen={isModal}
      setIsOpen={setIsModal}
      size="lg-t"
      title={t('album.title')}
      subTitle={t('album.subTitle')}
      footer={false}
      wrapClassName="nft-owned-select-wrap"
      destroyOnClose={true}
    >
      <div className={cn('selectbox-wrap')}>
        <div className={cn('custom-select collection', `${isOptionsOpen[0] ? 'expanded' : ''}`)}>
          <div className={cn('select-area')}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isOptionsOpen[0]}
              aria-controls="collection"
              onClick={(e) => onToggleOptions(e)}
              onBlur={(e) => onBlurSelectHandler(e)}
            >
              <em className={cn('option-name')}>{optionsListCollect[selectedOption].optionName}</em>
              <span className={cn('btn-arrow')}>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
              </span>
            </button>
          </div>

          <div className={cn('options-area')}>
            <p className="depth1-title">Collection</p>
            <ul id={cn('collection')} role="listbox" aria-activedescendant={optionsListCollect[selectedOption].optionName} tabIndex={-1}>
              {optionsListCollect.map((option, index) => (
                <li
                  key={index + 1}
                  id={option.optionName}
                  role="option"
                  aria-selected={selectedOption == index}
                  tabIndex={0}
                  onClick={(e) => setSelectedThenCloseDropdown(e, index)}
                >
                  <span className={cn('option-icon')}>
                    <Image src={option.icon} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
                  </span>
                  <em className={cn('option-name')}>{option.optionName}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cn('custom-select properties', `${isOptionsOpen[1] ? 'expanded' : ''}`, `${filterSelected > 0 ? 'current' : ''}`)}>
          <div className={cn('select-area')}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isOptionsOpen[1]}
              aria-controls="properties"
              onClick={(e) => onToggleOptions(e)}
              // onBlur={(e) => onBlurSelectHandler(e)}
            >
              Properties
              {filterSelected > 0 ? <span className={cn('selected-num')}>{filterSelected}</span> : ''}
              <span className={cn('btn-arrow')}>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
              </span>
            </button>
          </div>
          <div className={cn('options-area')}>
            <p className="depth1-title">Properties</p>
            <ul
              // onClick={(e) => onVisibleOption(e)}
              id={cn('properties')}
              role="listbox"
              aria-activedescendant={optionsListProperties[selectedOption].title}
              tabIndex={-1}
            >
              {optionsListProperties.map((option, index) => (
                <li key={index + 1} id={option.title} role="option" aria-selected={selectedOption == index} tabIndex={0}>
                  <p className={cn('option-title')}>{option.title}</p>
                  <div className="input-checkbox-area">
                    {option.checkList.map((checkbox, i) => (
                      <span className={cn('input-checkbox')} key={i + 1}>
                        <Checkbox id={`${checkbox}-${index}-${i}`} defaultChecked={false} onChange={(e) => onCheckedChange(e)}>
                          {checkbox}
                        </Checkbox>
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <div className="control-btn-area">
              <button type="button" className={cn('btn-reset ant-btn btn-outline outline-black btn-sm')}>
                <span className="btn-inner">
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_reset_em.svg' />
                  <span>Reset</span>
                </span>
              </button>
              <button type="button" className={cn('btn-apply ant-btn btn-bg bg-black btn-sm')} onClick={(e) => setSelectedThenCloseDropdown(e, 0)}>
                <span>Apply</span>
              </button>
            </div>
            <button type="button" className={cn('btn-option-closed')} title="Properties 옵션 닫기" onClick={(e) => onToggleOptions(e)}>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg'  />
            </button>
          </div>
        </div>
        <div className="custom-select-mask" onClick={(e) => onToggleOptions(e)}></div>
      </div>

      <div className="nft-owned-wrap">
        <p className="nft-owned-num">
          Owned <em className="length">12</em>/<span className="total">264</span> NFT
        </p>
        <ul className={cn('nft-owned-list', nftCardData.length === 0 ? 'empty' : '')}>
          {nftCardData.length > 0 ? (
            nftCardData.map((item, index) => {
              return (
                <li className={cn({ mine: false })} key={index + 1}>
                  <Link href="/" passHref>
                    <a className={cn('ntf-owned-img')} target="_blank">
                      <div className={cn('img-block')}>
                        <Image src={item.imgUrl} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
                      </div>
                    </a>
                  </Link>
                  <strong className={cn('ntf-owned-title')}>{item.productTitle}</strong>
                </li>
              );
            })
          ) : (
            <Empty
              subText={t('empty.nftAlbum')}
              button={<TextButton buttonText={t('goToMarketplace', { ns: 'common' })} iconValue="arrow" size="sm" href="/marketplace" type="link" />}
            />
          )}
        </ul>
      </div>
    </ModalLayout>
  );
};

export default PopNftAlbum;
