import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall, useMoralis } from "react-moralis";
import config from "../config";

export const useNFTBalance = (options, isMalaMaal) => {
    const { account } = useMoralisWeb3Api();
    const { chainId } = useMoralis();
    const [NFTBalance, setNFTBalance] = useState([]);
    const {
        fetch: getNFTBalance,
        data,
        error,
        isLoading,
    } = useMoralisWeb3ApiCall(account.getNFTsForContract, { chain: chainId, ...options });


    useEffect(() => {
        if (data) {
            data.result.forEach((nft, i) => {
                if (nft.metadata) {
                    const metadata = JSON.parse(nft.metadata)
                    nft.name = metadata.name
                    if (metadata.image && metadata.image.length && metadata.image.includes('https://ipfs.io/ipfs')) {
                        nft.image = metadata.image
                    } else if (metadata.image && metadata.image.length && metadata.image.includes('ipfs://')) {
                        nft.image = `https://ipfs.io/ipfs/${(metadata.image).split('ipfs://')[1]}`
                    } else {
                        nft.image = metadata.image
                    }
                } else {
                    // delete data.result[i]
                }

            })

        }
    }, [data]);

    useEffect(() => {
        if (chainId) {
            getNFTBalance()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainId])

    return { getNFTBalance, NFTBalance, error, isLoading };
};
