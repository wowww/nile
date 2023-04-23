import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Form, Input, message, Select } from 'antd';

// components
import UploadDragger from '@/components/input/UploadDragger';
import BgButton from '@/components/button/BgButton';

// images
// 22.11.02 수정: useTranslation 추가
import { Trans, useTranslation } from 'next-i18next';
import axios from 'axios';
import { ReactSVG } from 'react-svg';
import { useAtom } from 'jotai';
import { termAgreementAtom, termModalAtom } from '@/state/termAtom';
import { useSetAtom } from 'jotai';
import dynamic from "next/dynamic";

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}

interface InputFormProps {
  value: string;
  isRequired?: boolean;
  type: string;
}

const { Option } = Select;

const LifeAskToJoinModal = ({ isModal, setIsModal }: Props) => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation('common');
  const [form] = Form.useForm();
  const [pending, setPending] = useState(false);
  const [termAgreement, setTermAgreement] = useAtom(termAgreementAtom);
  const setTermModal = useSetAtom(termModalAtom)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const onFinish = useCallback((values: any) => {
    setPending(true);
    axios.post(`${process.env.NEXT_PUBLIC_ENV_NILE_API}/story/collaboration`, {
      email: values.email,
      name: values.name,
      description: values.description,
      category: values.category,
      url: values.url,
      attachment: values.file,
    })
      .then(({ data }) => {
        message.info({
          content: t('toastMessage.RequestComplete', { ns: 'common' }),
          key: 'toast',
        }).then(() => {
          // nothing
        });
        setPending(false);
        form.resetFields();
        setIsModal(false);
      })
      .catch((e) => {
        setPending(false);
        console.log(e);
      });
  }, [form, t]);

  // 22.11.09 수정 start: 카테고리명 데이터 처리 수정
  /* 22.11.10 수정 start: 카테고리 리스트 수정 */
  /* 22.11.11 수정: Etc 온점 추가 */
  const projectList = [
    'collectibles',
    'pixel Art',
    'pFP',
    'move to Earn',
    'play to Earn',
    'utility',
    'talk to Earn',
    'relax to Earn',
    'sports',
    'music',
    'culture',
    'etc.',
  ];
  /* 22.11.10 수정 end: 카테고리 리스트 수정 */

  const convertText = (str: string) => {
    let newStr: string = str.charAt(0).toUpperCase() + str.slice(1);
    return newStr;
  };
  // 22.11.09 수정 end: 카테고리명 데이터 처리 수정

  useEffect(() => {
    if (isModal) {
      if (!termAgreement.agreement) {
        setTermModal(true);
      }
    }
  }, [isModal]);

  const onFormChange = (target: any, formValues: any) => {
    if (formValues.name && formValues.email && formValues.nft_category && formValues.description) {
      if (form.getFieldsError().filter((item) => item.errors.length > 0)?.length === 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    } else {
      setButtonDisabled(true);
    }
  }

  return (
    <ModalLayout
      wrapClassName="ask-popup-wrapper"
      isOpen={isModal}
      setIsOpen={setIsModal}
      size="md"
      // title="Ask to join"
      title={t('modalJoin.title')}
      footer
      destroyOnClose={true}
      footerContent={[
        <BgButton
          buttonText={t('modalJoin.form.button')}
          color="black"
          size="md"
          disabled={pending || buttonDisabled}
          onClick={() => {
            form.submit();
          }}
          key="send"
        />,
      ]}
    >
      <div className={cn('ask-popup-inner')}>
        <p>{t('modalJoin.desc1')}</p>
        <span className={cn('desc-sub')}>
          <Trans
            i18nKey="modalJoin.text"
            ns="common"
            values={{
              strong1: '*',
            }}
          >
            <span className={cn('highlight')}></span>
          </Trans>
        </span>
        <Form layout='vertical' size='middle' form={form} onFinish={onFinish} onValuesChange={onFormChange}>
          <Form.Item name={'name'} label={t('modalJoin.item.0.title')} required rules={[
            {
              required: true,
              message: t('modalJoin.item.0.placeholder', { ns: 'common' }),
            },
          ]}>
            <Input placeholder={t('modalJoin.item.0.placeholder')} size='large' />
          </Form.Item>
          {/* 22.11.07 수정: validation 추가 */}
          <Form.Item
            name={'email'}
            label={t('modalJoin.item.1.title')}
            required
            // validateStatus="error"
            rules={[
              {
                required: true,
                message: t('modalJoin.item.1.message'),
              },
            ]}
          >
            <Input placeholder={t('modalJoin.item.1.placeholder')} size="large" />
          </Form.Item>
          {/* 22.11.10 수정: 필수 속성으로 변경 */}
          <Form.Item name={'nft_category'} label={t('modalJoin.item.2.title1')} required>
            <Select
              suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              popupClassName="select-size-sm-dropdown"
              placeholder={t('modalJoin.item.2.placeholder1')}
            >
              {/* 22.11.09 수정 start: 카테고리명 데이터 처리 수정 */}
              {projectList.map((item, index) => {
                return (
                  <Option value={item} key={`option${index + 1}`}>
                    {convertText(item)}
                  </Option>
                );
              })}
              {/* 22.11.09 수정 end: 카테고리명 데이터 처리 수정 */}
            </Select>
          </Form.Item>
          <Form.Item name={'description'} label={t('modalJoin.item.3.title')}
                     required
                     rules={[
                       {
                         required: true,
                         message: t('modalJoin.item.1.message', { ns: 'common' }),
                       },
                     ]}
          >
            {/* 22.11.10 수정: maxLength 수정 */}
            <Input.TextArea placeholder={t('modalJoin.item.3.placeholder')} showCount maxLength={1000} />
          </Form.Item>
          {/* 22.11.07 수정: validation 추가 */}
          <Form.Item
            name={'url'}
            label={t('modalJoin.item.4.title')}
            // required /* 22.11.11 수정: 필수값 삭제 */
            // validateStatus="error"
            rules={[
              {
                type: 'url',
                message: t('modalJoin.item.4.message', { ns: 'common' }),
              },
            ]}
          >
            <Input placeholder={t('modalJoin.item.4.placeholder')} size="large" />
          </Form.Item>
          <Form.Item name={'file'} label='Upload'>
            <UploadDragger callback={(files) => {
              console.log(files);
              if (files) {
                form.setFieldValue('file', files[0]?.response?.name ?? '');
              } else {
                form.resetFields(['file']);
              }
            }} />
          </Form.Item>
        </Form>
      </div>
    </ModalLayout>
  );
};

export default LifeAskToJoinModal;
