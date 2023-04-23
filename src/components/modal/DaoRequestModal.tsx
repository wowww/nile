import cn from 'classnames';
import { Form, Input, message, Select } from 'antd';
import { useTranslation } from 'next-i18next';

// components
import BgButton from '@/components/button/BgButton';

// images
import { ReactSVG } from 'react-svg';
import { useCallback, useState } from 'react';
import axios from 'axios';
import dynamic from "next/dynamic";

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}

const { Option } = Select;

type DaoCreationValues = {
  type: string;
  description: string;
};

const DaoRequest = ({ isModal, setIsModal }: Props) => {
  const { t } = useTranslation(['daoHome', 'common']);
  const [form] = Form.useForm<DaoCreationValues>();

  const [pending, setPending] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const onFinish = useCallback(
    (values: any) => {
      setPending(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_ENV_NILE_API}/story/dao-creation`, {
          type: values.type,
          description: values.description,
        })
        .then(({ data }) => {
          message.info({
            content: t('toastMessage.RequestComplete', { ns: 'common' }),
            key: 'toast',
          });
          setPending(false);
          form.resetFields();
          setIsModal(false);
        })
        .catch((e) => {
          console.log(e);
          setPending(false);
          message.info({
            content: t('toastMessage.RequestComplete', { ns: 'common' }),
            key: 'toast',
          });
        });
    },
    [form, setIsModal, t]
  );

  const onFormChange = (target: any, formValues: any) => {
    if (formValues.type) {
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
      title={t('DaoRequestModal.title')}
      footer
      destroyOnClose={true}
      // 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정
      footerContent={[
        <BgButton
          buttonText={t('DaoRequestModal.btnText')}
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
        <p>{t('DaoRequestModal.desc')}</p>
        {/* 22.11.17 수정: preserve 추가 */}
        <Form layout="vertical" size="middle" form={form} onFinish={onFinish} preserve={false} onValuesChange={onFormChange}>
          <Form.Item
            name={'type'}
            label={t('DaoRequestModal.form.daoCategory.label')}
            required
            // validateStatus="error"
            rules={[
              {
                required: true,
                message: t('DaoRequestModal.form.daoCategory.errorMessage'),
              },
            ]}
          >
            <Select
              suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              popupClassName="select-size-sm-dropdown"
              placeholder={t('DaoRequestModal.form.daoCategory.placeholder')}
            >
              <Option value="business dao">BUSINESS DAO</Option>
              <Option value="investment dao">INVESTMENT DAO</Option>
              <Option value="art dao">ART DAO</Option>
              <Option value="social dao">SOCIAL DAO</Option>
              <Option value="product dao">PRODUCT DAO</Option>
              <Option value="entertainment dao">ENTERTAINMENT DAO</Option>
              <Option value="concert dao">CONCERT DAO</Option>
              <Option value="film dao">FILM DAO</Option>
              <Option value="music dao">MUSIC DAO</Option>
              <Option value="sports dao">SPORTS DAO</Option>
              <Option value="etc">etc (Write type in ‘Detail Requests’)</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={'description'}
            label={t('DaoRequestModal.form.introduction.label')}
            required={false}
            // validateStatus="error"
            rules={[
              {
                required: false,
                message: t('DaoRequestModal.form.daoCategory.errorMessage'),
              },
            ]}
          >
            <Input.TextArea placeholder={t('DaoRequestModal.form.introduction.placeholder')} showCount maxLength={100} />
          </Form.Item>
          {/* 22.11.10 수정 start: 해당 영역 삭제 */}
          {/* <Form.Item
            name={'email'}
            label={t('DaoRequestModal.form.email.label')}
            required
            // validateStatus="error"
            rules={[
              {
                // required: true, // rule을 맞춰주세요.
                message: t('modalJoin.form.item.1.message', { ns: 'common' }),
              },
            ]}
          >
            <Input placeholder={t('DaoRequestModal.form.email.placeholder')} size="large" />
          </Form.Item> */}
          {/* 22.11.10 수정 end: 해당 영역 삭제 */}
        </Form>
      </div>
    </ModalLayout>
  );
};

export default DaoRequest;
