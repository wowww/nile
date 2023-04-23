import cn from 'classnames';
import { Avatar, Form, Input, Radio } from 'antd';
/* 23.03.01 수정: 다국어 적용을 위한 추가 */
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

import Chip from '@components/tag/Chip';
import {userProfileAtom} from "@/state/accountAtom";
import {NileApiService} from "@/services/nile/api";
import React, {useEffect, useState} from "react";
import {nileWalletAtom} from "@/state/nileWalletAtom";

const Step1 = () => {
  /* 23.03.01 수정: 다국어 적용을 위한 추가 */
  const { t } = useTranslation(['dao', 'common']);
  const api = NileApiService();
  const activeDao = useAtomValue(daoThemeAtom);
  const userProfile = useAtomValue(userProfileAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const [ownedNft, setOwnedNft] = useState();

  const onFinish = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    api.mypage.nft
      .getList(nileWallet ?? '')
      .then(({ data }) => setOwnedNft(data.pageInfo.total))
      .catch((err) => {
        console.log(err)
        return null;
      });
  }, []);


  return (
    <div className={cn('step1-wrap')}>
      <Form name="nest-messages" layout="vertical" onFinish={onFinish} size="large">
        <div className={cn('station-form-item ant-form-item')}>
          <strong className={cn('label')}>{t('station.participationProcess.inputBio')}</strong>
          <div className={cn('profile-info')}>
            <Avatar
              className={cn('user-image', `type${userProfile?.themeIndex}`)}
              size={48}
              style={{ backgroundImage: userProfile?.img && `url(${userProfile.img})` }}
            >
              <span className={cn('a11y')}>{t('openProfile')}</span>
            </Avatar>
            <div className={cn('user-name-wrap')}>
              {userProfile?.nickname && <strong>{userProfile?.nickname}</strong>}
              <span>{nileWallet}</span>
            </div>
          </div>
        </div>
        <Form.Item
          name={'textarea'}
          label={
            <>
              {t('station.participationProcess.welcomeMessage', { type: useDaoCharacterConvert(activeDao.value) })}{' '}
              <span>({t('station.participationProcess.optional')})</span>
            </>
          }
          className={cn('station-form-item')}
        >
          {/* 23.03.01 수정: placeholder변경 (placeholderType1~placeholderType5 까지 미입력 대상자에게 순차적으로 반영) */}
          {/* 23.03.27 수정: textarea 관련 기획 정의 수정 byte 추가 */}
          <Input.TextArea
            showCount={{ formatter: ({ count, maxLength }) => `${count}/${maxLength} byte` }}
            maxLength={50}
            placeholder={t('station.participationProcess.placeholderType1')}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Step1;
