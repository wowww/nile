import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import BgButton from '@/components/button/BgButton';
import cn from 'classnames';
import AgendaTable from './AgendaTable';
import { Form, Input, Radio, RadioChangeEvent, DatePicker } from 'antd';
import { useTranslation } from 'next-i18next';
import moment, { Moment } from 'moment';

export interface AgendaModalType {
  onConfirm: Function;
}

type VoteType = {
  setValue: Dispatch<SetStateAction<string>>;
  setInputValue: Dispatch<SetStateAction<string>>;
};

/* 23.04.06 수정 start: date radio menu 추가 */
const DateRadioMenu = ({ setValue, setInputValue }: VoteType) => {
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const handleChangeRadio = (e: RadioChangeEvent) => {
    setSelected(e.target.value);
    setValue(e.target.value);
    setInputValue('');
  };
  return (
    <div className={cn('radio-wrap')}>
      <Radio.Group
        name={'station-reopen'}
        onChange={(e) => {
          handleChangeRadio(e);
        }}
        value={selected}
      >
        <Radio checked={false} value={`${'5' + t('agenda.tab6.day')}`}>
          5{t('agenda.tab6.day')}
        </Radio>
        <Radio checked={false} value={`${'7' + t('agenda.tab6.day')}`}>
          7{t('agenda.tab6.day')}
        </Radio>
        <Radio checked={false} value={`${'10' + t('agenda.tab6.day')}`}>
          10{t('agenda.tab6.day')}
        </Radio>
        <Radio checked={false} value={'-'}>
          {t('agenda.tab6.label1')}
          <Input
            placeholder={t('agenda.tab6.desc1')}
            disabled={false}
            size="small"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />{' '}
          {t('agenda.tab6.day')}
        </Radio>
      </Radio.Group>
    </div>
  );
};
/* 23.04.06 수정 end: date radio menu 추가 */

const RadioMenu = ({ setValue, setInputValue }: VoteType) => {
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const handleChangeRadio = (e: RadioChangeEvent) => {
    setSelected(e.target.value);
    setValue(e.target.value);
    setInputValue('');
  };
  return (
    <div className={cn('radio-wrap')}>
      <Radio.Group
        name={'station-reopen'}
        onChange={(e) => {
          handleChangeRadio(e);
        }}
        value={selected}
      >
        <Radio checked={false} value={'1 WEMIX'}>
          1 WEMIX
        </Radio>
        <Radio checked={false} value={'10 WEMIX'}>
          10 WEMIX
        </Radio>
        <Radio checked={false} value={'100 WEMIX'}>
          100 WEMIX
        </Radio>
        <Radio checked={false} value={'-'}>
          {t('agenda.tab6.label1')}
          <Input
            placeholder={t('agenda.tab6.placeholder1')}
            disabled={false}
            size="small"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />{' '}
          WEMIX
        </Radio>
      </Radio.Group>
    </div>
  );
};

