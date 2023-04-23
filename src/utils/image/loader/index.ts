import { ImageLoaderProps } from 'next/image';

export const NileCDNLoader = ({ src }: Partial<ImageLoaderProps>) => {
  return src?.startsWith('http') ? src : `https://nile.blob.core.windows.net/images${src}`;
};
