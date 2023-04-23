import cn from 'classnames';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'next-i18next';
import { daoThemeAtom } from '@/state/daoAtom';
import ModalLayout from '@/components/modal/ModalLayout';
import { useEffect, useState } from 'react';
import Tag from '@/components/tag/Tag';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

interface Props {
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
}

const DaoBottomPopup = ({ isOpen, setIsOpen }: Props) => {
  const { t } = useTranslation('daoHome');
  const daoTheme = useAtomValue(daoThemeAtom).value;
  const tagList = t(`profile.${daoTheme}.tag`, { returnObjects: true });

  const [checkWrapHeight] = useState<number>(0);

  const [destroyClose] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [destroyClose]);

  return (
    <ModalLayout
      wrapClassName={cn('bottom-popup-modal', { active: isOpen })}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="lg"
      title={`${useDaoCharacterConvert(daoTheme)} DAO`}
      style={{ '--check-wrap-height': `${checkWrapHeight}px` } as React.CSSProperties}
      destroyOnClose={destroyClose}
    >
      <div className={cn('bottom-popup-wrap')}>
        <div className={cn('wrap-tag', daoTheme)}>
          {Object.keys(tagList).map((v, i) => {
            return (
              <Tag type="primary" size="md-m" key={i}>
                {t(`profile.${daoTheme}.tag.${v}`)}
              </Tag>
            );
          })}
        </div>
        <div className={cn('bottom-popup-title')}>{t(`profile.${daoTheme}.cont.title`)}</div>
        <div className={cn('bottom-popup-desc')}>{t(`profile.${daoTheme}.cont.desc`)}</div>
        <div className={cn('bottom-popup-footnote')}>{t(`profile.${daoTheme}.cont.footnote`)}</div>
      </div>
    </ModalLayout>
  );
};

export default DaoBottomPopup;
