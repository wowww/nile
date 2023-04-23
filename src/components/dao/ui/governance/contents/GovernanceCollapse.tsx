import { Collapse } from 'antd';
import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';

// images
import { ReactSVG } from 'react-svg';

const { Panel } = Collapse;

const GovernanceCollapse = () => {
  const { t } = useTranslation('dao');
  return (
    <div className={cn('governance-collapse-wrap')}>
      <Collapse defaultActiveKey={['1']} bordered={false} expandIconPosition="end" className="governance-collapse">
        <Panel
          header={
            <>
              {t('governance.contents.1.title')} <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
            </>
          }
          key="1"
        >
          <div className={cn('collapse-top-wrap')}>
            <ol className={cn('collapse-top')}>
              <li>
                <strong>
                  <span className={cn('num')}>01</span>
                  {t('governance.contents.1.items.1.title')}
                </strong>
                <p className={cn('desc')}>{t('governance.contents.1.items.1.desc')}</p>
                <ul>
                  <li>{t('governance.contents.1.items.1.list.1')}</li>
                  <li>{t('governance.contents.1.items.1.list.2')}</li>
                  <li>{t('governance.contents.1.items.1.list.3')}</li>
                </ul>
              </li>
              <li>
                <strong>
                  <span className={cn('num')}>02</span>
                  {t('governance.contents.1.items.2.title')}
                </strong>
                <p className={cn('desc')}>{t('governance.contents.1.items.2.desc')}</p>
                <ul>
                  <li>{t('governance.contents.1.items.2.list.1')}</li>
                  <li>{t('governance.contents.1.items.2.list.2')}</li>
                  <li>{t('governance.contents.1.items.2.list.3')}</li>
                </ul>
              </li>
              <li>
                <strong>
                  <span className={cn('num')}>01</span>
                  {t('governance.contents.1.items.3.title')}
                </strong>
                <p className={cn('desc')}>{t('governance.contents.1.items.3.desc')}</p>
                <ul>
                  <li>{t('governance.contents.1.items.3.list.1')}</li>
                  <li>{t('governance.contents.1.items.3.list.2')}</li>
                </ul>
              </li>
            </ol>
          </div>
          <div className={cn('collapse-bottom')}>
            <strong>{t('governance.contents.1.bottom.title')}</strong>
            <p>
              <Trans
                i18nKey={'governance.contents.1.bottom.desc'}
                ns="dao"
                values={{
                  link: t('governance.contents.1.bottom.link'),
                }}
              >
                <a href="/" target="_blank" rel="noopener noreferrer" title="새창열림"></a>
              </Trans>
            </p>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default GovernanceCollapse;
