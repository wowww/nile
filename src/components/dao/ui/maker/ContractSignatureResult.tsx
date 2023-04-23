import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import { Collapse } from 'antd';
import { ReactSVG } from 'react-svg';

import { SignatureTable, TableItemType } from './SignatureTable';

interface Props {
  data: TableItemType[];
  deadlineDate: string;
}

const { Panel } = Collapse;

const ContractSignatureResult = ({ data, deadlineDate }: Props): ReactElement => {
  return (
    <div className={cn('contract-signature-result-wrap')}>
      <Collapse bordered={false} expandIconPosition="end" className="contract-signature-result-collapse">
        <Panel
          header={
            <div className={cn('contract-collapse-header')}>
              <div className={cn('text-wrap')}>
                <strong>모집 컨트랙트 서명 결과</strong>
                <span className={cn('desc')}>N명 중 N명이 서명을 완료하여 정족수가 충족되었습니다.</span>
              </div>
              <div className={cn('right')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                <span className={cn('deadline-date')}>서명 마감 : {deadlineDate}</span>
              </div>
            </div>
          }
          key="1"
        >
          <SignatureTable data={data} />
        </Panel>
      </Collapse>
    </div>
  );
};

export { ContractSignatureResult };
