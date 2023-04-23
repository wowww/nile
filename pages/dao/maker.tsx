import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Form, Input, DatePicker, Radio, RadioChangeEvent, Select, Checkbox } from 'antd';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import moment, { Moment } from 'moment';

import ContentTitle from '@/components/marketplace/ContentTitle';
import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';
import ProposalDualSlider from '@/components/dao/governance/ProposalAction/ProposalDualSlider';
import { MakerSignature } from '@/components/dao/maker/MakerSignature';
import { ContractSignatureResult } from '@/components/dao/maker/ContractSignatureResult';

import { TableItemType as TargetTableItemType } from '@/components/dao/maker/SignatureTargetTable';
import { TableItemType as FullTableItemType } from '@/components/dao/maker/SignatureTable';
import ModalLayout from '@/components/modal/ModalLayout';

const TargetTableDummy: TargetTableItemType[] = [
  {
    user: {
      profileImg: 'https://picsum.photos/32/32/?image=1',
      walletAddress: '0xbD1252b4df2847bC0cD2a1b9d89694BbF4b96a6E',
    },
  },
  {
    user: {
      profileImg: 'https://picsum.photos/32/32/?image=1',
      walletAddress: '0xbD1252b4df2847bC0cD2a1b9d89694BbF4b96a6E',
    },
  },
  {
    user: {
      profileImg: 'https://picsum.photos/32/32/?image=1',
      walletAddress: '0xbD1252b4df2847bC0cD2a1b9d89694BbF4b96a6E',
    },
  },
];

const FullTableDummy: FullTableItemType[] = [
  {
    user: {
      isWriter: true,
      profileImg: 'https://picsum.photos/32/32/?image=1',
      walletAddress: '0xbD1252b4df2847bC0cD2a1b9d89694BbF4b96a6E',
    },
    isSigned: true,
    signDate: '2023-02-06 07:22:12',
  },
  {
    user: {
      profileImg: 'https://picsum.photos/32/32/?image=1',
      walletAddress: '0xbD1252b4df2847bC0cD2a1b9d89694BbF4b96a6E',
    },
  },
  {
    user: {
      profileImg: 'https://picsum.photos/32/32/?image=1',
      walletAddress: '0xbD1252b4df2847bC0cD2a1b9d89694BbF4b96a6E',
    },
  },
];

