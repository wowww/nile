import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';

type ProposalGTInfoProps = {
  item: {
    name: string;
    num: string;
    sub?: string;
  }[];
  desc?: {
    key: string;
    ns: string;
    num: string;
  };
};
const ProposalGTInfo = ({ item, desc }: ProposalGTInfoProps) => {
  const { t } = useTranslation('dao');

  return (
    <div className={cn('proposal-gt-info')}>
      <ul className={cn('gt-info-list')}>
        {item.map((el, index) => {
          return (
            <li key={`list${index}`}>
              <span className={cn('name')}>{el.name}</span>
              <span className={cn('num')}>
                {el.num} {el.sub && <span className={cn('sub')}>{el.sub}</span>}
              </span>
            </li>
          );
        })}
      </ul>
      {desc && (
        <p className="desc">
          <Trans
            i18nKey={desc.key}
            ns={desc.ns}
            values={{
              num: desc.num,
            }}
          >
            <span></span>
          </Trans>
        </p>
      )}
    </div>
  );
};

export default ProposalGTInfo;
