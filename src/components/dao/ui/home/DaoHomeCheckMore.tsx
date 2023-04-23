/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { Trans, useTranslation } from 'next-i18next';
import { Popover } from 'antd';
import dynamic from 'next/dynamic';
import { DaoWonderPriceChartData } from '@/components/chart/chartDummyData';

import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';

const DaoWonderPriceChart = dynamic(() => import('@/components/chart/DaoWonderPriceChart'), {
  ssr: false,
});

interface goalType {
  rate: number;
  number: string;
}

const DaoHomeCheckMore = () => {
  const { t } = useTranslation('daoHome');
  const { i18n } = useTranslation('ko');
  const [goal, setGoal] = useState<goalType>({
    rate: 34,
    number: '13,500,000',
  });
  const chartData = useAtomValue(DaoWonderPriceChartData);
  return (
    <div className={cn('check-section')}>
      <div className={cn('check-section-inner')}>
        <div className={cn('check-section-title')}>
          {i18n.language === 'en' ? (
            <>
              <h2>
                Learn more about
                <br />
                WONDER DAO* in advance!
              </h2>
              {/* 22.11.09 수정: 문구 추가 및 변경 */}
              <strong>Recruiting will begin soon!</strong>
              <span>*Decentralized Autonomous Organization</span>
            </>
          ) : (
            <>
              <h2>
                WONDER DAO*에 대한 정보를
                <br />
                미리 확인해보세요!
              </h2>
              {/* 22.11.09 수정: 문구 추가 및 변경 */}
              <strong>모집이 곧 시작될 예정입니다!</strong>
              <span>*Decentralized Autonomous Organization (탈중앙화된 자율조직)</span>
            </>
          )}
        </div>
        {/* <div className={cn('check-section-title')}>
          <h2>{t('check.title')}</h2>
          <span>{t('check.desc')}</span>
        </div> */}
        <div className={cn('check-swiper-box')}>
          {/* 22.11.09 수정 start: 디자인 퀄리리 업을 위한 수정 */}
          <Swiper
            // initialSlide={1}
            modules={[Pagination]}
            slidesPerView={3}
            spaceBetween={0}
            speed={300}
            threshold={10}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              769: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
            }}
            pagination={{
              clickable: true,
            }}
          >
            {/* 22.11.09 수정 end: 디자인 퀄리리 업을 위한 수정 */}
            <SwiperSlide>
              <div className={cn('check-swiper-wrap')}>
                <div className={cn('check-swiper-title')}>
                  <h3>{t('check.subtitle1')}</h3>
                  {/* 22.11.08 수정: 11일 오픈 시 제외 */}
                  {/* <OutlineButton buttonText={t('check.subbtn1')} color="highlight" size="sm" /> */}
                </div>
                {/* 11월 11일 오픈 컨텐츠 */}
                <div className={cn('check-swiper-content')}>
                  <div className={cn('check-swiper-desc')}>
                    {t('check.subdesc1')}
                    {/* 22.11.09 수정: 주석 내용 추가 */}
                    {/* 22.11.11 수정: 오타 수정 */}
                    <span>
                      {i18n.language === 'en'
                        ? '*WEMIX On-chain Network of Decentralized Ecosystem Regulator'
                        : '*WEMIX On-chain Network of Decentralized Ecosystem Regulator'}
                    </span>
                  </div>
                  <dl className={cn('check-swiper-field')}>
                    <dt>
                      <Popover
                        overlayClassName="tooltip"
                        placement="top"
                        content={
                          <div className={cn('tooltip-contents')}>
                            <Trans i18nKey={t('check.subtooltip1')} />
                          </div>
                        }
                        trigger="click"
                        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                      >
                        <button type="button">
                          <span className={cn('a11y')}>tooltip</span>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                        </button>
                      </Popover>
                      <span>
                        {i18n.language === 'en'
                          ? 'Total rewards that can be generated through WONDER DAO operations'
                          : 'WONDER DAO 운영을 통해 창출 가능한 리워드 총량'}
                      </span>
                    </dt>
                    <dd>
                      <span className={cn('num')}>26,280</span>
                      <span className={cn('unit')}>WEMIX/month</span>
                    </dd>
                  </dl>
                </div>
                {/* dao 오픈 컨텐츠 */}
                {/* <div className={cn('check-swiper-content')}>
                  <div className={cn('check-swiper-desc')}>{t('check.subdesc1')}</div>
                  <dl className={cn('check-swiper-field')}></dl>
                    <dt>
                      <span>{t('check.subfield1')}</span>
                      <Popover
                        overlayClassName="tooltip"
                        placement="top"
                        content={
                          <div className={cn('tooltip-contents')}>
                            <Trans i18nKey={t('check.subtooltip1')} />
                          </div>
                        }
                        trigger="click"
                        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                      >
                        <button type="button">
                          <span className={cn('a11y')}>tooltip</span>
                          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg' />
                        </button>
                      </Popover>
                    </dt>
                    <dd>
                      <span className={cn('num')}>315,360</span>
                      <span className={cn('unit')}>WEMIX/year</span>
                    </dd>
                  </dl>
                </div> */}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* 11월 11일 오픈 컨텐츠 */}
              <div className={cn('check-swiper-wrap')}>
                <div className={cn('check-swiper-title')}>
                  <h3>DAO Token</h3>
                  {/* 22.11.08 수정: 11일 오픈 시 제외 */}
                  {/* <OutlineButton buttonText={t('check.subbtn1')} color="highlight" size="sm" /> */}
                </div>
                <div className={cn('check-swiper-content')}>
                  {/* 22.11.10 수정 start: 문구 수정 */}
                  {/* 22.11.17 수정 start: 문구 수정 & 이미지 추가*/}
                  <div className={cn('dao-token')}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_dao_token.svg" />
                    {i18n.language === 'en' ? (
                      <div className={cn('check-swiper-desc')}>
                        The ownership of Wonder and g.Wonder tokens of the WONDER DAO establishes participation in the DAO. Once recruiting is over,{' '}
                        <strong>Wonder is distributed according to the total recruiting amount and amount participated.</strong>
                      </div>
                    ) : (
                      /* 22.11.17 수정: 국문 DAO Token  워딩 삭제 */
                      <div className={cn('check-swiper-desc')}>
                        WONDER DAO의 토큰인 Wonder와 g.Wonder를 보유하면 WONDER DAO에 참여하게 됩니다.모집 종료 후,{' '}
                        <strong>Wonder는 전체 모집 금액 대비 참여금액 비율에 따라 배분되는 비례배분방식으로 배분됩니다.</strong>
                      </div>
                    )}
                  </div>
                  {/* 22.11.17 수정 end: 문구 수정 & 이미지 추가 */}
                  {/* 22.11.10 수정 end: 문구 수정 */}
                  {/* 22.11.11 수정 start: 삭제 */}
                  {/* <dl className={cn('check-swiper-field')}>
                    <div>
                      <dt>
                        <span>{t('check.subfield2')}</span>
                      </dt>
                      <dd>
                        <span className={cn('num')}>15,000,000</span>
                        <span className={cn('unit')}>WDR</span>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <span>{i18n.language === 'en' ? 'Maximum Distribution Limit per Person' : '1인당 최대 배분 한도'}</span>
                      </dt>
                      <dd>
                        <span className={cn('num')}>3,000,000</span>
                        <span className={cn('unit')}>WDR</span>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <span>{t('check.subtitle4')}</span>
                      </dt>
                      <dd>
                        <span className={cn('num')}>1</span>
                        <span className={cn('unit')}>WDR</span>
                        <span>=</span>
                        <span className={cn('num')}>0.103</span>
                        <span className={cn('unit')}>WEMIX</span>
                      </dd>
                    </div>
                  </dl> */}
                  {/* 22.11.11 수정 end: 삭제 */}
                </div>
              </div>
              {/* dao 오픈 컨텐츠 */}
              {/* <div className={cn('check-swiper-wrap')}>
                <div className={cn('check-swiper-title')}>
                  <h3>{t('check.subtitle2')}</h3>
                </div>
                <div className={cn('check-swiper-content')}>
                  <div className={cn('check-swiper-desc')}>{t('check.subdesc2')}</div>
                  <dl className={cn('check-swiper-field')}>
                    <dt>
                      <span>{t('check.subfield2')}</span>
                    </dt>
                    <dd>
                      <span className={cn('num')}>1,500,000</span>
                      <span className={cn('unit')}>WDR</span>
                    </dd>
                  </dl>
                </div>
              </div> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* 11월 11일 오픈 컨텐츠 */}
              <div className={cn('check-swiper-wrap', 'period')}>
                <div className={cn('check-swiper-title')}>
                  <h3>{i18n.language === 'en' ? 'Recruitment Schedule' : '모집기간 안내'}</h3>
                </div>
                <div className={cn('check-swiper-content')}>
                  <div className={cn('coming-open')}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_coming_open_dao_home.svg" />
                    <div className={cn('text-wrap')}>
                      <strong>{i18n.language === 'en' ? 'Recruiting will begin soon!' : '모집이 곧 시작될 예정입니다!'}</strong>
                      <span>
                        {/* 22.11.10 수정 start: 문구 수정 */}
                        {i18n.language === 'en' ? 'The detailed schedule will be announced soon.' : '상세 일정은 이른 시일 내로 공지하겠습니다.'}
                      </span>
                      {/* 22.11.10 수정 end: 문구 수정 */}
                    </div>
                  </div>
                </div>
              </div>
              {/* 오픈직후 OPEN */}
              {/* <div className={cn('check-swiper-wrap', 'period')}>
                <div className={cn('check-swiper-title')}>
                  <h3>{t('check.subtitle3')}</h3>
                </div>
                <div className={cn('check-swiper-content')}>
                  <div className="remaining-period-wrap">
                    <div className={cn('remaining-period-dday')}>
                      <div>
                        <strong>01</strong>
                        <span>DAYS</span>
                      </div>
                      <div>
                        <strong>21</strong>
                        <span>HOURS</span>
                      </div>
                      <div>
                        <strong>32</strong>
                        <span>MINUTES</span>
                      </div>
                      <div>
                        <strong>48</strong>
                        <span>SECONDS</span>
                      </div>
                    </div>
                    <div className={cn('remaining-period-date')}>
                      <span className={cn('remaion-period-item')}>
                        <Tag size="xs" color="positive">
                          OPEN
                        </Tag>
                        2022.09.01 11:00
                      </span>
                      <span className={cn('remaion-period-item')}>
                        <Tag size="xs" color="negative">
                          CLOSE
                        </Tag>
                        2022.09.07 11:00
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* 오픈직후 COMPLETE */}
              {/* <div className={cn('check-swiper-wrap', 'price')}>
                <div className={cn('check-swiper-title')}>
                  <h3>{t('check.subtitle4')}</h3>
                </div>
                <div className={cn('check-swiper-content')}>
                  <div className={cn('check-swiper-price')}>
                    <span className={cn('num')}>1.15</span>
                    <span className={cn('unit')}>WEMIX</span>
                    <span className={cn('value')}>($142.00)</span>
                  </div>
                  <div className={cn('check-swiper-chart')}>
                    <DaoWonderPriceChart id="line-basic-chart" data={chartData} />
                  </div>
                </div>
              </div> */}
            </SwiperSlide>
          </Swiper>
          {/* dao 오픈 컨텐츠 */}
          {/* <div className={cn('check-section-btn-wrap')}>
            <BgButton buttonText={t('check.btn1')} color="highlight" size="sm" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DaoHomeCheckMore;
