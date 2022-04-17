import React, { createContext, useContext, useEffect, useState } from 'react';
import OCEEDEE_ABI from '../abi/abi_oceedee.json';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import config from '../config/config';
import { useNFTBalance } from './useNftBalance';

const MoralisAPIContext = createContext();

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
  const [tokenIdOptions, setTokenIdOptions] = useState(null);
  const [tokenIds, setTokenIds] = useState(0);
  const { Moralis, account, enableWeb3, isAuthenticated, chainId, isWeb3Enabled, isWeb3EnableLoading } = useMoralis();
  const { NFTBalance, isLoading, getNFTBalance: getNFTBalance } = useNFTBalance({ token_address: config[config.network].contract_oceedee, address: account }, true);

  const [isApproved, setIsApproved] = useState(false);


  const {
    data: succMaalBal,
    error: errMaalBal,
    fetch: getMaalBalance,
    isFetching: isFetchingMaalBal,
    isLoading: isLoadMaalBal,
  } = useWeb3ExecuteFunction({
    abi: maalContractABI,
    contractAddress: config[config.network].contract_maal,
    functionName: 'balanceOf',
    params: {
      account: account,
    },
  });


  // cSSC
  const {
    data: isMintWithTknActive,
    error: errIsMintWithTknActive,
    fetch: checkIfMintWithTknActive,
    isFetching: fetchingIsMintWithTknActive,
    isLoading: loadingIsMintWithTknActive,
  } = useWeb3ExecuteFunction({
    abi: contractABI,
    contractAddress: config[config.network].contract_css,
    functionName: 'isMintWithTknActive'
  });





  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId');
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(() => {
    if (chainId) {
      setIsBinanceNetwork(chainId === config[config.network].chainId);
      setIsEthNetwork(chainId === config[config.network].chainIdEth);
    }
  }, [chainId]);

  useEffect(() => {
    setOceedeeContractABI(CSS_ABI);
  }, [isWeb3Enabled, chainId, account]);


  useEffect(() => {
    getTokensOfOwner();
  }, [account]);

  useEffect(() => {
    if (successTokensOfOwner) {
      let options = [];
      let tokenIds = [];
      successTokensOfOwner.forEach((bigNumber) => {
        const tokenId = Moralis.Units.FromWei(bigNumber, 0);
        options.push({
          value: tokenId,
          label: tokenId,
        });
        tokenIds.push(tokenId);
      });
      setTokenIds(tokenIds);
      setTokenIdOptions(options);
    }
  }, [successTokensOfOwner]);

  return {
    contractABI,
    balanceOf: {
      data: succMaalBal,
      error: errMaalBal,
      isLoading: isLoadMaalBal,
      isFetching: isFetchingMaalBal,
    },
    getTokensOfOwner
   
  };
}

const useMoralisAPI = () => useContext(MoralisAPIContext);

export default useMoralisAPI;
