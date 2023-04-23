import { Form, Input, message } from 'antd';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import cn from 'classnames';
import BgButton from '../button/BgButton';
import OutlineButton from '../button/OutlineButton';
import AgendaTable from '../dao/ui/governance/agendaRegister/AgendaTable';
import ModalLayout from './ModalLayout';
import { ContractDataType } from '../dao/ui/trust/DaoTrustTab';

type ModalOpenType = {
  contractSend: boolean;
  setContractSend: (isModal: boolean) => void;
  data: ContractDataType;
};

const ContractSendModal = ({ contractSend, setContractSend, data }: ModalOpenType) => {
  const { t } = useTranslation(['dao']);

  const onFinish = (values: any) => {
    confirmForm();
  };

  const confirmForm = () => {};
  const [form] = Form.useForm();
  const amountValidator = useCallback(
    (_: any, value: string) => {
      // Error Case1 : 금액 입력 필요
      if (_.field === 'station-re-field2' && !value) {
        return Promise.reject(new Error(t('agenda.tab6.error1')));
      }
      // Error Case2 : 수량 입력 필요
      if (_.field !== 'station-re-field2' && !value) {
        return Promise.reject(new Error(t('trust.error')));
      }
      return Promise.resolve();
    },
    [t],
  );
  return (
    <ModalLayout
      isOpen={contractSend}
      setIsOpen={setContractSend}
      size="lg"
      title={t('trust.wemixSend')}
      footer={true}
      destroyOnClose={true}
      wrapClassName="wemix-allow-popup"
      footerContent={[
        <BgButton
          buttonText={t('trust.send')}
          color="black"
          size="lg"
          key="Next"
          onClick={() => {
            message.info({ content: t('trust.sendComplete'), key: 'toast' });
            setContractSend(false);
          }}
        />,
      ]}
    >
      <div className={cn('wemix-allow-table-wrap')}>
        <AgendaTable
          className={'wemix-allow-table1'}
          titleColumn={[
            { title: t('trust.funding'), node: [`${data.funding}`], rowspan: false },
            { title: t('trust.useToken'), node: [`WEMIX (${data.token} ${t('trust.ownToken')})`] },
          ]}
        />
        <AgendaTable
          className={'wemix-allow-table2'}
          titleFull={t('trust.usingValue')}
          children={
            <>
              <Form name="wemix-allow-field" layout="vertical" onFinish={onFinish} size="middle" form={form}>
                <Form.Item
                  name={'wemix-allow-field'}
                  required
                  rules={[
                    {
                      validator: amountValidator,
                    },
                  ]}
                >
                  <div className={cn('wemix-allow-field')}>
                    <div className={cn('input-wrap')}>
                      <Input placeholder={'0'} disabled={false} />
                      <span className={cn('unit-wrap')}>WEMIX</span>
                    </div>
                    <OutlineButton buttonText={t('trust.max')} color="black" size="sm" key="max" />
                  </div>
                </Form.Item>
              </Form>
            </>
          }
        />
      </div>
    </ModalLayout>
  );
};

export default ContractSendModal;
