import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Helmet } from 'react-helmet-async';
import { DaoCreateBox, DaoCreateBoxInner, DaoCreateLayout, DaoCreateTitle } from '@/components/dao/DaoCreateLayout';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import DaoLayout from '@/components/dao/DaoLayout';
import FormCreateButton from './FormCreateButton';

import ArticleCreateForm from '@/components/dao/governance/ArticleCreateForm';

interface Props {}

const TrustCreateNotice = ({}: Props): ReactElement => {
  const { t } = useTranslation('');
  const activeDao = useAtomValue(daoThemeAtom);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <Helmet>
        <title>DAO &gt; Nile</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap', 'create')} />
      </Helmet>
      <DaoLayout activate="trust" lnb={false}>
        <div className={cn('create-layout-wrap', 'common')}>
          <DaoCreateLayout className="ratio">
            <DaoCreateTitle title="공지 작성하기" />
            <DaoCreateBox>
              <DaoCreateBoxInner>
                <div className={cn('edit-wrap')}>
                  <ArticleCreateForm contentsPlaceholder="공지 내용을 입력해 주세요."
                                     // setInputValue={setInputValue}
                  />
                </div>
              </DaoCreateBoxInner>
            </DaoCreateBox>
            <DaoCreateBox>
              <DaoCreateBoxInner>
                <FormCreateButton buttonText="수정하기" isActive={!inputValue ? false : true} />
              </DaoCreateBoxInner>
            </DaoCreateBox>
          </DaoCreateLayout>
        </div>
      </DaoLayout>
    </>
  );
};

export default TrustCreateNotice;
