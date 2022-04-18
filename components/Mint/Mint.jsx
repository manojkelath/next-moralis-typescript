import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Select
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import useMoralisAPI from '../../hooks/useMoralisAPI';
import Account from '../Account/Account';

export default function SplitScreen() {
  const { isAuthenticated, Moralis } = useMoralis();
  const { mint, premint, whitelist, user } = useMoralisAPI();
  const [isMintActive, setIsMintActive] = useState(false);
  const [isPreMintActive, setIsPreMintMintActive] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [maxPremintPerAdd, setMaxPremintPerAdd] = useState(0);
  const [optionsMaxPremint, setOptionMaxPremint] = useState([]);
  const [optionsMaxMint, setOptionMaxMint] = useState([]);
  const [maxMintPerAdd, setMaxMintPerAdd] = useState(0);
  const [isPresaleMaxed, setPresaleMaxed] = useState([]);

  useEffect(() => {
    if (!mint.isActiveLoading) {
      setIsMintActive(mint.isActive);
    }
    if (!premint.isPreMintActiveLoading) {
      setIsPreMintMintActive(premint.isPreMintActive);
    }
    if (!premint.maxPreMintPerAddLoading && premint.maxPreMintPerAdd) {
      const max = Moralis.Units.FromWei(premint.maxPreMintPerAdd, 0);
      setMaxPremintPerAdd(Number(max));
      getOptionsForPremint(Number(max));
    }
    if (!mint.maxMintPerAddLoading && mint.maxMintPerAdd) {
      const max = Moralis.Units.FromWei(mint.maxMintPerAdd, 0);
      setMaxMintPerAdd(Number(max));
      getOptionsForMint(Number(max));
    }
  }, [mint.isActive, premint.isPreMintActive, mint.maxMintPerAdd, premint.maxPremintPerAdd]);

  useEffect(() => {
    if (!whitelist.isWhitelistedLoading) {
      setIsWhitelisted(whitelist.isWhitelisted);
    }
  }, [whitelist.isWhitelisted]);

  useEffect(() => {
    if (user.tokenIds) {
      let maxAvailableMinting = maxMintPerAdd - user.tokenIds.length;
      let maxAvailablePreMinting = maxPremintPerAdd - user.tokenIds.length;
      getOptionsForMint(maxAvailableMinting);
      getOptionsForPremint(maxAvailablePreMinting);
      if (maxAvailablePreMinting == 0) {
        setPresaleMaxed(true);
      }
    }
  }, [user, maxMintPerAdd, maxPremintPerAdd]);

  const getOptionsForPremint = (max) => {
    let options = [];
    for (let i = 0; i < max; i++) {
      options.push(i + 1);
    }
    setOptionMaxPremint(options);
  }

  const getOptionsForMint = (max) => {
    let options = [];
    for (let i = 0; i < max; i++) {
      options.push(i + 1);
    }
    setOptionMaxMint(options);
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          {
            isAuthenticated && isMintActive &&
            <>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}>
                  Mint
                </Text>
                <br />{' '}
                <Text color={'blue.400'} as={'span'}>
                  OCEEDEE Genesis NFT
                </Text>{' '}
              </Heading>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                Get special access to India's premium shoe collection!
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Select placeholder='Select Quantity'>
                  {optionsMaxMint.map((val, i) => {
                    return <option value={i + 1} key={i}>{val}</option>
                  })}
                </Select>
                <Button
                  borderRadius='0px'
                  color={'#fff'}
                  padding={'18px'}
                  fontFamily={'serif'}
                  backgroundColor={'#252a2b'}
                >
                  Mint
                </Button>
              </Stack>
            </>
          }
          {
            isAuthenticated && !isMintActive && isPreMintActive && isWhitelisted && !isPresaleMaxed &&
            <>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}>
                  Congratulations!
                </Text>
                <br /><br />{' '}
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={'blue.400'}>
                  You are whitelisted for the presale and are eligible to mint {maxPremintPerAdd} NFTs.
                </Text>{' '}
              </Heading>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Select placeholder='Select Quantity'>
                  {optionsMaxPremint.map((val, i) => {
                    return <option value={i + 1} key={i}>{val}</option>
                  })}
                </Select>
                <Button
                  borderRadius='0px'
                  color={'#fff'}
                  padding={'18px'}
                  fontFamily={'serif'}
                  backgroundColor={'#252a2b'}
                >
                  Mint
                </Button>
              </Stack>
            </>
          }
          {
            isAuthenticated && !isMintActive && isPreMintActive && isWhitelisted && isPresaleMaxed &&
            <>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}>
                  Congratulations!
                </Text>
                <br /><br />{' '}
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={'blue.400'}>
                  You are claimed all your presale NFTs. Please wait for the public sale.
                </Text>{' '}
              </Heading>
            </>
          }
          {
            isAuthenticated && isPreMintActive && !isWhitelisted &&
            <>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}>
                  Sorry!
                </Text>
                <br />{' '}
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={'blue.400'} as={'span'}>
                  You are not whitelisted for the presale.
                </Text>{' '}
              </Heading>
            </>
          }
          {
            isAuthenticated && !isMintActive && !isPreMintActive &&
            <>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}>
                  Oops...
                </Text>
                <br />{' '}
                <Text color={'blue.400'} as={'span'}>
                  Minting is not active!
                </Text>{' '}
              </Heading>
            </>
          }
          {
            !isAuthenticated &&
            <>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}>
                  Connect your wallet
                </Text>
                <br />{' '}
                <Text color={'blue.400'} as={'span'}>
                  And start minting OCEEDEE Genesis NFT
                </Text>{' '}
              </Heading>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                Get special access to India's premium shoe collection!
              </Text>
              <Account></Account>
            </>
          }
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          clipPath={'polygon(25% 0, 100% 0, 100% 100%, 0 100%)'}
          objectFit={'cover'}
          src={
            'https://cdn.shopify.com/s/files/1/0095/8500/0511/articles/custom_resized_cbd45258-7f24-4735-809e-6b16d7f0b576_960x1080_crop_center.jpg?v=1642583480'
          }
        />
      </Flex>
    </Stack>
  );
}