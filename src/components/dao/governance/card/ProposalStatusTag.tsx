import Tag from '@components/tag/Tag';
import { ProposalCheck, ProposalStatus } from '@/types/dao/proposal.types';
import { useMemo } from 'react';

interface ProposalStatusTagProps {
  status?: ProposalStatus;
  check?: ProposalCheck;
}

const ProposalStatusTag = ({ status, check }: ProposalStatusTagProps) => {
  const tag = useMemo(() => {
    switch (status) {
      case ProposalStatus.IN_PROGRESS:
        return (
          <Tag size="xs" color="black">
            Active
          </Tag>
        );
      case ProposalStatus.DONE:
        if (check === ProposalCheck.GOVERNANCE) {
          return (
            <Tag size="xs" type="primary" bg>
              Executed
            </Tag>
          );
        }
        return (
          <Tag size="xs" color="black">
            Passed
          </Tag>
        );
      case ProposalStatus.REJECTED:
        return (
          <Tag size="xs" color="light-gray">
            Rejected
          </Tag>
        );
    }
  }, [status, check]);

  return <>{tag}</>;
};

export default ProposalStatusTag;
