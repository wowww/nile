import React, { useState, useCallback, useRef, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';
import { radioList2, radioList3, radioList4, radioList5, radioList6, radioList7, radioList8, radioList2Type } from './data';

import BgButton from '@/components/button/BgButton';
import AgendaTable from './AgendaTable';

export interface AgendaModalType {
  onConfirm: Function;
}
interface radioListType {
  value: number | string;
  label: string;
}

const GovernanceSetting: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();

  const radioList1: radioListType[] = [
    {
      value: 0,
      label: t('agenda.item.1'),
    },
    {
      value: 1,
      label: t('agenda.item.2'),
    },
    {
      value: 2,
      label: t('agenda.item.3'),
    },
    {
      value: 3,
      label: t('agenda.item.4'),
    },
    {
      value: 4,
      label: t('agenda.item.5'),
    },
    {
      value: 5,
      label: t('agenda.item.6'),
    },
    {
      value: 6,
      label: t('agenda.item.8'),
    },
  ];

  const [radios, setRadios] = useState({
    radioValue1: null,
    radioValue2: null,
    radioValue3: null,
    radioValue4: null,
    radioValue5: null,
    radioValue6: null,
    radioValue7: null,
    radioValue8: null,
  });
  const { radioValue1, radioValue2, radioValue3, radioValue4, radioValue5, radioValue6, radioValue7, radioValue8 } = radios;

  const [selectedValue1, setSelectedValue1] = useState<string>('');
  const [selected, setSelected] = useState<any>({
    selectedValue2: '',
    selectedValue3: '',
    selectedValue4: '',
    selectedValue5: '',
    selectedValue6: '',
    selectedValue7: '',
    selectedValue8: '',
  });
  // const { selectedValue2, selectedValue3, selectedValue4, selectedValue5, selectedValue6, selectedValue7, selectedValue8 } = selected;

  const before = ['', '0.1', '1', '1', '5', '10', '50', '70'];

  const handleChangeRadio = (e: RadioChangeEvent, i: number) => {
    setRadios((prev) => ({ ...prev, [`radioValue${i + 1}`]: e.target.value }));
    if (i === 0) setSelectedValue1(e.target.value);
    let list: radioList2Type[] = [];
    if (i >= 1) {
      switch (i) {
        case 1:
          list = radioList2;
          break;
        case 2:
          list = radioList3;
          break;
        case 3:
          list = radioList4;
          break;
        case 4:
          list = radioList5;
          break;
        case 5:
          list = radioList6;
          break;
        case 6:
          list = radioList7;
          break;
        case 7:
          list = radioList8;
      }
      const result = e.target.value === 0 ? before[i] : e.target.value === 4 ? '' : list[e.target.value].value;
      setSelected((prev: any) => ({ ...prev, [`selectedValue${i + 1}`]: result }));
    }
  };

  const amountValidator = useCallback((_: any, value: string) => {
    // Error Case1: 0초과 100미만 숫자 필요
    // if (!value || Number(value) > 100) {
    //   return Promise.reject(new Error(t('agenda.tab4.error1')));
    // }
    // // Error Case2: 1이상 30미만 숫자 필요
    // if (Number(value) < 1 || Number(value) > 30) {
    //   return Promise.reject(new Error(t('agenda.tab4.error2')));
    // }
    return Promise.resolve();
  }, []);

  const onFinish = (values: any) => {
    confirmForm();
  };

  const confirmForm = () => {};

  return (
    <div className={cn('agenda-cont-wrap')}>
      <div className={cn('agenda-modal-body')}>
        <p className={cn('agenda-desc')}>{t('agenda.tab4.desc')}</p>
        <Form name="gov-setting" layout="vertical" onFinish={onFinish} size="middle" form={form}>
          {/* 조건 변경 안건 */}
          <AgendaTable
            className={'gov-setting-table'}
            titleColumn={[{ title: t('agenda.tab4.th1'), node: [<div className={cn('set-val1')}>-</div>] }]}
            children={
              <Form.Item name={'dov-set-field1'} required>
                <div className={cn('gov-set-list1')}>
                  <Radio.Group
                    name="radio-group-onchange"
                    onChange={(e) => {
                      handleChangeRadio(e, 0);
                    }}
                    value={radioValue1}
                  >
                    {radioList1.map((v: radioListType, i: number) => {
                      return (
                        <Radio checked={false} value={v.value} key={`radiogroup1-${i}`}>
                          {v.label}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />

          {/* On-chain 안건 등록 조건 */}
          <AgendaTable
            className={'gov-setting-table'}
            titleFull={t('agenda.tab4.th2')}
            titleColumn={[
              { title: ' ', node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              { node: [`${before[1]}%`, `${selected.selectedValue2}%`] },
            ]}
            children={
              <Form.Item
                className="error-case1"
                name={'dov-set-field2'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name="radio-group-onchange"
                    onChange={(e) => {
                      handleChangeRadio(e, 1);
                    }}
                    value={radios.radioValue2}
                  >
                    {radioList2.map((v: radioList2Type, i: number) => {
                      return (
                        <Radio checked={false} value={i} key={`radiogroup2-${i}`}>
                          {i === 0 && t('agenda.tab4.label1')}
                          {i > 0 && i < 4 && t('agenda.tab4.label2', { percent: v.value })}
                          {i === 4 && (
                            <span className={cn('custom-input')}>
                              {t('agenda.tab4.label4')}
                              <span className={cn('custom-fieldset')}>
                                <span className={cn('input-outer')}>
                                  <Input
                                    size="small"
                                    disabled={radioValue2 !== 4}
                                    value={radioValue2 !== 4 ? '' : selected.selectedValue2 || ''}
                                    onChange={(e) => {
                                      setSelected((prev: any) => ({ ...prev, [`selectedValue2`]: e.target.value }));
                                    }}
                                  />
                                  %
                                </span>
                              </span>
                            </span>
                          )}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />

          {/* 투표 기간 */}
          <AgendaTable
            className={'gov-setting-table'}
            titleFull={t('agenda.tab4.th3')}
            titleColumn={[
              { title: t('agenda.tab4.th4'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              { node: [t('agenda.tab4.label3', { day: `${before[2]}` }), t('agenda.tab4.label3', { day: `${selected.selectedValue3}` })] },
            ]}
            children={
              <Form.Item
                className="error-case2"
                name={'dov-set-field3'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name="radio-group-onchange"
                    onChange={(e) => {
                      handleChangeRadio(e, 2);
                    }}
                    value={radioValue3}
                  >
                    {radioList3.map((v: radioList2Type, i: number) => {
                      return (
                        <Radio checked={false} value={i} key={`radiogroup3-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label3', { day: v.value })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label5')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input
                                      size="small"
                                      disabled={radioValue3 !== 4}
                                      value={radioValue3 !== 4 ? '' : selected.selectedValue3 || ''}
                                      onChange={(e) => {
                                        setSelected((prev: any) => ({ ...prev, [`selectedValue3`]: e.target.value }));
                                      }}
                                    />
                                    {/* 23.04.09 수정: 공백 제거 */}
                                    {t('agenda.tab4.label3', { day: '' })}
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'gov-setting-table sub-table'}
            titleColumn={[
              { title: t('agenda.tab4.th5'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              { node: [t('agenda.tab4.label3', { day: `${before[3]}` }), t('agenda.tab4.label3', { day: `${selected.selectedValue4}` })] },
            ]}
            children={
              <Form.Item
                className="error-case2"
                name={'dov-set-field4'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name="radio-group-onchange"
                    onChange={(e) => {
                      handleChangeRadio(e, 3);
                    }}
                    value={radioValue4}
                  >
                    {radioList4.map((v: radioList2Type, i: number) => {
                      return (
                        <Radio checked={false} value={i} key={`radiogroup4-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label3', { day: v.value })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label5')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input
                                      size="small"
                                      disabled={radioValue4 !== 4}
                                      value={radioValue4 !== 4 ? '' : selected.selectedValue4 || ''}
                                      onChange={(e) => {
                                        setSelected((prev: any) => ({ ...prev, [`selectedValue4`]: e.target.value }));
                                      }}
                                    />
                                    %
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />

          {/* 정족수 */}
          <AgendaTable
            className={'gov-setting-table'}
            titleFull={
              <>
                {t('agenda.tab4.th6')}
                <span className={cn('sub')}>{t('agenda.tab4.th7')}</span>
              </>
            }
            titleColumn={[
              { title: t('agenda.tab4.th4'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              { node: [`${before[4]}%`, `${selected.selectedValue5}%`] },
            ]}
            children={
              <Form.Item
                className="error-case1"
                name={'dov-set-field5'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name="radio-group-onchange"
                    onChange={(e) => {
                      handleChangeRadio(e, 4);
                    }}
                    value={radioValue5}
                  >
                    {radioList5.map((v: radioList2Type, i: number) => {
                      return (
                        <Radio checked={false} value={i} key={`radiogroup5-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label2', { percent: v.value })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label4')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input
                                      size="small"
                                      disabled={radioValue5 !== 4}
                                      value={radioValue5 !== 4 ? '' : selected.selectedValue5 || ''}
                                      onChange={(e) => {
                                        setSelected((prev: any) => ({ ...prev, [`selectedValue5`]: e.target.value }));
                                      }}
                                    />
                                    %
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'gov-setting-table sub-table'}
            titleColumn={[
              { title: t('agenda.tab4.th5'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              { node: [`${before[5]}%`, `${selected.selectedValue6}%`] },
            ]}
            children={
              <Form.Item
                className="error-case1"
                name={'dov-set-field6'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name="radio-group-onchange"
                    onChange={(e) => {
                      handleChangeRadio(e, 5);
                    }}
                    value={radioValue6}
                  >
                    {radioList6.map((v: radioList2Type, i: number) => {
                      return (
                        <Radio checked={false} value={i} key={`radiogroup6-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label2', { percent: v.value })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label4')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input
                                      size="small"
                                      placeholder={t('agenda.tab4.placeholder1')}
                                      disabled={radioValue6 !== 4}
                                      value={radioValue6 !== 4 ? '' : selected.selectedValue6 || ''}
                                      onChange={(e) => {
                                        setSelected((prev: any) => ({ ...prev, [`selectedValue6`]: e.target.value }));
                                      }}
                                    />
                                    %
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />

          {/* 가결조건 */}
          <AgendaTable
            className={'gov-setting-table'}
            titleFull={
              <>
                {t('agenda.tab4.th8')}
                <span className={cn('sub')}>{t('agenda.tab4.th9')}</span>
              </>
            }
            titleColumn={[
              { title: t('agenda.tab4.th4'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              { node: [t('agenda.tab4.label2', { percent: `${before[6]}` }), `${selected.selectedValue7}%`] },
            ]}
            children={
              <Form.Item
                className="error-case1"
                name={'dov-set-field7'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name="radio-group-onchange"
                    onChange={(e) => {
                      handleChangeRadio(e, 6);
                    }}
                    value={radioValue7}
                  >
                    {radioList7.map((v: radioList2Type, i: number) => {
                      return (
                        <Radio checked={false} value={i} key={`radiogroup7-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label2', { percent: v.value })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label4')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input
                                      size="small"
                                      placeholder={t('agenda.tab4.placeholder2')}
                                      disabled={radioValue7 !== 4}
                                      value={radioValue7 !== 4 ? '' : selected.selectedValue7 || ''}
                                      onChange={(e) => {
                                        setSelected((prev: any) => ({ ...prev, [`selectedValue7`]: e.target.value }));
                                      }}
                                    />
                                    %
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'gov-setting-table sub-table'}
            titleColumn={[
              { title: t('agenda.tab4.th5'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              { node: [t('agenda.tab4.label2', { percent: `${before[7]}` }), `${selected.selectedValue8}%`] },
            ]}
            children={
              <Form.Item
                className="error-case1"
                name={'dov-set-field8'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name="radio-group-onchange"
                    onChange={(e) => {
                      handleChangeRadio(e, 7);
                    }}
                    value={radioValue8}
                  >
                    {radioList8.map((v: radioList2Type, i: number) => {
                      return (
                        <Radio checked={false} value={i} key={`radiogroup8-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label2', { percent: v.value })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label4')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input
                                      size="small"
                                      placeholder={t('agenda.tab4.placeholder2')}
                                      disabled={radioValue8 !== 4}
                                      value={radioValue8 !== 4 ? '' : selected.selectedValue8 || ''}
                                      onChange={(e) => {
                                        setSelected((prev: any) => ({ ...prev, [`selectedValue8`]: e.target.value }));
                                      }}
                                    />
                                    %
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
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

export default GovernanceSetting;
