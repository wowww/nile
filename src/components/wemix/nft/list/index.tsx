import { useState } from 'react';
import { useIpfs } from '@utils/ipfs';

export type WemixNftListProps = {
  contractAddress: string;
};

export const WemixNftList = ({ contractAddress }: WemixNftListProps) => {
  const { getData } = useIpfs();

  const [list, setList] = useState<any[]>([]);

  // useEffect(() => {
  //   if (getData && inventory) {
  //     inventory.results.forEach((result) => {
  //       getData(result.tokenUri).then((result) => {
  //         setList((prev) => [...prev, result.data]);
  //       });
  //     });
  //   }
  // }, [getData, inventory]);

  return (
    <div>
      test
    </div>
  );
};
