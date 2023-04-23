import Image from 'next/image';
import { Button } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import imageCompression from '@utils/image/compress';
import { getDataArrayBuffer } from '@utils/image';
import { NileCDNLoader } from '@utils/image/loader';

const MAX_IMAGE_SIZE_MB = 0.03; // 30KB

export type WemixNftUploadProps = {
  // TODO
};

export const WemixNftUpload = (props: WemixNftUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const wallet = useRecoilValue(CryptoWallet);

  const [thumbnail, setThumbnail] = useState<{ preview: string | ArrayBuffer | null; file?: File }>({
    preview: null,
    file: undefined,
  });

  const [compressed, setCompressed] = useState<{ data: string; filename: string }>();

  const onSuccess = useCallback((response: any) => {
    console.log('success', response);
  }, []);

  const onError = useCallback((error: any) => {
    console.log('error', error);
  }, []);

  // const uploadPhoto = useCallback((hexString, fileName, location, caption) => {
  // const transaction = ContractExecute({
  // from: wallet.address,
  // contract: '0xAdc4C21704F120893055373E2dDe1ac984f75ce8',
  // abi: JSON.stringify(abi.filter(({ name }) => name === 'uploadPhoto')),
  // params: JSON.stringify([ hexString, fileName, location, caption ]),
  // });
  // propose({ transaction, onSuccess, onError });
  // }, [ContractExecute, onError, onSuccess, propose, wallet.address]);

  const handleInputChange = useCallback(async ({ target }: any) => {
    const [file]: File[] = Array.from(target.files);
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail({ preview: reader.result, file });
    };
    reader.readAsDataURL(file);
  }, []);

  useEffect(() => {
    if (thumbnail.file) {
      imageCompression(thumbnail.file, MAX_IMAGE_SIZE_MB)
        .then(getDataArrayBuffer)
        .then((buffer) => `0x${buffer.toString('hex')}`)
        .then((data) => setCompressed({ data, filename: thumbnail.file?.name ?? '' }))
        .catch(() => {
          // TODO: Handle it
        });
    }
  }, [thumbnail]);

  // useEffect(() => {
  //   if (compressed) {
  // uploadPhoto(compressed.data, compressed.filename ?? 'file', 'london', 'test');
  // }
  // }, [compressed, uploadPhoto]);

  return (
    <label htmlFor="photos">
      <input ref={inputRef} id="photos" accept="image/*" type="file" hidden onChange={handleInputChange} />
      <Button onClick={() => inputRef.current?.click()}>Upload</Button>
      <Image src={thumbnail.preview?.toString() ?? ''} loader={NileCDNLoader} alt="" />
    </label>
  );
};
