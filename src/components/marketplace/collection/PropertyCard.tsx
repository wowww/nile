import cn from 'classnames';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';

type PropertyCardProps = {
  collectionAddress?: string;
  type: string;
  name: string;
  /* 23.03.10 수정: rarity 옵셔널로 수정 */
  rarity?: string;
  slug?: string;
  disabled?: boolean;
};

export const PropertyCard = ({ collectionAddress, type, name, rarity, slug, disabled }: PropertyCardProps) => {
  const router = useRouter();

  const onClickProperty = useCallback(() => {
    const searchParams = new URLSearchParams({
      property: type,
      value: name,
    });

    if (!disabled) router.push(`/marketplace/${slug}?${searchParams}`);
  }, []);

  return (
    <button className={cn('properties-item')} onClick={onClickProperty} disabled={disabled}>
      <span className={cn('type')}>{type}</span>
      <strong className={cn('name')}>{name}</strong>
      {/*{rarity && (*/}
      {/*  <span className={cn('rarity')}>*/}
      {/*    {rarity} <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />*/}
      {/*  </span>*/}
      {/*)}*/}
    </button>
  );
};
