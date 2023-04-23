import cn from 'classnames';
import MysteryBoxContents from '@/components/life/snkrz/MysteryBoxContents';
import { useTranslation } from 'next-i18next';
import SnkrzNftStarterPack from '@components/life/snkrz/SnkrzNftStarterPack';
import SnkrzNftWhatsIn from '@components/life/snkrz/SnkrzNftWhatsIn';
import SnkrzEventBanner from './SnkrzNftEventBanner';

const SnkrzNft = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    <div className={cn('life-snkrz-inner nft')}>
      <SnkrzNftStarterPack />
      <section className={cn('section')}>
        <SnkrzNftWhatsIn />
        <MysteryBoxContents />
        <SnkrzEventBanner />
      </section>
    </div>
  );
};

export default SnkrzNft;
