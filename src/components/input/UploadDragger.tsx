/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { ReactElement, useState } from 'react';
import cn from 'classnames';
import { message, Upload, UploadFile } from 'antd';
import IconButton from '@/components/button/IconButton';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
/* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

type UploadDraggerProps = {
  callback: (files: UploadFile<any>[]) => void;
};
const UploadDragger = ({ callback }: UploadDraggerProps) => {
  /* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [uploadFormHasFile, setUploadFormHasFile] = useState<boolean>(false);
  const [uploadFileFormat, setUploadFileFormat] = useState<string>('default');
  const { t } = useTranslation('common');
  const beforeUpload = (file: any) => {
    const isTrue = file.type === 'image/png' || file.type === 'application/pdf' || file.type === 'image/jpeg';
    if (!isTrue) {
      // 22.11.02 수정: 다국어 적용
      message.error(t('modalJoin.item.5.text'));
    }
    return isTrue || Upload.LIST_IGNORE;
  };

  const onChange = (e: any) => {
    console.log(e);
    const fileFormat = e.file.type.split('/');
    e?.fileList.length === 0 ? setUploadFormHasFile(false) : setUploadFormHasFile(true);
    if (!Array.isArray(e)) {
      setUploadFileFormat(fileFormat[1]);
      return e?.fileList;
    }
    if (callback) callback(e);
  };

  // 22.11.02 수정: 다국어 적용
  const uploadDesc = t('modalJoin.item.5.text');

  const uploadRender = (originNode: ReactElement, file: UploadFile, fileList: object[], actions: any) => {
    const units = ['bytes', 'KB', 'MB'];
    const unitsCalc = (value: number) => {
      let i;
      for (i = 0; value >= 1024 && i < 4; i++) {
        value /= 1024;
      }

      return value.toFixed(2) + units[i];
    };
    const fileFormat = () => {
      switch (uploadFileFormat) {
        case 'png':
          return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_file_png.svg" />;
        case 'pdf':
          return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_file_pdf.svg" />;
        case 'jpeg':
          return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_file_jpeg.svg" />;
      }
    };

    const fileName = () => {
      const names = file.name.split('.');
      let name = '';
      for (let i = 0; i < names.length - 1; i++) {
        name = name.concat(names[i]);
      }

      return name;
    };
    return (
      <div className={cn('file-name-wrap')}>
        <div className={cn('file-inner')}>
          {file.status === 'done' ? (
            <div className={cn('file-done-wrap')}>
              <span className={cn('file-format-ico')}>{fileFormat()}</span>
              <div className={cn('file-done-text-wrap')}>
                <span className={cn('file-name-text')}>
                  <span className={cn('file-name')}>{fileName()}</span>
                  <span className={cn('file-format')}>.{uploadFileFormat}</span>
                </span>
                <span className={cn('file-size')}>{unitsCalc(file?.size ?? 0)}</span>
              </div>
            </div>
          ) : (
            <div className={cn('file-uploading-text-wrap')}>
              <span className={cn('file-uploading-text')}>{t('modalJoin.form.status')}</span>
              <span className={cn('file-progress-wrap')}>
                <span className={cn('file-progress')} style={{ width: `${file.percent}%` }} />
              </span>
            </div>
          )}
          <IconButton buttonText="delete" size="32" iconValue="close" onClick={() => actions.remove()} />
        </div>
      </div>
    );
  };

  return (
    <div className={cn('upload-wrap', uploadFormHasFile && 'upload-has-file')}>
      <Upload.Dragger
        name="files"
        maxCount={1}
        beforeUpload={beforeUpload}
        itemRender={uploadRender}
        onChange={onChange}
        action={`${process.env.NEXT_PUBLIC_ENV_NILE_APP}/api/image/upload`}
      >
        {isMobile ? (
          <div className={cn('ant-upload-text btn-style')}>{t('modalJoin.item.5.title')}</div>
        ) : (
          <>
            <div className={cn('ant-upload-drag-icon')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_upload.svg" />
            </div>
            <div className={cn('ant-upload-text')}>{t('modalJoin.item.5.placeholder')}</div>
          </>
        )}
      </Upload.Dragger>
      <div className={cn('upload-info-desc')}>{uploadDesc}</div>
    </div>
  );
};
export default UploadDragger;
