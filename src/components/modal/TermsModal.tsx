import { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { Checkbox, Form, Input } from 'antd';
import BgButton from '@/components/button/BgButton';
import { Trans, useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';
import { useSetAtom } from 'jotai';
import { termAgreementAtom } from '@/state/termAtom';
import dynamic from "next/dynamic";

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
  setDisAgreeOpen: (isPopup: boolean) => void;
  onSuccess?: () => void;
  forceRender?: boolean;
}

const TermsModal = ({ isOpen, setIsOpen, setDisAgreeOpen, onSuccess, forceRender }: Props) => {
  const { t } = useTranslation('common');
  const checkWrap = useRef<HTMLDivElement>(null);
  const offset = useAtomValue(windowResizeAtom);
  const [destroyClose, setDestroyClose] = useState<boolean>(false);
  const [termsCheck, setTermsCheck] = useState<boolean>(false);
  const [checkWrapHeight, setCheckWrapHeight] = useState<number>(0);

  const setTermAgreement = useSetAtom(termAgreementAtom);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setTermAgreement({
      birthAt: values.birthDate,
      zipCode: values.zipCode ?? undefined,
      agreement: true,
    });

    confirmForm();
  };

  const confirmForm = () => {
    if (termsCheck) {
      onSuccess?.();
      setIsOpen(false);
    } else {
      setDisAgreeOpen(true);
    }
  };

  useEffect(() => {
    isOpen && setDestroyClose(true);
    !isOpen && setTermsCheck(false);
  }, [isOpen]);

  useEffect(() => {
    if (checkWrap.current === null) return;

    setCheckWrapHeight(checkWrap.current.scrollHeight);
  }, [destroyClose, offset.width]);

  const birthValidator = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error(t('modalTerm.error')));
    }
    if (value.match(/[^0-9]/)) {
      return Promise.reject(new Error(t('modalTerm.error')));
    }

    return Promise.resolve();
  }, [t]);

  return (
    <ModalLayout
      destroyOnClose={destroyClose}
      wrapClassName="term-modal"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="md"
      title={t('askToJoin.popup.txt1')}
      style={{ '--check-wrap-height': `${checkWrapHeight}px` } as React.CSSProperties}
      footer
      forceRender={forceRender}
      footerContent={[
        <BgButton
          key="Agree"
          buttonText="OK"
          color="black"
          size="md"
          onClick={() => {
            form.submit();
          }}
        />,
      ]}
    >
      <div className={cn('check-list-wrap')}>
        <ul className={cn('check-list')}>
          <li>{t('askToJoin.popup.txt2')}</li>
          <li>{t('askToJoin.popup.txt3')}</li>
        </ul>
        <p className={cn('form-desc')}>
          <span className={cn('highlight')}>*</span> {t('askToJoin.popup.txt4')}
        </p>
        <Form name="user-info" layout="vertical" onFinish={onFinish} size="middle" form={form}>
          <Form.Item
            name={'birthDate'}
            label={t('askToJoin.popup.txt5')}
            required
            // validateStatus="error"
            rules={[
              {
                validator: birthValidator,
              },
            ]}
          >
            <Input placeholder={t('askToJoin.popup.txt6')} size="large" maxLength={6} />
          </Form.Item>
          <Form.Item name={'zipCode'} label={t('askToJoin.popup.txt7')}>
            <Input placeholder={t('askToJoin.popup.txt8')} size="large" maxLength={5} />
          </Form.Item>
        </Form>
      </div>
      <div className={cn('check-wrap')} ref={checkWrap}>
        <Checkbox checked={termsCheck} onChange={() => setTermsCheck(!termsCheck)}>
          <Trans
            i18nKey="askToJoin.popup.txt9"
            ns="common"
            components={[
              <a href="https://www.wemix.com/en/policy/terms" target="_blank" rel="noopener noreferrer"></a>,
              <a href="https://www.wemix.com/en/policy/privacy" target="_blank" rel="noopener noreferrer"></a>,
            ]}
            values={{
              a1: t('askToJoin.popup.terms'),
              a2: t('askToJoin.popup.privacy'),
            }}
          />
        </Checkbox>
      </div>
    </ModalLayout>
  );
};

export default TermsModal;
