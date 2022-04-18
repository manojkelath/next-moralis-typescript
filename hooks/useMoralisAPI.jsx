import React, { useContext, useEffect, useState } from 'react';
import OCEEDEE_ABI from '../abi/abi_oceedee.json';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import config from '../config';

const MoralisAPIContext = React.createContext();

export function MoralisAPIProvider({ children }) {
  const mixpanel = useMoralisAPIProvider();
  return (
    <MoralisAPIContext.Provider value={mixpanel}>
      {children}
    </MoralisAPIContext.Provider>
  );
}

function useMoralisAPIProvider() {
  const [contractABI, setOceedeeContractABI] = useState(null); //Smart Contract ABI here
  const { Moralis, account, enableWeb3, isAuthenticated, chainId, isWeb3Enabled, isWeb3EnableLoading } = useMoralis();

  const {
    data: isActive,
    fetch: getIsActive,
    isLoading: isActiveLoading,
  } = useWeb3ExecuteFunction({
    abi: OCEEDEE_ABI,
    contractAddress: config[config.network].contract_oceedee,
    functionName: 'isActive'
  });

  const {
    data: isPreMintActive,
    fetch: getIsPreMintActive,
    isLoading: isPreMintActiveLoading,
  } = useWeb3ExecuteFunction({
    abi: OCEEDEE_ABI,
    contractAddress: config[config.network].contract_oceedee,
    functionName: 'isPreMintActive'
  });

  const {
    data: isWhitelisted,
    fetch: getIsWhitelisted,
    isLoading: isWhitelistedLoading,
  } = useWeb3ExecuteFunction({
    abi: OCEEDEE_ABI,
    contractAddress: config[config.network].contract_oceedee,
    functionName: 'isWhitelisted',
    params: {
      user: account
    }
  });

  const {
    data: maxPreMintPerAdd,
    fetch: getMaxPreMintPerAdd,
    isLoading: maxPreMintPerAddLoading,
  } = useWeb3ExecuteFunction({
    abi: OCEEDEE_ABI,
    contractAddress: config[config.network].contract_oceedee,
    functionName: 'MAX_PREMINT_PER_ADDRESS'
  });

  const {
    data: tokensOfOwner,
    isLoading: tokensOfOwnerLoading,
  } = useWeb3ExecuteFunction({
    abi: OCEEDEE_ABI,
    contractAddress: config[config.network].contract_oceedee,
    functionName: 'tokensOfOwner',
    params: {
      _owner: account
    }
  });

  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId');
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);



  useEffect(() => {
    setOceedeeContractABI(OCEEDEE_ABI);
  }, [isWeb3Enabled, chainId, account]);

  useEffect(() => {
    getIsActive();
    getIsPreMintActive();
    getIsWhitelisted();
    getMaxPreMintPerAdd();
  }, [isWeb3Enabled, chainId, account]);


  return {
    contractABI,
    owner: {
      tokensOfOwner,
      tokensOfOwnerLoading
    },
    premint: {
      isPreMintActive,
      isPreMintActiveLoading,
      maxPreMintPerAdd,
      maxPreMintPerAddLoading
    },
    mint: {
      isActive,
      isActiveLoading
    },
    whitelist: {
      isWhitelisted,
      isWhitelistedLoading
    }
  };
}

const useMoralisAPI = () => useContext(MoralisAPIContext);

export default useMoralisAPI;
