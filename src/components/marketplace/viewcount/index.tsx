import styled from '@emotion/styled';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';

export type MarketViewCountProps = {
  views: number;
};

export const MarketViewCount = ({ views }: MarketViewCountProps) => {
  return (
    <Wrapper>
      <Image src="/icons/common/ico_watch.svg" loader={NileCDNLoader} width={24} height={24} alt="" />
      <Count>{views}</Count>
    </Wrapper>
  );
};

const Wrapper = styled.div([]);

const Count = styled.span([]);
