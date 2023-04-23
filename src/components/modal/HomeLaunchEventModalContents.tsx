import cn from 'classnames';
import OutlineButton from '@components/button/OutlineButton';
import { ReactSVG } from 'react-svg';
import { UrlObject } from 'url';

{
  /* 23.04.07 수정: buttonType size 추가 */
}
interface buttonType {
  text: string;
  size: string;
  href?: UrlObject | string;
  target?: string;
  onClick?: () => void;
  theme: 'white' | 'black';
}

interface modalProps {
  classNames?: string;
  logo?: {
    url?: string;
    name: string;
  };
  title: string;
  desc: string;
  options?: React.ReactNode;
  schedule?: React.ReactNode;
  backgroundImageUrl: string;
  isImgFull?: boolean;
  imgDimmed?: boolean;
  type?: string;
  buttonList?: buttonType[];
  /* 23.04.03 수정: props 추가 */
  scheduleTable?: React.ReactNode;
}

const HomeLaunchEventModalContents = ({
  classNames,
  logo,
  title,
  desc,
  options,
  schedule,
  backgroundImageUrl,
  isImgFull = false,
  imgDimmed = false,
  type,
  buttonList,
  /* 23.04.03 수정: props 추가 */
  scheduleTable,
}: modalProps) => {
  return (
    <div
      className={cn('event-modal-contents', classNames, `type-${type}`, { 'img-full': isImgFull, 'img-dimmed': imgDimmed })}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className={cn('contents-wrap')}>
        {logo && (
          <div className={cn('logo-wrap')}>
            {logo.url && (
              <div className={cn('logo-img')}>
                <ReactSVG src={logo.url} />
              </div>
            )}
            {logo.name && <span className={cn('logo-name')}>{logo.name}</span>}
          </div>
        )}
        <h2 className={cn('title')}>{title}</h2>
        <p className={cn('desc')}>{desc}</p>
        {options && <div className={cn('event-details')}>{options}</div>}
        <div className={cn('button-wrap')}>
          {/* 23.04.07 수정: buttonList에 size 추가 */}
          {buttonList?.map((item, index) => (
            <OutlineButton
              buttonText={item.text}
              size={item.size}
              color={item.theme}
              href={item?.href}
              target={item?.target ?? undefined}
              onClick={item?.onClick}
              key={item.text + index}
            />
          ))}
        </div>
        {/* 23.03.23 수정: 주석 삭제 */}
        {schedule && <div className={cn('schedules')}>{schedule}</div>}
        {/* 23.04.03 수정: dom 추가 */}
        {scheduleTable && <div className={cn('schedule-table')}>{scheduleTable}</div>}
      </div>
    </div>
  );
};

export default HomeLaunchEventModalContents;
