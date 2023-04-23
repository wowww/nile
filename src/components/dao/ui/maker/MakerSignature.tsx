import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';

// components
import { SignatureHeader } from './SignatureHeader';
import { SignatureTable, TableItemType as FullTableItemType } from './SignatureTable';
import { SignatureTargetTable, TableItemType as TargetTableItemType } from './SignatureTargetTable';
import { SignatureButtonArea } from './SignatureButtonArea';

interface Props {
  step: number;
  isWriter?: boolean;
  status?: 'ongoing' | 'complete' | 'fail';
  tableData: TargetTableItemType[] | FullTableItemType[];
}

const MakerSignature = ({ step, isWriter = false, status, tableData }: Props): ReactElement => {
  return (
    <div className={cn('dao-maker-signature-wrap', (step === 4 || (step === 5 && isWriter)) && 'only-button-area')}>
      {!(step === 4 || (step === 5 && isWriter)) && (
        <>
          <SignatureHeader step={step} />
          {step === 1 ? <SignatureTargetTable data={tableData} /> : <SignatureTable data={tableData} />}
        </>
      )}
      <SignatureButtonArea step={step} status={status} isWriter={isWriter} />
    </div>
  );
};

export { MakerSignature };
