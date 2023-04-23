import { useEffect, useState } from 'react';
import axios from 'axios';

export const useTokens = () => {
  const [tokenWemix, setTokenWemix] = useState();
  const [tokenWemix$, setTokenWemix$] = useState();
  const [tokenTipo, setTokenTipo] = useState();
  const [tokenForce, setTokenForce] = useState();

  const [tokens, setTokens] = useState<any[]>([]);

  const [onComplete, handleOnComplete] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`/api/tokenInfoList`).then(({ data }) => {
      const tempTokens: any[] = [];
      data.forEach((token: any) => {
        switch (token.token_symbol) {
          case 'WEMIX':
            setTokenWemix(token);
            break;
          case 'WEMIX$':
            setTokenWemix$(token);
            break;
          case 'TIPO':
            setTokenTipo(token);

            tempTokens.push(token);
            break;
          case 'FRC':
            setTokenForce(token);
            tempTokens.push(token);
            break;
        }
      });

      setTokens(tempTokens);
      handleOnComplete(true);
    });
  }, []);

  return { tokenWemix, tokenWemix$, tokenTipo, tokenForce, onComplete, tokens };
};
