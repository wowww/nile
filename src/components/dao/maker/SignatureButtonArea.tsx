import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';

interface Props {
  step: number;
  status?: 'ongoing' | 'complete' | 'fail';
  isWriter?: boolean;
}

interface ButtonListItemType {
  type: 'outline' | 'bg';
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const SignatureButtonArea = ({ step, status, isWriter }: Props): ReactElement => {
  const textArea = () => {
    switch (step) {
      case 1:
        return 'DAO 실행 조건 입력이 완료되면, 모집 컨트랙트 실행에 대한 서명 절차를 진행해 주세요.';
      case 2:
        return status === 'ongoing' ? '모집 컨트랙트 실행을 위해 서명을 진행해 주세요.' : '서명을 완료하였습니다.';
      case 3:
        return isWriter
          ? '모집 컨트랙트가 실행되어 곧 모집이 시작될 예정입니다.\n모집 성공 이후에 DAO 활성화 컨트랙트 실행에 대한 서명 절차를 진행해주세요.'
          : '모집 컨트랙트가 실행되어 곧 모집이 시작될 예정입니다.\n모집 성공 이후에 DAO 활성화 컨트랙트 실행에 대한 서명을 진행해주세요';
      case 4:
        return isWriter
          ? '모집이 시작되었습니다.\n모집 성공 이후에 DAO 활성화 컨트랙트 실행에 대한 서명 절차를 진행해주세요.'
          : '모집이 시작되었습니다.\n모집 성공 이후에 DAO 활성화 컨트랙트 실행에 대한 서명을 진행해주세요';
      case 5:
        if (status === 'fail') {
          return isWriter
            ? '모집 목표 달성에 실패하였습니다.\n환불 절차를 위한 서명절차를 진행해주세요.'
            : '모집 목표 달성에 실패하였습니다.\n환불 절차를 위한 서명을 진행해주세요.';
        } else if (status === 'complete' && !isWriter) {
          return '모집 목표를 달성하였습니다.\nDAO 활성화 컨트랙트 실행을 위해 서명을 진행해 주세요.';
        } else if (status === 'complete') {
          return '모집 목표를 달성하였습니다.\nDAO 활성화 컨트랙트 실행을 위한 서명 절차를 진행해 주세요.';
        }
      case 6:
        if (status === 'fail') {
          return '환불 절차 실행을 위해 서명을 진행해 주세요.';
        } else if (status === 'ongoing') {
          return 'DAO 활성화 컨트랙트 실행을 위해 서명을 진행해 주세요.';
        } else if (status === 'complete') {
          return '서명을 완료하였습니다.';
        }
      case 7:
        return status === 'fail'
          ? '환불 절차 실행이 완료되었습니다.'
          : isWriter
            ? 'DAO 활성화 컨트랙트 실행이 완료되었습니다.'
            : 'DAO 실행이 완료되었습니다.';
      default:
        return;
    }
  };

  const ButtonList: ButtonListItemType[][] = [
    // 1
    [
      {
        type: 'outline',
        text: '초기화',
      },
      {
        type: 'outline',
        text: '임시 저장',
      },
      {
        type: 'bg',
        text: '서명 절차 진행',
        disabled: !(status === 'complete'),
      },
    ],
    // 2
    [
      ...(isWriter
        ? ([
          {
            type: 'outline',
            text: '삭제',
          },
        ] as const)
        : []),
      {
        type: 'bg',
        text: status === 'complete' ? '서명 완료' : '서명 하기',
        disabled: status === 'complete',
      },
    ],
    // 3
    [
      ...(isWriter
        ? ([
          {
            type: 'bg',
            text: '서명 절차 진행',
            disabled: true,
          },
        ] as const)
        : []),
    ],
    // 4
    [
      ...(isWriter
        ? ([
          {
            type: 'bg',
            text: '서명 절차 진행',
            disabled: true,
          },
        ] as const)
        : []),
    ],
    // 5
    [
      {
        type: 'bg',
        text: isWriter ? '서명 절차 진행' : '서명 하기',
      },
    ],
    // 6
    [
      {
        type: 'bg',
        text: status === 'complete' ? '서명 완료' : '서명 하기',
        disabled: status === 'complete',
      },
    ],
    // 7
    [],
  ];

  return (
    <div className={cn('signature-button-area')}>
      <div className={cn('text-area')}>
        <strong>{textArea()}</strong>
        {step < 3 && (
          <span>
            *서명 절차를 진행 후에는 설정된 내용을 변경할 수 없습니다. 설정된 내용을 변경해야 할 경우, 해당 내용을 삭제한 후에 새로 작성해야 합니다.
          </span>
        )}
      </div>
      {ButtonList[step - 1].length > 0 && (
        <div className={cn('button-area')}>
          {ButtonList[step - 1].map((el) => {
            if (el.type === 'outline') {
              return <OutlineButton size="md" buttonText={el.text} color="black" />;
            } else if (el.type === 'bg') {
              return <BgButton size="md" buttonText={el.text} color="black" disabled={el.disabled} />;
            }
          })}
        </div>
      )}
    </div>
  );
};

export { SignatureButtonArea };
