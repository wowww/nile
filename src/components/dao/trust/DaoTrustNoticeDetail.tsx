import { ReactNode, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { DaoBox, DaoBoxLayout } from '@/components/dao/DaoBoxLayout';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import Tag from '@/components/tag/Tag';
import OutlineButton from '@/components/button/OutlineButton';

export interface NoticeContentType {
  isNew: boolean;
  title: string;
  hasAttachment: boolean;
  AttachMentList?: { AttachmentTitle: string; AttachmentLink: string }[];
  date: string;
  contents: string | ReactNode;
  prevItem?: {
    title: string;
    isNew: boolean;
    hasAttachment: boolean;
  };
  nextItem?: {
    title: string;
    isNew: boolean;
    hasAttachment: boolean;
  };
}

const DaoTrustNoticeDetail = () => {
  const { t } = useTranslation('dao');
  /* 23.03.23 수정:  권한이 있을경우 수정/삭제 버튼이 생김 권한 = true*/
  const [authority, setAuthority] = useState<boolean>(true);

  const noticeContent: NoticeContentType = {
    isNew: true,
    title: 'Trust 신규 투자에 관한 DAO Maker 공지사항',
    hasAttachment: false,
    /* 23.03.24 수정: 첨부기능 관련 일괄 삭제 검수사항 */
    // AttachMentList: [
    //   { AttachmentTitle: 'Trust 신규 투자에 관한 DAO Maker 공지사항.pdf', AttachmentLink: '/' },
    //   { AttachmentTitle: 'Trust 신규 투자에 관한 DAO Maker 공지사항.pdf', AttachmentLink: '/' },
    // ],
    date: '2023-04-01 13:30',
    contents: (
      <>
        <p>안녕하세요. DAO Maker입니다.</p>
        <br />
        <p>Trust 신규 투자에 관한 공지사항 전달드리겠습니다.</p>
        <br />
        <p>
          연결실체는 2022년 1분기 중 Wemix Network의 활성화를 위해 보유중인 Wemix Token을 중개기관을 통해 거래소에 판매(유동화)한 바 있습니다.
          연결실체는 유동화의 대가로 다른 암호화자산(비트코인, 이더리움 및 USDT)을 수령하며, 수령 시점의 공정가치로 선수수익을 계상하였습니다. 또한,
          연결실체는 투자 및 비용지급 등에 Wemix Token을 직접 활용하여, 공정가치를 선수수익으로 계상하고 있습니다. 선수수익은 Wemix Network에서
          고객에게 서비스를 제공하고 회수한 Wemix Token에 비례하여 플랫폼 수수료 수익으로 인식됩니다.
        </p>
        <br />
        <p>당분기 중 Wemix Token의 유동화 및 지급에 따른 선수수익의 누적 변동 내역은 첨부파일에서 자세히 확인하실 수 있습니다.</p>
        <br />
        <p>NFT Is Life Evolution.</p>
        <p>
          나일강 유역에서 새로운 문명의 발상이 이뤄진 것처럼 ‘NILE’은 Web3.0을 기반으로 삶의 진화를 넘어 새로운 문명의 시작을 선물하는 플랫폼이 되고자
          합니다.
        </p>
        <br />
        <p>&lt;위메이드의 축적된 기술과 경험&gt;</p>
        <p>
          나일강의 범람을 관리하며 축적된 이집트의 과학과 기술처럼, 위메이드의 블록체인 기술과 역량은 그 어느 때보다 앞서 나가고 있습니다. 세계에서
          가장 성공한 P&E 게임 MIR4의 성공을 통해 축적된 기술과 노하우는 WEMIX3,0 메가에코시스템으로 구현되었습니다. NILE은 WEMIX3.0을 기반으로 DAO,
          NFT에서 DApp에 이르는 다양한 프로젝트를 기술적으로 지원할 것입니다.
        </p>
      </>
    ),
    prevItem: {
      title: '2023년 4분기 공시 정보',
      isNew: true,
      hasAttachment: false,
    },
    nextItem: {
      title: 'BINANCE 상장 결과 보고서',
      isNew: false,
      hasAttachment: false,
    },
  };
  return (
    <DaoBoxLayout>
      <DaoBox>
        <div className={cn('notice-post-wrap')}>
          <div className={cn('notice-top')}>
            {noticeContent.isNew && (
              <Tag size="md" color="dark-gray">
                NEW
              </Tag>
            )}
            <div className={cn('notice-title-wrap')}>
              <h3 className={cn('title')}>{noticeContent.title}</h3>
              {noticeContent.hasAttachment && (
                <ReactSVG className={cn('attachment')} src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_attachment.svg" />
              )}
            </div>
            <div className={cn('sub-title-wrap')}>
              <p className={cn('date')}>{noticeContent.date}</p>
              {authority && (
                <div className={cn('btn-wrap')}>
                  {/* 23.04.06 수정: 텍스트 다국어 처리 */}
                  <OutlineButton buttonText={t('governance.proposal.btn.5')} color="gray" size="sm" />
                  <OutlineButton buttonText={t('governance.proposal.btn.6')} color="gray" size="sm" />
                </div>
              )}
            </div>
          </div>
          <div className={cn('notice-post')}>
            {noticeContent.contents}
            {noticeContent.hasAttachment && (
              <ul className={cn('download-list')}>
                {noticeContent.AttachMentList?.map((item, index) => (
                  <li key={`attachment-item${index}}`}>
                    <a href={item.AttachmentLink} download className={cn('download-link')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_download.svg" />
                      {item.AttachmentTitle}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className={cn('notice-nav')}>
            {noticeContent.prevItem && (
              <li className={cn('prev-item')}>
                <Link href={'/'}>
                  <a className={cn('nav-link')}>
                    <span className={cn('nav-state')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                      <span className={cn('nav-text')}>{t('previous')}</span>
                    </span>
                    <div className={cn('nav-title')}>
                      {/* 23.03.02 수정 start: new tag 위치 수정 (디자인 변경) */}
                      {/* 23.03.02 수정 end: new tag 위치 수정 (디자인 변경) */}
                      <strong className={cn('another-info-title')}>{noticeContent.prevItem.title}</strong>
                      {noticeContent.prevItem.hasAttachment && (
                        <ReactSVG
                          className={cn('attachment')}
                          src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_attachment.svg"
                        />
                      )}
                      {noticeContent.prevItem.isNew && (
                        <Tag size="s" color="dark-gray">
                          NEW
                        </Tag>
                      )}
                    </div>
                  </a>
                </Link>
              </li>
            )}
            {noticeContent.nextItem && (
              <li className={cn('next-item')}>
                <Link href={'/'}>
                  <a className={cn('nav-link')}>
                    <span className={cn('nav-state')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                      <span className={cn('nav-text')}>{t('next')}</span>
                    </span>
                    <div className={cn('nav-title')}>
                      {/* 23.03.02 수정 start: new tag 위치 수정 (디자인 변경) */}
                      {noticeContent.nextItem.isNew && (
                        <Tag size="s" color="dark-gray">
                          NEW
                        </Tag>
                      )}
                      {/* 23.03.02 수정 end: new tag 위치 수정 (디자인 변경) */}
                      <strong className={cn('another-info-title')}>{noticeContent.nextItem.title}</strong>
                      {noticeContent.nextItem.hasAttachment && (
                        <ReactSVG
                          className={cn('attachment')}
                          src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_attachment.svg"
                        />
                      )}
                    </div>
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </DaoBox>
    </DaoBoxLayout>
  );
};

export default DaoTrustNoticeDetail;
