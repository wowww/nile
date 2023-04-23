import cn from 'classnames';
import OutlineButton from '@components/button/OutlineButton';
import { ReactSVG } from 'react-svg';
import { UrlObject } from 'url';

interface buttonType {
  text: string;
  href?: UrlObject | string;
  target?: string;
  onClick?: () => void;
  theme: 'white' | 'black';
}

interface modalProps {
  classNames?: string;
  status: string;
  title: string;
  /* 23.03.11 수정: logo, slogan props 추가 */
  logo?: {
    url: string;
    name: string;
  };
  slogan?: string;
  desc: string;
  date?: string;
  isNileOrigin?: boolean;
  backgroundImageUrl: string;
  type?: string;
  isImgFull?: boolean;
  imgDimmed?: boolean;
  buttonList?: buttonType[];
}

const HomeEventModalContents = ({
  classNames,
  status,
  title,
  /* 23.03.11 수정: logo, slogan props 추가 */
  logo,
  slogan,
  desc,
  date,
  isNileOrigin,
  backgroundImageUrl,
  type,
  isImgFull = false,
  imgDimmed = false,
  buttonList,
}: modalProps) => {
  return (
    <div
      className={cn('event-modal-contents', classNames, `type-${type}`, { 'img-full': isImgFull, 'img-dimmed': imgDimmed })}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className={cn('contents-wrap')}>
        {isNileOrigin && (
          <div className={cn('tag')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_nile_original.svg" />
          </div>
        )}
        {/* 23.03.11 수정 start: logo 케이스 추가 */}
        {logo && (
          <div className={cn('logo-wrap')}>
            <div className={cn('logo-img')}>
              <ReactSVG src={logo.url} />
            </div>
            {logo.name && <span className={cn('logo-name')}>{logo.name}</span>}
          </div>
        )}
        {/* 23.03.11 수정 end: logo 케이스 추가 */}
        {/* 23.03.11 수정: status 조건 추가 */}
        {status && <div className={cn('state')}>{status}</div>}
        <h2 className={cn('title')}>{title}</h2>
        {/* 23.03.11 수정: slogan 케이스 추가 */}
        {slogan && <p className={cn('slogan')}>{slogan}</p>}
        <p className={cn('desc')}>{desc}</p>
        {date && <div className={cn('time')}>{date}</div>}
        <div className={cn('button-wrap')}>
          {buttonList?.map((item, index) => (
            <OutlineButton
              buttonText={item.text}
              size="md"
              color={item.theme}
              href={item?.href}
              target={item?.target ?? undefined}
              onClick={item?.onClick}
              key={item.text + index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeEventModalContents;