const DaoMaker = () => {
  const activeDao = useAtomValue(daoThemeAtom);
  // 정보 수정 컨트롤 용 (전체 disabled)
  const [isEditable, setEditable] = useState(true);
  // 모집 통화 단위 세팅용
  const [unit, setUnit] = useState('WEMIX');
  const [radios, setRadios] = useState({
    radioValueOnchange1: 1,
    radioValueOnchange2: 1,
    radioValuePeriod1: 1,
    radioValuePeriod2: 1,
    radioValueQuorum1: 1,
    radioValueQuorum2: 1,
    radioValueApproval1: 1,
    radioValueApproval2: 1,
    radioValueTrust1: 1,
    radioValueTrust2: 1,
  });
  const {
    radioValueOnchange1,
    radioValueOnchange2,
    radioValuePeriod1,
    radioValuePeriod2,
    radioValueQuorum1,
    radioValueQuorum2,
    radioValueApproval1,
    radioValueApproval2,
    radioValueTrust1,
    radioValueTrust2,
  } = radios;
  const [isSignProgress, setIsSignProgress] = useState(false);

  const directInputRef = useRef<null[] | HTMLSpanElement[]>([]);
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const startTime = moment().add(1, 'days').format('YYYY/MM/DD');
  const endTime = moment().add(7, 'days').format('YYYY/MM/DD');
  const dateFormat = 'YYYY-MM-DD hh:mm A';

  const disabledDate = (current: Moment) => {
    return current < moment().subtract(1, 'day').endOf('day');
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const handleChangeRadio = (e: RadioChangeEvent, i: number) => {
    const input = directInputRef.current[i]?.querySelector('input');
    if (e.target.value === 4) {
      input?.classList.add('active');
      input?.focus();
    } else {
      input?.classList.remove('active');
    }
  };

  return (
    <>
      <Helmet>
        <title>Maker &gt; DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`)} />
      </Helmet>
      <div className={cn('dao-maker-wrap')}>
        <ContentTitle
          title="DAO 만들기"
          desc={
            isEditable ? (
              '*정보 수정은 모집 시작 1시간 전까지 가능합니다.'
            ) : (
              <>*모집 시작 전 1시간, 모집 중, 모집완료 후에는 정보 수정이 불가합니다.</>
            )
          }
        />
        <div className={cn('dao-maker-container')}>
          <div className={cn('form-section')}>
            <Form name="dao-maker" layout="vertical" onFinish={onFinish} size="middle" initialValues={{ 'unit-select': unit }} disabled={!isEditable}>
              <h3 className={cn('form-title')}>기본 정보 입력</h3>
              <div className={cn('maker-form-wrap')}>
                {/* 23.03.17 수정 start: placeholder 삭제 */}
                <Form.Item name={'name-input'} label="DAO 이름 (영문)" className={cn('full-type')}>
                  <Input />
                </Form.Item>
                <Form.Item name={'token-input'} label="DAO Token 명칭 (영문)">
                  <Input />
                </Form.Item>
                <Form.Item name={'governance-input'} label="Governance Token 명칭 (영문) ">
                  <Input />
                </Form.Item>
                <Form.Item name={'token-ticker-input'} label="DAO Token Ticker (영문)">
                  <Input />
                </Form.Item>
                <Form.Item name={'governance-ticker-input'} label="Governance Token Ticker (영문)">
                  <Input />
                </Form.Item>
                <Form.Item name={'token-number-input'} label="DAO Token 발행량 (숫자)">
                  <Input type="number" />
                </Form.Item>
                {/* 23.03.17 수정 end: placeholder 삭제 */}
              </div>
              <h3 className={cn('form-title')}>모집 정보 입력</h3>
              <div className={cn('maker-form-wrap')}>
                <Form.Item label="모집기간" className={cn('full-type')}>
                  <RangePicker
                    className="date-picker"
                    showTime={{ format: 'HH:mm A' }}
                    format={dateFormat}
                    separator="~"
                    defaultValue={[moment(`${startTime}, 11:00`, dateFormat), moment(`${endTime}, 11:00`, dateFormat)]}
                    monthCellRender={(date) => date.format('MMM')}
                    allowClear={false}
                    disabledDate={disabledDate}
                  />
                  {/* 23.03.17 수정: 캡션 추가 */}
                  <p className={cn('input-info-desc')}>*브라우저에 설정된 표준 시간대 기준입니다.</p>
                </Form.Item>
                <Form.Item name={'unit-select'} label="모집 통화 단위" className={cn('full-type select-type')}>
                  <Select
                    size="middle"
                    suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
                    popupClassName="select-size-md-dropdown"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <Option value="WEMIX">WEMIX</Option>
                    <Option value="WEMIX$">WEMIX$</Option>
                  </Select>
                </Form.Item>
                <Form.Item name={'target-amount-input'} label="최소 모집 목표 금액 (정수 입력)">
                  <Input type="number" suffix={unit} placeholder="금액을 입력해 주세요." />
                </Form.Item>
                <Form.Item
                  name={'total-amount-input'}
                  label="총 모집 목표 금액 (정수 입력, 최소 모집 목표 금액 이상 입력)"
                  className={cn('unit-form-wrap')}
                >
                  <Input type="number" suffix={unit} placeholder="금액을 입력해 주세요." />
                </Form.Item>
                <Form.Item name={'minimum-amount-input'} label="최소 참여 금액 (정수 입력)">
                  <Input type="number" suffix={unit} placeholder="금액을 입력해 주세요." />
                </Form.Item>
                <Form.Item label="최대 참여 금액 (정수 입력)" className={cn('has-checkbox')}>
                  <Checkbox name="maximum-amount-checkbox">제한 없음</Checkbox>
                  <Input type="number" name={'maximum-amount-input'} suffix={unit} placeholder="금액을 입력해 주세요." />
                </Form.Item>
                <Form.Item name={'incremental-unit-input'} label="증액단위 (정수 입력)">
                  <Input type="number" suffix={unit} placeholder="금액을 입력해 주세요." />
                </Form.Item>
              </div>
              <h3 className={cn('form-title')}>Trust 기본 정보 입력</h3>
              <div className={cn('maker-form-wrap')}>
                {/* 23.03.28 수정: 글 카운터 마크업 수정 */}
                <Form.Item name={'trust-textarea'} label="Trust 참여자 정보" className={cn('full-type')}>
                  <Input.TextArea
                    showCount={{
                      formatter: ({ count, maxLength }) => `${count}/${maxLength} byte`,
                    }}
                    maxLength={200}
                    placeholder={'소개글을 입력해 주세요.'}
                    className={cn(!isEditable && 'disabled')}
                  />
                </Form.Item>
                <Form.Item name={'wallet-select'} label="Trust 지갑 목록">
                  <Select
                    size="middle"
                    suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
                    popupClassName="select-size-md-dropdown"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    placeholder="지갑을 선택해주세요."
                  >
                    <Option value="trustWallet1">trustWallet1</Option>
                    <Option value="trustWallet2">trustWallet2</Option>
                  </Select>
                </Form.Item>
                <Form.Item name={'trust-input'} label="Trust 지갑 주소">
                  <Input readOnly />
                </Form.Item>
              </div>
              <h3 className={cn('form-title')}>Treasury에서 초기 사업 자금 사용 설정</h3>
              <div className={cn('maker-form-wrap')}>
                <Form.Item name={'treasury-input'} label="초기 사업 자금 사용 금액">
                  <Input type="number" suffix={unit} placeholder="금액을 입력해 주세요." />
                </Form.Item>
              </div>
              <h3 className={cn('form-title')}>Trust로 유입된 리워드 배분 설정</h3>
              <div className={cn('maker-form-wrap')}>
                <Form.Item name={'reward-distribution-ratio'} label="수수료를 제외한 리워드 잔액 배분 비율">
                  <ProposalDualSlider
                    category={['Treasury 준비금', 'Incinerator 자금']}
                    initValue={[40, 60]}
                    desc="[기본 설정]"
                    disabled={!isEditable}
                  />
                </Form.Item>
              </div>
              <h3 className={cn('form-title')}>Incinerator에서 매입한 DAO Token 배분 설정</h3>
              <div className={cn('maker-form-wrap')}>
                <Form.Item name={'distribution-ratio'} label="배분 비율">
                  <ProposalDualSlider
                    category={['DAO Token 소각', 'Obelisk 거버넌스 보상']}
                    initValue={[50, 50]}
                    desc="[기본 설정]"
                    disabled={!isEditable}
                  />
                </Form.Item>
              </div>
              {/* 23.03.17 수정 start: governance 조건 입력 추가 */}
              <h2 className={cn('form-heading-title')}>Governance 조건 입력</h2>
              <h3 className={cn('form-title')}>온체인 안건 등록 조건</h3>
              <div className={cn('maker-form-wrap type-governance')}>
                <Form.Item name={'governance-radio-onchange1'} label="Consensus Check">
                  <Radio.Group
                    name="radio-group-onchange1"
                    onChange={(e) => {
                      handleChangeRadio(e, 0);
                    }}
                    value={radioValueOnchange1}
                  >
                    <Radio checked={false} value={1}>
                      0.01%
                    </Radio>
                    <Radio checked={false} value={2}>
                      0.1%
                    </Radio>
                    <Radio checked={false} value={3}>
                      1%
                    </Radio>
                    <Radio checked={false} value={4}>
                      <span className={cn('direct-input')} ref={(el) => (directInputRef.current[0] = el)}>
                        직접입력 (소수점 4자리까지)
                        <Input type="number" />%
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name={'governance-radio-onchange2'} label="Governance Check">
                  <Radio.Group
                    name="radio-group-onchange2"
                    onChange={(e) => {
                      handleChangeRadio(e, 1);
                    }}
                    value={radioValueOnchange2}
                  >
                    <Radio checked={false} value={1}>
                      0.01%
                    </Radio>
                    <Radio checked={false} value={2}>
                      0.1%
                    </Radio>
                    <Radio checked={false} value={3}>
                      1%
                    </Radio>
                    <Radio checked={false} value={4}>
                      <span className={cn('direct-input')} ref={(el) => (directInputRef.current[1] = el)}>
                        직접입력 (소수점 4자리까지)
                        <Input type="number" />%
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <h3 className={cn('form-title')}>투표기간</h3>
              <div className={cn('maker-form-wrap type-governance')}>
                <Form.Item name={'governance-radio-period1'} label="Consensus Check">
                  <Radio.Group
                    name="radio-group-period1"
                    onChange={(e) => {
                      handleChangeRadio(e, 2);
                    }}
                    value={radioValuePeriod1}
                  >
                    <Radio checked={false} value={1}>
                      1일
                    </Radio>
                    <Radio checked={false} value={2}>
                      3일
                    </Radio>
                    <Radio checked={false} value={3}>
                      5일
                    </Radio>
                    <Radio checked={false} value={4}>
                      <span className={cn('direct-input')} ref={(el) => (directInputRef.current[2] = el)}>
                        직접입력
                        <Input type="number" placeholder="최소값: 1 / 최대값: 30" />일
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name={'governance-radio-period2'} label="Governance Check">
                  <Radio.Group
                    name="radio-group-period2"
                    onChange={(e) => {
                      handleChangeRadio(e, 3);
                    }}
                    value={radioValuePeriod2}
                  >
                    <Radio checked={false} value={1}>
                      1일
                    </Radio>
                    <Radio checked={false} value={2}>
                      3일
                    </Radio>
                    <Radio checked={false} value={3}>
                      5일
                    </Radio>
                    <Radio checked={false} value={4}>
                      <span className={cn('direct-input')} ref={(el) => (directInputRef.current[3] = el)}>
                        직접입력
                        <Input type="number" placeholder="최소값: 1 / 최대값: 30" />일
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <h3 className={cn('form-title')}>정족수 (이상)</h3>
              <div className={cn('maker-form-wrap type-governance')}>
                <Form.Item name={'governance-radio-quorum1'} label="Consensus Check">
                  <Radio.Group
                    name="radio-group-quorum1"
                    onChange={(e) => {
                      handleChangeRadio(e, 4);
                    }}
                    value={radioValueQuorum1}
                  >
                    <Radio checked={false} value={1}>
                      5%
                    </Radio>
                    <Radio checked={false} value={2}>
                      10%
                    </Radio>
                    <Radio checked={false} value={3}>
                      15%
                    </Radio>
                    <Radio checked={false} value={4}>
                      <span className={cn('direct-input')} ref={(el) => (directInputRef.current[4] = el)}>
                        직접입력 (소수점 4자리까지)
                        <Input type="number" />%
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name={'governance-radio-quorum2'} label="Governance Check">
                  <Radio.Group
                    name="radio-group-quorum2"
                    onChange={(e) => {
                      handleChangeRadio(e, 5);
                    }}
                    value={radioValueQuorum2}
                  >
                    <Radio checked={false} value={1}>
                      5%
                    </Radio>
                    <Radio checked={false} value={2}>
                      10%
                    </Radio>
                    <Radio checked={false} value={3}>
                      15%
                    </Radio>
                    <Radio checked={false} value={4}>
                      <span className={cn('direct-input')} ref={(el) => (directInputRef.current[5] = el)}>
                        직접입력 (소수점 4자리까지)
                        <Input type="number" />%
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <h3 className={cn('form-title')}>가결조건 (초과)</h3>
              <div className={cn('maker-form-wrap type-governance')}>
                <Form.Item name={'governance-radio-approval1'} label="Consensus Check">
                  <Radio.Group
                    name="radio-group-approval1"
                    onChange={(e) => {
                      handleChangeRadio(e, 6);
                    }}
                    value={radioValueApproval1}
                  >
                    <Radio checked={false} value={1}>
                      50%
                    </Radio>
                    <Radio checked={false} value={2}>
                      60%
                    </Radio>
                    <Radio checked={false} value={3}>
                      70%
                    </Radio>
                    <Radio checked={false} value={4}>
                      <span className={cn('direct-input')} ref={(el) => (directInputRef.current[6] = el)}>
                        직접입력 (소수점 4자리까지)
                        <Input type="number" />%
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name={'governance-radio-approval2'} label="Governance Check">
                  <Radio.Group
                    name="radio-group-approval2"
                    onChange={(e) => {
                      handleChangeRadio(e, 7);
                    }}
                    value={radioValueApproval2}
                  >
                    <Radio checked={false} value={1}>
                      50%
                    </Radio>
                    <Radio checked={false} value={2}>
                      60%
                    </Radio>
                    <Radio checked={false} value={3}>
                      70%
                    </Radio>
                    <Radio checked={false} value={4}>
                      <span className={cn('direct-input')} ref={(el) => (directInputRef.current[7] = el)}>
                        직접입력 (소수점 4자리까지)
                        <Input type="number" />%
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <h3 className={cn('form-title')}>Trust Check</h3>
              <div className={cn('maker-form-wrap type-governance')}>
                <Form.Item name={'governance-radio-trust1'} label="투표 기간">
                  <Radio.Group
                    name="radio-group-trust1"
                    onChange={(e) => {
                      handleChangeRadio(e, 8);
                    }}
                    value={radioValueTrust1}
                  >
                    <Radio checked={false} value={1}>
                      1일
                    </Radio>
                    <Radio checked={false} value={2}>
                      3일
                    </Radio>
                    <Radio checked={false} value={3}>
                      5일
                    </Radio>
                    <Radio checked={false} value={4}>
                      <span className={cn('direct-input')} ref={(el) => (directInputRef.current[8] = el)}>
                        직접입력
                        <Input type="number" placeholder="최소값: 50" />일
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name={'governance-radio-trust2'} label="가결 조건">
                  <Radio.Group
                    name="radio-group-trust2"
                    onChange={(e) => {
                      handleChangeRadio(e, 9);
                    }}
                    value={radioValueTrust2}
                  >
                    <Radio checked={false} value={1}>
                      50%
                    </Radio>
                    <Radio checked={false} value={2}>
                      60%
                    </Radio>
                    <Radio checked={false} value={3}>
                      70%
                    </Radio>
                    <Radio checked={false} value={4}>
                      <span className={cn('direct-input')} ref={(el) => (directInputRef.current[9] = el)}>
                        직접입력 (소수점 4자리까지)
                        <Input type="number" placeholder="최소값: 50" />%
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              {/* 23.03.17 수정 end: governance 조건 입력 추가 */}
            </Form>
            {/* 
              하기 내용은 maker signature case 정리해둔 부분입니다.
              해당 내용 중 <MakerSignature /> <ContractSignatureResult /> 2개의 컴포넌트를 제외한 <p> 태그는 케이스를 나타내기 위한 태그이니 삭제되어야 합니다.
              MakerSignature
                isWriter: 작성자 여부
                step: 현재 서명 진행 단계 (1 ~ 7) 기획서 참조
                tableData: 서명자 관련 테이블, 단계에 따라 들어가는 데이터가 달라집니다. (1 cols / 3 cols 테이블)
                status: ongoing(진행중) / complete(완료 | 달성) / fail(달성 실패)의 상태값을 나타냅니다.
              ContractSignatureResult
                data: 테이블에 들어갈 데이터 (3 cols 테이블)
                deadlineDate: 마감기한
            */}
            <p style={{ fontSize: 40, marginTop: 40, color: 'red' }}>작성자 case</p>
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>1. 설정 내용 작성</p>
            <MakerSignature isWriter step={1} tableData={FullTableDummy} status="ongoing" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>1-완료. 설정 내용 작성 완료</p>
            <MakerSignature isWriter step={1} tableData={FullTableDummy} status="complete" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>2. 모집 컨트랙트 실행을 위해 서명 대상자에 서명 요청</p>
            <MakerSignature isWriter step={2} tableData={FullTableDummy} status="ongoing" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>2-완료. 모집 컨트랙트 실행을 위한 서명 대상자 서명 완료</p>
            <MakerSignature isWriter step={2} tableData={FullTableDummy} status="complete" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>3. 정족수 충족시 모집 컨트랙트 자동 실행 (모집 예정)</p>
            <MakerSignature isWriter step={3} tableData={FullTableDummy} />
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>4. 모집 시작</p>
            <MakerSignature isWriter step={4} tableData={FullTableDummy} />
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>5-달성. 모집 종료 (목표 달성)</p>
            <MakerSignature isWriter step={5} tableData={FullTableDummy} status="complete" />
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>5-실패. 모집 종료 (달성 실패)</p>
            <MakerSignature isWriter step={5} tableData={FullTableDummy} status="fail" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>6-달성. 활성화 컨트랙트를 위한 서명 요청</p>
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <MakerSignature isWriter step={6} tableData={FullTableDummy} status="ongoing" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>6-실패. 환불 절차를 위한 서명 요청</p>
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <MakerSignature isWriter step={6} tableData={FullTableDummy} status="fail" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>6-1-성공/실패 공통. 절차를 위한 서명 완료</p>
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <MakerSignature isWriter step={6} tableData={FullTableDummy} status="complete" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>7-성공. 컨트랙트 실행 완료</p>
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <MakerSignature isWriter step={7} tableData={FullTableDummy} />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>7-실패. 컨트랙트 실행 완료</p>
            <MakerSignature isWriter step={7} tableData={FullTableDummy} status="fail" />

            <p style={{ fontSize: 40, marginTop: 40, color: 'red' }}>서명 대상자 case</p>
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>2. 모집 컨트랙트 실행을 위해 서명 대상자에 서명 요청</p>
            <MakerSignature step={2} tableData={FullTableDummy} status="ongoing" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>2-완료. 모집 컨트랙트 실행을 위한 서명 대상자 서명 완료</p>
            <MakerSignature step={2} tableData={FullTableDummy} status="complete" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>3. 정족수 충족시 모집 컨트랙트 자동 실행 (모집 예정)</p>
            <MakerSignature step={3} tableData={FullTableDummy} />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>4. 모집 시작</p>
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <MakerSignature step={4} tableData={FullTableDummy} />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>6-달성. 활성화 컨트랙트를 위한 서명 요청</p>
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27  09:00'} />
            <MakerSignature step={5} tableData={FullTableDummy} status="complete" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>6-실패. 환불 절차를 위한 서명 요청</p>
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <MakerSignature step={5} tableData={FullTableDummy} status="fail" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>6-1-성공/실패 공통. 절차를 위한 서명 완료</p>
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <MakerSignature step={6} tableData={FullTableDummy} status="complete" />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>7-성공. 컨트랙트 실행 완료</p>
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <MakerSignature step={7} tableData={FullTableDummy} />
            <p style={{ fontSize: 24, marginTop: 40, color: 'red' }}>7-실패. 컨트랙트 실행 완료</p>
            <ContractSignatureResult data={FullTableDummy} deadlineDate={'2023-02-27 09:00'} />
            <MakerSignature step={7} tableData={FullTableDummy} status="fail" />

            {/* 가스비 결제 진행 팝업 */}
            <ModalLayout
              isOpen={isSignProgress}
              setIsOpen={setIsSignProgress}
              size="sm"
              title="서명 진행"
              footer={true}
              destroyOnClose={true}
              footerContent={[
                <OutlineButton
                  buttonText="아니오"
                  color="black"
                  size="md"
                  onClick={() => {
                    setIsSignProgress(false);
                  }}
                  key="cancel"
                />,
                <BgButton
                  buttonText="예"
                  color="black"
                  size="md"
                  key="Save"
                  onClick={() => {
                    setIsSignProgress(false);
                  }}
                />,
              ]}
            >
              <p>서명을 진행하시겠습니까? 서명 진행 시 가스비 결제가 필요하며, 서명 완료 후에는 취소가 불가합니다.</p>
            </ModalLayout>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
export default DaoMaker;
