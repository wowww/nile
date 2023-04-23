import Tag from '@components/tag/Tag';
import { ReactSVG } from 'react-svg';

interface ProposalSubTagProps {
  type: 'trust' | 'my' | 'voted' | 'joined';
}

const ProposalSubTag = ({ type }: ProposalSubTagProps) => {
  return (
    <>
      {
        {
          trust: (
            <Tag type="primary" size="sm" border="white-gray">
              Trust Check
            </Tag>
          ),
          my: (
            <Tag type="primary" size="sm" border="white-gray">
              My Proposal
            </Tag>
          ),
          voted: (
            <Tag type="primary" size="sm" border="white-gray">
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_check.svg" />
              Voted
            </Tag>
          ),
          joined: (
            <Tag type="primary" size="sm" border="white-gray">
              Participated
            </Tag>
          ),
        }[type]
      }
    </>
  );
};

export default ProposalSubTag;
