import React, { forwardRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { familySite, sns } from '@/components/footer/links';
import { Dropdown } from 'antd';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';

/* 23.03.11 수정: life title 수정, NEITH Station 메뉴 추가 */
const menuList = [
  {
    title: 'DAO',
    url: '/dao',
  },
  {
    title: 'NEITH Station',
    url: '/neith-station',
    disabled: false,
  },
  {
    title: 'Marketplace',
    url: '/marketplace',
  },
  {
    title: 'Projects',
    url: '/life',
    disabled: false,
  },
  {
    title: 'Community',
    url: '/community',
  },
  {
    title: 'Tokens',
    url: '/tokens',
  },
];

export const Footer = forwardRef(({}, ref: any) => {
  const { t } = useTranslation('common');

  const [langVisible, setLangVisible] = useState(false);
  const [familysiteVisible, setFamilysiteVisible] = useState(false);
  const { asPath, locale } = useRouter();

  const handleLangVisibleChange = (newVisible: boolean) => {
    setLangVisible(newVisible);
  };

  const handleFamilysiteVisibleChange = (newVisible: boolean) => {
    setFamilysiteVisible(newVisible);
  };

  return (
    <footer className={cn('footer')} ref={ref}>
      <div className={cn('footer-inner')}>
        <div className={cn('footer-top')}>
          <div className={cn('footer-logo')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_logo_white.svg" />
          </div>
          <div className={cn('footer-familysite')}>
            <div className={cn('footer-familysite-title')}>{t('footer.familySites')}</div>
            <ul className={cn('footer-familysite-list')}>
              {familySite.map(({ name, link }) => (
                <li key={name}>
                  <a href={link} target="_blank" rel="noopener noreferrer" title={t('blank')}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={cn('footer-familysite-mo')}>
            <Dropdown
              overlayClassName="familysite-list-wrap"
              overlay={
                <ul className={cn('familysite-list', familysiteVisible && 'active')}>
                  {familySite.map(({ name, link }) => (
                    <li key={name}>
                      <a href={link} target="_blank" rel="noopener noreferrer" title={t('blank')}>
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              }
              trigger={['click']}
              open={familysiteVisible}
              onOpenChange={handleFamilysiteVisibleChange}
              placement="bottom"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button" className={cn('familysite-title', familysiteVisible && 'active')}>
                {t('footer.familySites')}
                <i>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                </i>
              </button>
            </Dropdown>
          </div>
          <ul className={cn('footer-menu')}>
            {/* 22.11.10 수정 start: 11일 오픈 시 tokens 딤드 처리 */}
            {menuList.map((menu) => {
              return (
                <li key={menu.title}>
                  <Link href={{ pathname: menu.url }}>
                    <a href={menu.url}>{menu.title}</a>
                  </Link>
                </li>
              );
            })}
            {/* 22.11.10 수정 end: 11일 오픈 시 tokens 딤드 처리 */}
          </ul>
        </div>
        <div className={cn('footer-bottom')}>
          <div className={cn('footer-contact')}>
            {/* 22.11.10 수정 start: 링크 추가 */}
            <ul>
              <li>
                <Link href={locale === 'en' ? 'https://www.wemix.com/en/policy/terms' : 'https://www.wemix.com/ko/policy/terms'} passHref>
                  <a target="_blank" title={t('blank')} rel="noopener noreferrer">
                    {t('footer.termsOfService')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={locale === 'en' ? 'https://www.wemix.com/en/policy/privacy' : 'https://www.wemix.com/ko/policy/privacy'} passHref>
                  <a target="_blank" title={t('blank')} rel="noopener noreferrer">
                    {t('footer.privacyPolicy')}
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'en' ? 'https://www.wemix.com/en/policy/cookiepolicy' : 'https://www.wemix.com/ko/policy/cookiepolicy'}
                  passHref
                >
                  <a target="_blank" title={t('blank')} rel="noopener noreferrer">
                    {t('footer.cookiePolicy')}
                  </a>
                </Link>
              </li>
              <li className={cn('order1')}>
                <Link
                  href={locale === 'en' ? 'https://www.wemix.com/en/policy/californiaprivacy' : 'https://www.wemix.com/ko/policy/californiaprivacy'}
                  passHref
                >
                  <a target="_blank" title={t('blank')} rel="noopener noreferrer">
                    {t('footer.californiaPrivacyStatement')}
                  </a>
                </Link>
              </li>
              {/* 22.11.09 수정: 모바일 줄 바꿈으로 위하여 클래스 추가 */}
              <li className={cn('order2')}>
                <Link href="/policy/terms" passHref>
                  <a target="_blank">{t('footer.termsOfServiceForMarketplace')}</a>
                </Link>
              </li>
              <li>
                <Link href={locale === 'en' ? 'https://nile-cs.zendesk.com/hc/en-us' : 'https://nile-cs.zendesk.com/hc/ko'} passHref>
                  <a target="_blank" title={t('blank')} rel="noopener noreferrer">
                    {t('footer.supportCenter')}
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={
                    locale === 'en'
                      ? 'https://docs.wemix.com/v/nile-en/introduction/what-is-nile'
                      : 'https://docs.wemix.com/v/nile-ko/introduction/what-is-nile'
                  }
                  passHref
                >
                  <a target="_blank">{t('footer.docs')}</a>
                </Link>
              </li>
              <li>
                <div className={cn('footer-lang')}>
                  {/* TODO: 22.11.07 수정: 언어 선택 토글 버튼으로 변경 (향후 언어 3개 이상일 시 기존 드롭다운으로 롤백) */}
                  {locale === 'en' ? (
                    <Link href={asPath} locale="ko">
                      <a href={asPath} className={cn('btn-open-lang')}>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang_en.svg" title="Korean Site" />
                      </a>
                    </Link>
                  ) : (
                    <Link href={asPath} locale="en">
                      <a href={asPath} className={cn('btn-open-lang')}>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang_ko.svg" title="영문 사이트" />
                      </a>
                    </Link>
                  )}

                  {/* <Popover
                    overlayClassName="lang-list-wrap"
                    content={
                      <ul className={cn('lang-list')}>
                        <li>
                          <Link href={asPath} locale="en">
                            <a href={asPath} className={cn(locale === 'en' && 'active', 'link')}>
                              English
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href={asPath} locale="ko">
                            <a href={asPath} className={cn(locale === 'ko' && 'active')}>
                              Korean
                            </a>
                          </Link>
                        </li>
                      </ul>
                    }
                    trigger="click"
                    open={langVisible}
                    onOpenChange={handleLangVisibleChange}
                    placement="topLeft"
                  >
                    <button type="button" className={cn('btn-open-lang', langVisible && 'active')}>
                      <IconFooterLang />
                      <span className={cn('a11y')}>{t('selectLang')}</span>
                    </button>
                  </Popover> */}
                </div>
              </li>
              {/* 22.11.10 수정 end: 링크 추가 */}
            </ul>
            <p className={cn('footer-copy')}>© WEMIX PTE. LTD. All rights reserved.</p>
          </div>
          <div className={cn('footer-link-wrap')}>
            <ul className={cn('footer-sns')}>
              {sns.map(({ name, link }) => (
                <li key={name}>
                  {name === 'papyrus' ? (
                    <Link href="https://www.papyrus.im" passHref>
                      <a href={link} className={cn('sns-item', name)}>
                        <span className="a11y">{t('papyrus')}</span>
                      </a>
                    </Link>
                  ) : (
                    <a href={link} target="_blank" rel="noopener noreferrer" title={t('blank')} className={cn('sns-item', name)}>
                      <span className={cn('a11y')}>{name}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <a
            className={cn('footer-certik')}
            href="https://www.certik.com/projects/wemix"
            target="_blank"
            title={t('blank')}
            rel="noopener noreferrer"
          >
            <div className={cn('footer-certik-inner')}>
              <ReactSVG className={cn('certick-check')} src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_certik_cehck.svg" />
              Audited by
              <ReactSVG className={cn('certick-logo')} src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_certik_logo.svg" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
});
