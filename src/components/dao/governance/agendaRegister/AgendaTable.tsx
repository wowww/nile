import React from 'react';
import BgButton from '@/components/button/BgButton';
import cn from 'classnames';

export interface AgendaTableType {
  titleFull?: React.ReactNode | string;
  titleColumn?: AgendaTableLineType[];
  children?: React.ReactNode;
  className?: string;
}

interface AgendaTableLineType {
  title?: string;
  node?: React.ReactNode[];
  rowspan?: boolean;
}

const AgendaTable: React.FC<AgendaTableType> = ({ titleFull, titleColumn, children, className }: AgendaTableType) => {
  return (
    <div className={cn('governance-setting-type-wrap', className)}>
      <div className={cn('check-content-wrap')}>
        <table className={cn('proposal-table')}>
          <tbody>
            {titleFull ? (
              <tr>{titleColumn && titleColumn[0].node ? <th colSpan={titleColumn[0].node.length + 1}>{titleFull}</th> : <th>{titleFull}</th>}</tr>
            ) : null}

            {titleColumn &&
              titleColumn.map((v, i) => {
                return (
                  <tr key={`line-${i}`} className={cn('column-line')}>
                    {v.title ? <th rowSpan={v.rowspan ? titleColumn.length : undefined}>{v.title}</th> : null}
                    {v.node &&
                      v.node.map((item, j) => {
                        return <td key={`line-in-${j}`}>{item ? item : null}</td>;
                      })}
                  </tr>
                );
              })}
            {children ? (
              <tr>{titleColumn && titleColumn[0].node ? <td colSpan={titleColumn[0].node.length + 1}>{children}</td> : <td>{children}</td>}</tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(AgendaTable);
