import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
/* 22.10.06 수정: infinite loader 관련 제거 */
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { Modal } from 'antd';
import SearchHeader from '@/components/modal/search/SearchHeader';
import SearchHistory from '@/components/modal/search/SearchHistory';
import SearchResultEmpty from '@/components/modal/search/SearchResultEmpty';
import SearchCategory from '@/components/modal/search/SearchCategory';
import SearchResultList, { ResultList } from '@/components/modal/search/SearchResultList';
import useScrollLock from '@/hook/useScrollLock';
/* 22.10.06 수정: InfiniteLoader 추가 */
import InfiniteLoader from '@/components/loader/InfiniteLoader';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

const SearchModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const router = useRouter();
  const { lockScroll } = useScrollLock();

  const [searchValue, setSearchValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>('2');
  const [historyList, setHistoryList] = useState([]);
  // const [historyList, setHistoryList] = useState(['london alien space club', '024 london west', 'game', 'photo', 'tangled']); // 히스토리 있을 경우

  /* 22.11.18 수정: imgType 속성 추가 */
  const [resultList, setResultList] = useState<ResultList[]>([
    {
      categoryKey: '2',
      categoryName: 'DAO',
      list: [
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
      ],
    },
    {
      categoryKey: '3',
      categoryName: 'Life',
      list: [
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
        {
          link: 'https://',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Queen’s Memorial of Londoners',
          imgType: 'circle',
        },
      ],
    },
    {
      categoryKey: '4',
      categoryName: 'Collection',
      list: [
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'London Underground Station 264 : Genesis Co Collection',
          imgType: 'circle',
        },
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'Tangeled Timepieces in London',
          imgType: 'circle',
        },
      ],
    },
    {
      categoryKey: '4',
      categoryName: 'NFT',
      list: [
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail2.png',
          desc: '09 London Bridge',
          subDesc: 'Zeeha & Locho',
          imgType: 'square',
        },
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail2.png',
          desc: '024 London boy',
          subDesc: 'Safarinisisters',
          imgType: 'square',
        },
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail2.png',
          desc: '029 London Cat',
          subDesc: 'Neko',
          imgType: 'square',
        },
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail2.png',
          desc: 'London Eye',
          subDesc: 'BenjaminH',
          imgType: 'square',
        },
      ],
    },
    {
      categoryKey: '5',
      categoryName: 'Community',
      list: [],
    },
    {
      categoryKey: '6',
      categoryName: 'Token',
      list: [
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'London Underground Station 264 : Genesis Co Collection',
          imgType: 'circle',
        },
      ],
    },
    {
      categoryKey: '7',
      categoryName: 'Profile',
      list: [
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'lisalondon',
          imgType: 'circle',
        },
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'benjamin.london',
          imgType: 'circle',
        },
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'londonerjulian',
          imgType: 'circle',
        },
        {
          link: '/',
          img: '/temp/@temp_search_thumbnail.png',
          desc: 'hellolondon',
          imgType: 'circle',
        },
      ],
    },
  ]);

  const onCancel = () => {
    // Modal.destroyAll();
    setIsOpen(false);
    setSearchValue('');
  };

  useEffect(() => {
    setIsFocus(isOpen);
  }, [isOpen]);

  useEffect(() => {
    onCancel();
  }, [router.asPath]);

  useEffect(() => {
    lockScroll(isOpen);
  }, [isOpen]);

  /* 22.10.06 수정: infinite loader 관련 제거 */

  return (
    <Modal
      className={cn('search-modal')}
      closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />}
      title={<SearchHeader isFocus={isFocus} searchValue={searchValue} setSearchValue={setSearchValue} />}
      footer={null}
      width={800}
      open={isOpen}
      onCancel={onCancel}
      /* 22.10.20 수정: 모달 transition 효과 제거 */
      transitionName=""
    >
      <>
        {searchValue !== '' && searchValue.length > 2 && (
          <div className={cn('result-wrap')}>
            <SearchCategory currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
            {/* <SearchResultEmpty /> */}
            <div
              className={cn('result-content', {
                empty: resultList[resultList.findIndex((item) => item.categoryKey === currentCategory)].list.length <= 0,
              })}
            >
              {resultList.map((item: ResultList, index: number) => {
                if (currentCategory === item.categoryKey) {
                  if (item.list.length > 0) {
                    return (
                      <React.Fragment key={`result-list-${index}`}>
                        <SearchResultList {...item} setModalClose={onCancel} />
                        {/* 22.10.06 수정: InfiniteLoader 컴포넌트로 수정 */}
                        <InfiniteLoader />
                      </React.Fragment>
                    );
                  } else {
                    return <SearchResultEmpty key={`result-list-empty-${index}`} />;
                  }
                }
              })}
            </div>
          </div>
        )}
        {historyList.length > 0 && searchValue.length < 3 && <SearchHistory list={historyList} setSearchValue={setSearchValue} />}
      </>
    </Modal>
  );
};

export default SearchModal;
