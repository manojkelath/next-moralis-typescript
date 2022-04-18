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
  const { isAuthenticated } = useMoralis();
  const { mintStatus, whitelist } = useMoralisAPI();
  const [isMintActive, setIsMintActive] = useState(false);
  const [isPreMintActive, setIsPreMintMintActive] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  useEffect(() => {
    if (!mintStatus.isActiveLoading) {
      setIsMintActive(mintStatus.isActive);
    }
    if (!mintStatus.isPreMintActiveLoading) {
      setIsPreMintMintActive(mintStatus.isPreMintActive);
    }
  }, [mintStatus.isActive, mintStatus.isPreMintActive]);

  useEffect(() => {
    if (!whitelist.isWhitelistedLoading) {
      setIsWhitelisted(whitelist.isWhitelisted);
    }
  }, [whitelist.isWhitelisted]);

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          {
            isAuthenticated && isMintActive && !isPreMintActive &&
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
                  <option value='option1'>1</option>
                  <option value='option2'>2</option>
                  <option value='option3'>3</option>
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
            isAuthenticated && isPreMintActive && isWhitelisted &&
            <>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}>
                  Congratulations!
                </Text>
                <br />{' '}
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={'blue.400'} as={'span'}>
                  You are whitelisted for the premium mint.
                </Text>{' '}
              </Heading>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Select placeholder='Select Quantity'>
                  <option value='option1'>1</option>
                  <option value='option2'>2</option>
                  <option value='option3'>3</option>
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