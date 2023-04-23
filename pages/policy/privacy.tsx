import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import cn from 'classnames';

import {ReactSVG} from "react-svg";
import { Select } from 'antd';

const Privacy = () => {
  const { locale } = useRouter();
  const { t } = useTranslation(['common', 'privacy']);
  const { Option } = Select;

  const linkText = (
    <span>
      [<span>{locale === 'en' ? 'Link' : '링크'}</span>]
    </span>
  );

  return (
    <>
      <Helmet>
        <title>Privacy Policy &gt; NILE</title>
        <body />
      </Helmet>
      <div className={cn('policy-wrap', 'privacy')}>
        <div className={cn('title-area')}>
          <h2>{t('privacy.title')}</h2>
          <span className="version-wrap">
            <Select
              className="outline-black"
              size="large"
              defaultValue="Version History"
              suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
              popupClassName="select-size-md-dropdown"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <Option value="" selected disabled>
                Version History
              </Option>
              <Option value={t('privacy.ltd')}>{t('privacy.ltd')}</Option>
            </Select>
          </span>
        </div>

        <div className={cn('bottom-area')}>
          <div className={cn('contents-text')}>
            <div className={cn('paragraph')}>
              <div className={cn('related-text')}>{t('privacy.desc')}</div>
              <div className={cn('related-text')}>{t('privacy.desc2')}</div>
              <div className={cn('related-text')}>{t('privacy.desc3')}</div>
              <div className={cn('related-text')}>{t('privacy.desc4')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('privacy.h3-1.title')}</h3>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}> {t('privacy.h3-1.1.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-1.1.1.title')}</div>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-1.1.1.1')}</li>
                </ul>
                <div className={cn('related-text')}>{t('privacy.h3-1.1.1.text')}</div>
                <div className={cn('table-layout')}>
                  <table>
                    <colgroup>
                      <col style={{ width: '20%' }} />
                      <col />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>{t('privacy.h3-1.1.1.table.thead.tr.1')}</th>
                        <th>{t('privacy.h3-1.1.1.table.thead.tr.2')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.1.table.tbody.tr1.1')}</td>
                        <td>{t('privacy.h3-1.1.1.table.tbody.tr1.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.1.table.tbody.tr2.1')}</td>
                        <td>{t('privacy.h3-1.1.1.table.tbody.tr2.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.1.table.tbody.tr3.1')}</td>
                        <td>{t('privacy.h3-1.1.1.table.tbody.tr3.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.1.table.tbody.tr4.1')}</td>
                        <td>{t('privacy.h3-1.1.1.table.tbody.tr4.2.text')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-1.1.2.1')}</li>
                </ul>
                <div className={cn('related-text')}>{t('privacy.h3-1.1.2.text')}</div>
                <div className={cn('table-layout')}>
                  <table>
                    <colgroup>
                      <col style={{ width: '20%' }} />
                      <col />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>{t('privacy.h3-1.1.2.table.thead.tr.1')}</th>
                        <th>{t('privacy.h3-1.1.2.table.thead.tr.2')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.2.table.tbody.tr1.1')}</td>
                        <td>{t('privacy.h3-1.1.2.table.tbody.tr1.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.2.table.tbody.tr2.1')}</td>
                        <td>{t('privacy.h3-1.1.2.table.tbody.tr2.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.2.table.tbody.tr3.1')}</td>
                        <td>{t('privacy.h3-1.1.2.table.tbody.tr3.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.2.table.tbody.tr4.1')}</td>
                        <td>{t('privacy.h3-1.1.2.table.tbody.tr4.2.text')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-1.1.3.1')}</li>
                </ul>
                <div className={cn('related-text')}>{t('privacy.h3-1.1.3.text')}</div>
                <div className={cn('table-layout')}>
                  <table>
                    <colgroup>
                      <col style={{ width: '20%' }} />
                      <col />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>{t('privacy.h3-1.1.3.table.thead.tr.1')}</th>
                        <th>{t('privacy.h3-1.1.3.table.thead.tr.2')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.3.table.tbody.tr1.1')}</td>
                        <td>{t('privacy.h3-1.1.3.table.tbody.tr1.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.3.table.tbody.tr2.1')}</td>
                        <td>{t('privacy.h3-1.1.3.table.tbody.tr2.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.3.table.tbody.tr3.1')}</td>
                        <td>{t('privacy.h3-1.1.3.table.tbody.tr3.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.1.3.table.tbody.tr4.1')}</td>
                        <td>{t('privacy.h3-1.1.3.table.tbody.tr4.2.text')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}> {t('privacy.h3-1.2.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-1.2.text')}</div>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-1.2.1')}</li>
                  <li>{t('privacy.h3-1.2.2')}</li>
                </ul>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}> {t('privacy.h3-1.3.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-1.3.text1')}</div>
                <div className={cn('related-text')}>{t('privacy.h3-1.3.text2')}</div>
                <div className={cn('table-layout')}>
                  <table>
                    <colgroup>
                      <col style={{ width: '20%' }} />
                      <col />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>{t('privacy.h3-1.3.table.thead.tr.1')}</th>
                        <th>{t('privacy.h3-1.3.table.thead.tr.2')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.3.table.tbody.tr1.1')}</td>
                        <td>{t('privacy.h3-1.3.table.tbody.tr1.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.3.table.tbody.tr2.1')}</td>
                        <td>{t('privacy.h3-4.table.tbody.tr2.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.3.table.tbody.tr3.1')}</td>
                        <td>{t('privacy.h3-1.3.table.tbody.tr3.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.3.table.tbody.tr4.1')}</td>
                        <td>{t('privacy.h3-1.3.table.tbody.tr4.2.text')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-1.4.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-1.4.text')}</div>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-1.5.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-1.5.text1')}</div>
                <div className={cn('related-text')}>{t('privacy.h3-1.5.text2')}</div>
                <div className={cn('table-layout')}>
                  <table>
                    <colgroup>
                      <col style={{ width: '20%' }} />
                      <col />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>{t('privacy.h3-1.5.table.thead.tr.1')}</th>
                        <th>{t('privacy.h3-1.5.table.thead.tr.2')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.5.table.tbody.tr1.1')}</td>
                        <td>{t('privacy.h3-1.5.table.tbody.tr1.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.5.table.tbody.tr2.1')}</td>
                        <td>{t('privacy.h3-4.table.tbody.tr2.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.5.table.tbody.tr3.1')}</td>
                        <td>{t('privacy.h3-1.5.table.tbody.tr3.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.5.table.tbody.tr4.1')}</td>
                        <td>{t('privacy.h3-1.5.table.tbody.tr4.2.text')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-1.6.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-1.6.text')}</div>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-1.7.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-1.7.text')}</div>
                <div className={cn('table-layout')}>
                  <table>
                    <colgroup>
                      <col style={{ width: '20%' }} />
                      <col />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>{t('privacy.h3-1.7.table.thead.tr.1')}</th>
                        <th>{t('privacy.h3-1.7.table.thead.tr.2')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.7.table.tbody.tr1.1')}</td>
                        <td>{t('privacy.h3-1.7.table.tbody.tr1.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.7.table.tbody.tr2.1')}</td>
                        <td>{t('privacy.h3-4.table.tbody.tr2.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.7.table.tbody.tr3.1')}</td>
                        <td>{t('privacy.h3-1.7.table.tbody.tr3.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-1.7.table.tbody.tr4.1')}</td>
                        <td>{t('privacy.h3-1.7.table.tbody.tr4.2.text')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('privacy.h3-2.title')}</h3>
              <div className={cn('related-text')}>{t('privacy.h3-2.text')}</div>
              <ul className={cn('list-dash')}>
                <li>{t('privacy.h3-2.1')}</li>
                <li>{t('privacy.h3-2.2')}</li>
                <li>{t('privacy.h3-2.3')}</li>
                <li>{t('privacy.h3-2.4')}</li>
                <li>{t('privacy.h3-2.5')}</li>
                <li>{t('privacy.h3-2.6')}</li>
                <li>{t('privacy.h3-2.7')}</li>
                <li>{t('privacy.h3-2.8')}</li>
                <li>{t('privacy.h3-2.9')}</li>
                <li>{t('privacy.h3-2.10')}</li>
              </ul>
              <div className={cn('related-text')}>{t('privacy.h3-2.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('privacy.h3-3.title')}</h3>
              <div className={cn('related-text')}>{t('privacy.h3-3.text')}</div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}> {t('privacy.h3-3.1.title')}</h4>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-3.1.1')}</li>
                </ul>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-3.2.title')}</h4>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-3.2.1')}</li>
                  <li>{t('privacy.h3-3.2.2')}</li>
                  <li>{t('privacy.h3-3.2.3')}</li>
                </ul>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-3.3.title')}</h4>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-3.3.1')}</li>
                  <li>{t('privacy.h3-3.3.2')}</li>
                </ul>
              </div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('privacy.h3-4.title')}</h3>
              <div className={cn('related-text')}>{t('privacy.h3-4.text')}</div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-4.1.title')}</h4>
                <div className={cn('table-layout')}>
                  <table>
                    <colgroup>
                      <col style={{ width: '20%' }} />
                      <col />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>{t('privacy.h3-4.1.table.thead.tr.1')}</th>
                        <th>{t('privacy.h3-4.1.table.thead.tr.2')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-4.1.table.tbody.tr1.1')}</td>
                        <td>{t('privacy.h3-4.1.table.tbody.tr1.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-4.1.table.tbody.tr2.1')}</td>
                        <td>{t('privacy.h3-4.table.tbody.tr2.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-4.1.table.tbody.tr3.1')}</td>
                        <td>{t('privacy.h3-4.1.table.tbody.tr3.2.text')}</td>
                      </tr>
                      <tr>
                        <td className={cn('table-td-bg')}>{t('privacy.h3-4.1.table.tbody.tr4.1')}</td>
                        <td>{t('privacy.h3-4.1.table.tbody.tr4.2.text')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={cn('related-text')}>{t('privacy.h3-4.desc')}</div>
              </div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('privacy.h3-5.title')}</h3>
              <div className={cn('related-text')}>{t('privacy.h3-5.text')}</div>
              <ul className={cn('list-dash')}>
                <li>{t('privacy.h3-5.1')}</li>
                <li>{t('privacy.h3-5.2')}</li>
                <li>{t('privacy.h3-5.3')}</li>
                <li>{t('privacy.h3-5.4')}</li>
              </ul>
              <div className={cn('related-text')}>{t('privacy.h3-5.desc')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('privacy.h3-6.title')}</h3>
              <div className={cn('related-text')}>{t('privacy.h3-6.text')}</div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-6.1.title')}</h4>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-6.1.1')}</li>
                  <li>{t('privacy.h3-6.1.2')}</li>
                </ul>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}> {t('privacy.h3-6.2.title')}</h4>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-6.2.1')}</li>
                </ul>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}> {t('privacy.h3-6.3.title')}</h4>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}> {t('privacy.h3-6.4.title')}</h4>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}> {t('privacy.h3-6.5.title')}</h4>
              </div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('privacy.h3-7.title')}</h3>
              <div className={cn('related-text')}>{t('privacy.h3-7.text')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('privacy.h3-8.title')}</h3>
              <div className={cn('related-text')}>{t('privacy.h3-8.text')}</div>
            </div>
            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('privacy.h3-9.title')}</h3>
              <div className={cn('related-text')}>{t('privacy.h3-9.text1')}</div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-9.1.title')}</h4>
                <ol className={cn('ol-list')}>
                  <li>{t('privacy.h3-9.1.1.1.title')}</li>
                  <li>
                    {t('privacy.h3-9.1.1.2.title')}
                    <ul className={cn('list-dash', 'mt-lg')}>
                      <li>{t('privacy.h3-9.1.1.2.1')}</li>
                      <li>{t('privacy.h3-9.1.1.2.2')}</li>
                    </ul>
                  </li>
                  <li>
                    {t('privacy.h3-9.1.1.3.title')}
                    <ul className={cn('list-dash', 'mt-lg')}>
                      <li>{t('privacy.h3-9.1.1.3.1')}</li>
                    </ul>
                  </li>
                  <li>{t('privacy.h3-9.1.1.4.title')}</li>
                  <li>{t('privacy.h3-9.1.1.5.title')}</li>
                  <li>{t('privacy.h3-9.1.1.3.title')}</li>
                </ol>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-9.2.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-9.2.text1')}</div>
                <ul className={cn('list-dash', 'mt-lg')}>
                  <li>
                    {t('privacy.h3-9.2.1.title')}
                    <div className={cn('related-text')}>{t('privacy.h3-9.2.1.text')}</div>
                  </li>
                  <li>
                    {t('privacy.h3-9.2.2.title')}
                    <div className={cn('related-text')}>{t('privacy.h3-9.2.2.text')}</div>
                  </li>
                  <li>
                    {t('privacy.h3-9.2.3.title')}
                    <div className={cn('related-text')}>{t('privacy.h3-9.2.3.text')}</div>
                  </li>
                  <li>
                    {t('privacy.h3-9.2.4.title')}
                    <div className={cn('related-text')}>{t('privacy.h3-9.2.4.text')}</div>
                  </li>
                  <li>
                    {t('privacy.h3-9.2.5.title')}
                    <div className={cn('related-text')}>{t('privacy.h3-9.2.5.text')}</div>
                  </li>
                  <li>
                    {t('privacy.h3-9.2.6.title')}
                    <div className={cn('related-text')}>{t('privacy.h3-9.2.6.text')}</div>
                  </li>
                  <li>
                    {t('privacy.h3-9.2.7.title')}
                    <div className={cn('related-text')}>{t('privacy.h3-9.2.7.text')}</div>
                  </li>
                </ul>
                <div className={cn('related-text')}>{t('privacy.h3-9.2.text2')}</div>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-9.3.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-9.3.text')}</div>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-9.4.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-9.4.text')}</div>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-9.5.title')}</h4>
                <div className={cn('related-text')}>{t('privacy.h3-9.5.text')}</div>
              </div>
              <div className={cn('related-text')}>{t('privacy.h3-9.text2')}</div>
              <div className={cn('related-text')}>{t('privacy.h3-9.text3')}</div>
            </div>

            <div className={cn('paragraph')}>
              <h3 className={cn('subtitle', 'bold')}>{t('privacy.h3-10.title')}</h3>
              <div className={cn('related-text')}>{t('privacy.h3-10.text1')}</div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-10.1.title')}</h4>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-10.1.1')}</li>
                  <li>{t('privacy.h3-10.1.2')}</li>
                  <li>{t('privacy.h3-10.1.3')}</li>
                </ul>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-10.2.title')}</h4>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-10.2.1')}</li>
                  <li>{t('privacy.h3-10.2.2')}</li>
                  <li>{t('privacy.h3-10.2.3')}</li>
                  <li>{t('privacy.h3-10.2.4')}</li>
                </ul>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-10.3.title')}</h4>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-10.3.1')}</li>
                  <li>{t('privacy.h3-10.3.2')}</li>
                  <li>{t('privacy.h3-10.3.3')}</li>
                </ul>
              </div>
              <div className={cn('h4-wrap')}>
                <h4 className={cn('title-h4')}>{t('privacy.h3-10.4.title')}</h4>
                <ul className={cn('list-dash')}>
                  <li>{t('privacy.h3-10.4.1')}</li>
                  <li>{t('privacy.h3-10.4.2')}</li>
                  <li>{t('privacy.h3-10.4.3')}</li>
                </ul>
              </div>
              <div className={cn('related-text')}>{t('privacy.h3-10.text2')}</div>
              <div className={cn('related-text')}>{t('privacy.h3-10.text3')}</div>
              <div className={cn('table-layout')}>
                <table>
                  <colgroup>
                    <col style={{ width: '20%' }} />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>{t('privacy.h3-10.table.thead.tr.1')}</th>
                      <th>{t('privacy.h3-10.table.thead.tr.2')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={cn('table-td-bg')}>{t('privacy.h3-10.table.tbody.tr1.1')}</td>
                      <td>{t('privacy.h3-10.table.tbody.tr1.2.text')}</td>
                    </tr>
                    <tr>
                      <td className={cn('table-td-bg')}>{t('privacy.h3-10.table.tbody.tr2.1')}</td>
                      <td>{t('privacy.h3-10.table.tbody.tr2.2.text')}</td>
                    </tr>
                    <tr>
                      <td className={cn('table-td-bg')}>{t('privacy.h3-10.table.tbody.tr3.1')}</td>
                      <td>{t('privacy.h3-10.table.tbody.tr3.2.text')}</td>
                    </tr>
                    <tr>
                      <td className={cn('table-td-bg')}>{t('privacy.h3-10.table.tbody.tr4.1')}</td>
                      <td>{t('privacy.h3-10.table.tbody.tr4.2.text')}</td>
                    </tr>
                    <tr>
                      <td className={cn('table-td-bg')}>{t('privacy.h3-10.table.tbody.tr5.1')}</td>
                      <td>{t('privacy.h3-10.table.tbody.tr5.2.text')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      /* 22.11.17 수정: 공통 다국어 추가 */
      ...(await serverSideTranslations(locale, ['common', 'privacy'])),
    },
  };
};
export default Privacy;
