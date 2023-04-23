import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PapyrusPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/community');
  }, []);
  return;
};

export default PapyrusPage;