const StationReOpen: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const [minValue, setMinValue] = useState('');
  const [increaseValue, setIncreaseValue] = useState('');
  const [minInputValue, setMinInputValue] = useState('');
  const [increaseInputValue, setIncreaseInputValue] = useState('');
  const [tokenValue, setTokenValue] = useState<number>();
  /* 23.04.06 수정 start: date langth 선택 영역 형태 변경으로 인한 수정 */
  const [dateLangValue, setDateLangValue] = useState('');
  const [dateLangInputValue, setDateLangInputValue] = useState('');
  /* 23.04.06 수정 end: date langth 선택 영역 형태 변경으로 인한 수정 */
  const [form] = Form.useForm();
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });

  const { RangePicker } = DatePicker;
  const startTime = moment().add(1, 'days').format('YYYY/MM/DD');
  const endTime = moment().add(7, 'days').format('YYYY/MM/DD');
  const dateFormat = 'YYYY-MM-DD hh:mm A';
  const disabledDate = (current: Moment) => {
    return current < moment().subtract(1, 'day').endOf('day');
  };

  const amountValidator = useCallback(
    (_: any, value: string) => {
      // Error Case1 : 금액 입력 필요
      if (_.field === 'station-re-field2' && !value) {
        return Promise.reject(new Error(t('agenda.tab6.error1')));
      }
      // Error Case2 : 수량 입력 필요
      if (_.field !== 'station-re-field2' && !value) {
        return Promise.reject(new Error(t('agenda.tab6.error2')));
      }
      return Promise.resolve();
    },
    [t],
  );

  /* 23.04.06 수정 start: date langth용 Validator 코드 추가 */
  const amountValidatorDate = useCallback(
    (_: any, value: number) => {
      // Error Case : 1이상 30이하 수만 입력 가능
      if (_.field === 'station-re-field1' && value > 30) {
        return Promise.reject(new Error(t('agenda.tab6.error3')));
      }
      return Promise.resolve();
    },
    [t],
  );
  /* 23.04.06 수정 end: date langth용 Validator 코드 추가 */

  const onFinish = (values: any) => {
    confirmForm();
  };

  const confirmForm = () => {};
  return (
    <div className={cn('agenda-cont-wrap')}>
      <div className={cn('agenda-modal-body')}>
        <p className={cn('agenda-desc')}>{t('agenda.tab6.desc')}</p>
        <Form name="station-re-open" layout="vertical" onFinish={onFinish} size="middle" form={form}>
          {/* 23.04.06 수정 start: date langth 선택 영역 형태 변경으로 인한 수정 */}
          <AgendaTable
            className={'station-reopen-table3'}
            titleColumn={[{ title: t('agenda.tab6.th1'), node: [<div className={cn('token-name')}>{!dateLangValue ? '-' : dateLangValue}</div>] }]}
            children={
              <>
                <Form.Item
                  className="error-case2"
                  name={'station-re-field1'}
                  required
                  rules={[
                    {
                      validator: amountValidatorDate,
                    },
                  ]}
                >
                  <div className={cn('tokens-list')}>
                    <DateRadioMenu setValue={setDateLangValue} setInputValue={setDateLangInputValue} />
                  </div>
                </Form.Item>
                <span className={cn('station-reopen-desc')}>{t('agenda.tab6.desc3')}</span>
              </>
            }
          />
          {/* 23.04.06 수정 end: date langth 선택 영역 형태 변경으로 인한 수정 */}
          <AgendaTable
            className={'station-reopen-table2'}
            titleFull={t('agenda.tab6.th2')}
            children={
              <Form.Item
                className="error-case1"
                name={'station-re-field2'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <>
                  <div className={cn('token-field')}>
                    <Input size={'small'} placeholder={t('agenda.tab1.placeholder2')} disabled={false} />
                    WEMIX
                  </div>
                  <span className={cn('station-reopen-desc')}>{t('agenda.tab6.desc2')}</span>
                </>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'station-reopen-table2'}
            titleFull={t('agenda.tab6.th3')}
            children={
              <Form.Item
                className="error-case1"
                name={'station-re-field3'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <>
                  <div className={cn('token-field')}>
                    <Input
                      type="number"
                      size={'small'}
                      placeholder={t('agenda.tab6.placeholder1')}
                      disabled={false}
                      onChange={(e) => {
                        setTokenValue(Number(e.target.value));
                      }}
                    />
                    WDR
                  </div>
                  <span className={cn('token-value')}>
                    ($
                    {!tokenValue
                      ? Number(0).toFixed(2)
                      : Number(tokenValue)
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    )
                  </span>
                </>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'station-reopen-table3'}
            titleColumn={[{ title: t('agenda.tab6.th4'), node: [<div className={cn('token-name')}>{!minValue ? '-' : minValue}</div>] }]}
            children={
              <Form.Item
                className="error-case2"
                name={'station-re-field4'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('tokens-list')}>
                  <RadioMenu setValue={setMinValue} setInputValue={setMinInputValue} />
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'station-reopen-table3'}
            titleColumn={[
              {
                title: t('agenda.tab6.th5'),
                node: [<div className={cn('token-name')}>{!increaseValue ? '-' : increaseValue}</div>],
              },
            ]}
            children={
              <Form.Item
                className="error-case2"
                name={'station-re-field5'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('tokens-list')}>
                  <RadioMenu setValue={setIncreaseValue} setInputValue={setIncreaseInputValue} />
                </div>
              </Form.Item>
            }
          />
        </Form>
      </div>
      <div className={cn('agenda-modal-footer')}>
        {/* 23.03.27 수정: 버튼 컬러 정의 수정 반영 */}
        <BgButton
          buttonText={t('agenda.confirm')}
          color="black"
          size="lg"
          onClick={() => {
            onConfirm();
          }}
        />
      </div>
    </div>
  );
};

export default StationReOpen;
