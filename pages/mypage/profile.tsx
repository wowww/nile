import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Avatar, Form, Input, Radio } from 'antd';
import { debounce } from 'lodash';

import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';

import ContentTitle from '@/components/marketplace/ContentTitle';

import { NileApiService } from '@/services/nile/api';
import { authTokenAtom, userProfileAtom } from '@/state/accountAtom';
import { useAtom, useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import { nileWalletAtom } from '@/state/nileWalletAtom';

import useMediaQuery from '@/hook/useMediaQuery';

const PfpModal = dynamic(() => import('@/components/modal/PfpModal'), { ssr: false });
const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

const Profile = () => {
  const router = useRouter();
  /* 23.04.20 수정: 사용자명 하위가이드 개인정보 보호정책 링크 영문/국문 링크 구별 */
  const { locale } = useRouter();
  const authToken = useAtomValue(authTokenAtom);

  const { t } = useTranslation(['mypage', 'common']);
  const api = NileApiService();

  const [form] = Form.useForm();

  // TODO : SNS CONNECT
  const [instagramToken, setInstagramToken] = useState<string>();
  const [instagramName, setInstagramName] = useState<string>();
  const [connectTwitter, setConnectTwitter] = useState(true);
  const [connectInsta, setConnectInsta] = useState(false);

  const [pfpModal, setPfpModal] = useState(false);
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  const [isConfirmModal, setConfirmModal] = useState(false);

  const [profileImage, setProfileImage] = useState<string>();

  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (userProfile) {
      form.setFieldsValue({
        nickname: userProfile?.nickname,
        description: userProfile?.description,
        url: userProfile?.url,
        displayAsset: userProfile?.displayAsset ?? 'PUBLIC',
      });
    }
  }, [userProfile]);

  const onFinish = (values: any) => {
    api.user.account
      .updateUserInfo(userProfile?.id ?? '', {
        nickname: values.nickname,
        description: values.description,
        url: values.url,
        displayAsset: values.displayAsset,
        img: profileImage,
      })
      .then(({ data }) => {
        setUserProfile(data.result);
        router.push(`/mypage/${userProfile.address}`);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const validateNickname = useCallback((_: any, value: string) => {
    if (!value || value.length > 50) {
      form.setFields([
        {
          name: 'nickname',
          errors: [t('profileSetting.userNameValidCount')],
        },
      ]);
      return;
      // return Promise.reject(new Error(t('profileSetting.userNameValidCount')));
    }

    api.user.account
      .validNickName(value)
      .then((res) => {
        console.log(res);
        if (!res.data.result) {
          form.setFields([
            {
              name: 'nickname',
              errors: [t('profileSetting.userNameValidAlreadyUse')],
            },
          ]);
          return Promise.reject(new Error(t('profileSetting.userNameValidAlreadyUse')));
        }
      })
      .catch((err) => console.log(err));

    return Promise.resolve();
  }, []);

  const validateUrl = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.resolve();
    }
    if (!value.startsWith('https://')) {
      return Promise.reject(new Error('url have to start with https://'));
    }

    return Promise.resolve();
  }, []);

  {
    /* TODO: 11/17 이후 반영 - sns connect */
  }
  // useEffect(() => {
  //   if (query.code) {
  //     axios
  //       .post('https://localhost:3001/api/instagram/oauth', {
  //         code: query.code,
  //       })
  //       .then((res) => {
  //         setInstagramToken(res.data.access_token);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [query]);

  // useEffect(() => {
  //   if (instagramToken) {
  //     axios
  //       .get(`https://graph.instagram.com/me?fields=id,username&access_token=${instagramToken}`)
  //       .then((res) => {
  //         setInstagramName(res.data.username);
  //         setConnectInsta(true);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [instagramToken]);

  // const disconnectInsta = useCallback(() => {
  //   setConnectInsta(false);
  //   setInstagramName('');
  //   setInstagramToken('');
  // }, []);

  useEffect(() => {
    if (!authToken.accessToken) {
      router.replace('/');
    }
  }, [authToken]);

  return (
    <div className={cn('profile-setting-wrap')}>
      <ContentTitle title={t('profileSetting.title')} />
      <div className={cn('profile-container')}>
        <div className={cn('profile-img-section')}>
          <button
            type="button"
            className={cn('btn-user-open')}
            onClick={() => {
              setPfpModal(true);
            }}
          >
            <Avatar
              className={cn('user-image', userProfile?.themeIndex && `type${userProfile.themeIndex}`)}
              size={isMobile ? 100 : 120}
              style={{ backgroundImage: profileImage ? `url(${profileImage})` : userProfile.img && `url(${userProfile.img})` }}
            >
              <span className={cn('a11y')}>{t('a11y.settingProfile', { ns: 'mypage' })}</span>
            </Avatar>
          </button>
          <p className={cn('profile-img-desc')}>{t('profileSetting.desc')}</p>
          <PfpModal isOpen={pfpModal} setIsOpen={setPfpModal} setProfileImage={setProfileImage} />
        </div>
        <div className={cn('profile-form-section')}>
          <Form name="nest-messages" layout="vertical" onFinish={onFinish} size="large" form={form}>
            {/* 23.04.20 수정: 사용자 하위 가이드 반영 extra 부분 추가 */}
            <Form.Item
              name="nickname"
              label={t('profileSetting.userName')}
              className={cn('profile-form-item has-helper')}
              required
              extra={
                <div className={cn('helper-wrap')}>
                  <div className={cn('username-desc')}>
                    <span className={cn('username-role')}>{t('profileSetting.userNameHelper')}</span>
                    <div className={cn('username-detail-desc')}>
                      <Trans i18nKey={'profileSetting.userNameDesc'} ns="mypage">
                        <a className={cn('link')} href={`https://www.wemix.com/${locale}/policy/privacy`} target="_blank"></a>
                      </Trans>
                    </div>
                  </div>
                </div>
              }
              rules={[
                {
                  validator: debounce(validateNickname, 500, { leading: true }),
                },
              ]}
            >
              <Input placeholder={t('profileSetting.userNamePlaceholder')} />
            </Form.Item>

            <Form.Item name={'description'} label={t('profileSetting.about')} className={cn('profile-form-item')}>
              <Input.TextArea showCount maxLength={200} placeholder={t('profileSetting.aboutPlaceholder')} />
            </Form.Item>
            {/* TODO : SNS CONNECT */}
            {/* <div className={cn('profile-form-item connect-sns-wrap')}>
              <strong className={cn('label')}>{t('profileSetting.social')}</strong>
              <p className={cn('sns-desc')}>{t('profileSetting.socialDesc')}</p>
              <div className={cn('sns-button-wrap')}>
                {connectTwitter ? (
                  <div className={cn('sns-complete')}>
                    <span className={cn('sns-id')}>
                      <IconTwitterColor />
                      Scarletjang
                    </span>
                    <button type="button" className={cn('btn-disconnect')}>
                      <span className={cn('a11y')}>{t('profileSetting.disconnectSocial')}</span>
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg'  />
                    </button>
                  </div>
                ) : (
                  <OutlineButton
                    buttonText={locale === 'ko' ? 'Twitter 연결' : 'Connect Twitter'}
                    color="gray"
                    size="md"
                    iconType
                    iconValue="twitterColor"
                  />
                )}
                {connectInsta ? (
                  <div className={cn('sns-complete')}>
                    <span className={cn('sns-id')}>
                      <IconInstaColor />
                      {instagramName}
                    </span>
                    <button type="button" className={cn('btn-disconnect')} onClick={disconnectInsta}>
                      <span className={cn('a11y')}>{t('profileSetting.disconnectSocial')}</span>
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg'  />
                    </button>
                  </div>
                ) : (
                  <a
                    href={`https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_ENV_INSTAGRAM_APP_ID}&redirect_uri=https://localhost:3001/mypage/profile&response_type=code&scope=user_profile`}
                  >
                    <OutlineButton
                      buttonText={locale === 'ko' ? 'Instagram 연결' : 'Connect Instagram'}
                      color="gray"
                      size="md"
                      iconType
                      iconValue="instaColor"
                      type="link"
                    />
                  </a>
                )}
              </div>
            </div> */}
            <Form.Item
              name="url"
              label={t('profileSetting.link')}
              className={cn('profile-form-item')}
              rules={[
                {
                  validator: validateUrl,
                },
              ]}
            >
              <Input placeholder={t('profileSetting.linkPlaceholder')} />
            </Form.Item>

            <Form.Item name="displayAsset" label={t('profileSetting.asset')} className={cn('profile-form-item radio-button-wrap')}>
              <Radio.Group size="middle">
                <Radio.Button value="PUBLIC">
                  <span className={cn('inner-text')}>{t('profileSetting.public')}</span>
                </Radio.Button>
                <Radio.Button value="ONLY_ME">
                  <span className={cn('inner-text')}>{t('profileSetting.onlyMe')}</span>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item className={cn('profile-form-item')}>
              <div className={cn('button-wrap')}>
                <OutlineButton
                  buttonText={t('profileSetting.cancel')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setConfirmModal(true);
                  }}
                />
                <BgButton buttonText={t('profileSetting.save')} color="black" size="md" htmlType="submit" />
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ModalLayout
        isOpen={isConfirmModal}
        setIsOpen={setConfirmModal}
        size="sm"
        title={t('profileSetting.confirmCancel')}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <OutlineButton
            buttonText={t('profileSetting.close')}
            color="black"
            size="md"
            key="Close"
            onClick={() => {
              setConfirmModal(false);
            }}
          />,
          <BgButton buttonText={t('profileSetting.yesClose')} color="black" size="md" key="Save" href={`/mypage/${userProfile.address}`} />,
        ]}
      >
        <p>{t('profileSetting.confirmCancelDesc')}</p>
      </ModalLayout>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'mypage'])),
    },
  };
};

export default Profile;
