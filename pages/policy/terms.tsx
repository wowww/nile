import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import cn from 'classnames';

import { Select } from 'antd';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      /* 22.11.17 수정: 공통 다국어 추가 */
      ...(await serverSideTranslations(locale, ['terms', 'common'])),
    },
  };
};

const Terms = () => {
  const { locale } = useRouter();
  const versionList = ['2022-11-11'];
  const [termsVer, setTermsVer] = useState(versionList[versionList.length - 1]);
  const { t } = useTranslation('terms', { keyPrefix: `terms.${termsVer}` });
  // TODO: 버전 변경 시 브랜드 사이트 코드 참고
  const { Option } = Select;

  const linkText = (
    <span>
      [<span>{locale === 'en' ? 'Link' : '링크'}</span>]
    </span>
  );

  const changeTermsVer = (value: string) => {
    setTermsVer(value);
  };

  return (
    <>
      <Helmet>
        <title>Terms of Service &gt; NILE</title>
        <body />
      </Helmet>
      <div className={cn('policy-wrap', 'terms')}>
        <div className={cn('title-area')}>
          <h2>{t('title')}</h2>
          {/* <span className="version-wrap">
            <Select
              className="outline-black"
              size="large"
              defaultValue="Version History"
              suffixIcon={<IconArrow />}
              popupClassName="select-size-md-dropdown"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              onChange={changeTermsVer}
              placeholder={'Version History'}
            >
              {versionList.map((date, index) => (
                <Option value={date}>{date}</Option>
              ))}
            </Select>
          </span> */}
          <span className={cn('version-only-one')}>{t('date')}</span>
        </div>

        <div className={cn('bottom-area')}>
          <div className={cn('contents-text')}>
            <div className={cn('paragraph')}>
              <div className={cn('related-text', 'bold')}>{t('desc')}</div>
            </div>

            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-1.title')}</h3>
              <ul className={cn('ol-list-en')}>
                <li>{t('h3-1.list.1')}</li>
                <li>{t('h3-1.list.2')}</li>
                <li>{t('h3-1.list.3')}</li>
              </ul>
            </div>

            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-2.title')}</h3>
              <div className={cn('related-text')}>{t('h3-2.desc')}</div>
            </div>

            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-3.title')}</h3>
              <ol className={cn('ol-list')}>
                <li>
                  <div className={cn('related-text')}>{t('h3-3.list.1.desc')}</div>
                  <ul className={cn('ol-list-en')}>
                    <li>{t('h3-3.list.1.list.1')}</li>
                    <li>{t('h3-3.list.1.list.2')}</li>
                    <li>{t('h3-3.list.1.list.3')}</li>
                  </ul>
                </li>
                <li>{t('h3-3.list.2')}</li>
                <li>
                  <div className={cn('related-text')}>{t('h3-3.list.3.desc')}</div>
                  <ul className={cn('ol-list-en')}>
                    <li>{t('h3-3.list.3.list.1')}</li>
                    <li>{t('h3-3.list.3.list.2')}</li>
                    <li>{t('h3-3.list.3.list.3')}</li>
                  </ul>
                </li>
                <li>{t('h3-3.list.4')}</li>
                <li>{t('h3-3.list.5')}</li>
                <li>{t('h3-3.list.6')}</li>
                <li>{t('h3-3.list.7')}</li>
                <li>{t('h3-3.list.8')}</li>
                <li>{t('h3-3.list.9')}</li>
              </ol>
            </div>

            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-4.title')}</h3>
              <ol className={cn('ol-list')}>
                <li>{t('h3-4.list.1')}</li>
                <li>{t('h3-4.list.2')}</li>
                <li>{t('h3-4.list.3')}</li>
                <li>{t('h3-4.list.4')}</li>
              </ol>
            </div>

            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-5.title')}</h3>
              <ol className={cn('ol-list')}>
                <li>{t('h3-5.list.1')}</li>
                <li>{t('h3-5.list.2')}</li>
                <li>{t('h3-5.list.3')}</li>
                <li>{t('h3-5.list.4')}</li>
                <li>{t('h3-5.list.5')}</li>
                <li>{t('h3-5.list.6')}</li>
                <li>{t('h3-5.list.7')}</li>
                <li>{t('h3-5.list.8')}</li>
              </ol>
            </div>

            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-6.title')}</h3>
              <ol className={cn('ol-list')}>
                <li>
                  <div className={cn('related-text')}>{t('h3-6.list.1.desc')}</div>
                  <ul className={cn('ol-list-en')}>
                    <li>{t('h3-6.list.1.list.1')}</li>
                    <li>{t('h3-6.list.1.list.2')}</li>
                    <li>{t('h3-6.list.1.list.3')}</li>
                    <li>{t('h3-6.list.1.list.4')}</li>
                  </ul>
                  <div className={cn('related-text')}>{t('h3-6.list.1.desc2')}</div>
                </li>
                <li>{t('h3-6.list.2')}</li>
              </ol>
              <div className={cn('related-text')}>{t('h3-6.desc')}</div>
            </div>

            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-7.title')}</h3>
              <div className={cn('related-text')}>{t('h3-7.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-8.title')}</h3>
              <div className={cn('related-text')}>{t('h3-8.desc')}</div>
            </div>

            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-9.title')}</h3>
              <div className={cn('related-text')}>{t('h3-9.desc')}</div>
              <ol className={cn('ol-list')}>
                <li>{t('h3-9.list.1')}</li>
                <li>{t('h3-9.list.2')}</li>
                <li>{t('h3-9.list.3')}</li>
                <li>{t('h3-9.list.4')}</li>
                <li>{t('h3-9.list.5')}</li>
                <li>{t('h3-9.list.6')}</li>
                <li>{t('h3-9.list.7')}</li>
                <li>{t('h3-9.list.8')}</li>
                <li>{t('h3-9.list.9')}</li>
                <li>{t('h3-9.list.10')}</li>
                <li>{t('h3-9.list.11')}</li>
                <li>{t('h3-9.list.12')}</li>
                <li>{t('h3-9.list.13')}</li>
                <li>{t('h3-9.list.14')}</li>
                <li>{t('h3-9.list.15')}</li>
                <li>{t('h3-9.list.16')}</li>
                <li>{t('h3-9.list.17')}</li>
                <li>{t('h3-9.list.18')}</li>
                <li>{t('h3-9.list.19')}</li>
                <li>{t('h3-9.list.20')}</li>
                <li>{t('h3-9.list.21')}</li>
                <li>{t('h3-9.list.22')}</li>
                <li>{t('h3-9.list.23')}</li>
                <li>{t('h3-9.list.24')}</li>
                <li>{t('h3-9.list.25')}</li>
                <li>{t('h3-9.list.26')}</li>
              </ol>
              <div className={cn('related-text')}>{t('h3-9.desc2')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-10.title')}</h3>
              <div className={cn('related-text')}>{t('h3-10.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-11.title')}</h3>
              <div className={cn('related-text')}>{t('h3-11.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-12.title')}</h3>
              <div className={cn('related-text')}>{t('h3-12.desc')}</div>
            </div>

            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-13.title')}</h3>
              <div className={cn('related-text')}>{t('h3-13.desc')}</div>
              <ol className={cn('ol-list')}>
                <li>{t('h3-13.list.1')}</li>
                <li>{t('h3-13.list.2')}</li>
                <li>{t('h3-13.list.3')}</li>
                <li>{t('h3-13.list.4')}</li>
                <li>{t('h3-13.list.5')}</li>
                <li>{t('h3-13.list.6')}</li>
                <li>{t('h3-13.list.7')}</li>
                <li>{t('h3-13.list.8')}</li>
                <li>{t('h3-13.list.9')}</li>
              </ol>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-14.title')}</h3>
              <div className={cn('related-text')}>{t('h3-14.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-15.title')}</h3>
              <div className={cn('related-text')}>{t('h3-15.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-16.title')}</h3>
              <div className={cn('related-text')}>{t('h3-16.desc')}</div>
              <ol className={cn('ol-list')}>
                <li>
                  <span className={cn('underline-text')}>{t('h3-16.list.1.underlineText')}</span>
                  {t('h3-16.list.1.desc')}
                </li>
                <li>
                  <span className={cn('underline-text')}>{t('h3-16.list.2.underlineText')}</span>
                  {t('h3-16.list.2.desc')}
                </li>
                <li>
                  <span className={cn('underline-text')}>{t('h3-16.list.3.underlineText')}</span>
                  {t('h3-16.list.3.desc')}
                </li>
                <li>
                  <span className={cn('underline-text')}>{t('h3-16.list.4.underlineText')}</span>
                  {t('h3-16.list.4.desc')}
                </li>
                <li>
                  <span className={cn('underline-text')}>{t('h3-16.list.5.underlineText')}</span>
                  {t('h3-16.list.5.desc')}
                </li>
                <li>
                  <span className={cn('underline-text')}>{t('h3-16.list.6.underlineText')}</span>
                  {t('h3-16.list.6.desc')}
                </li>
                <li>
                  <span className={cn('underline-text')}>{t('h3-16.list.7.underlineText')}</span>
                  {t('h3-16.list.7.desc')}
                </li>
                <li>
                  <span className={cn('underline-text')}>{t('h3-16.list.8.underlineText')}</span>
                  {t('h3-16.list.8.desc')}
                </li>
              </ol>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-17.title')}</h3>
              <div className={cn('related-text')}>{t('h3-17.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-18.title')}</h3>
              <div className={cn('related-text')}>{t('h3-18.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-19.title')}</h3>
              <div className={cn('related-text')}>{t('h3-19.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-20.title')}</h3>
              <div className={cn('related-text')}>{t('h3-20.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('h3-21.title')}</h3>
              <div className={cn('related-text')}>{t('h3-21.desc')}</div>
            </div>
            {locale === 'ko' && (
              <div className={cn('paragraph')}>
                <h3 className={cn('subtitle', 'bold')}>{t('h3-22.title')}</h3>
                <div className={cn('related-text')}>{t('h3-22.desc')}</div>
              </div>
            )}

            <div className={cn('date-wrap')}>
              <span>{t('datelist.notifi')}</span>
              <span>{t('datelist.execu')}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
