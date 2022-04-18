import { useMoralis, useChain } from 'react-moralis';
import { useTranslation } from 'react-i18next';
import { getEllipsisTxt } from '../Helpers/formatters';
import { Box, Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import Address from '../Address/Address';
import { getExplorer } from '../Helpers/networks';
import { connectors } from './config';
import Blockie from '../Blockie/Blockie';


function Account() {
  const { authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis();
  const { switchNetwork } = useChain();

  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure()


  if (!isAuthenticated || !account) {
    return (
      <div className="connect-wal">
        <a>
          <Button
            onClick={onOpen}
            borderRadius='0px'
            color={'#fff'}
            padding={'25px'}
            fontFamily={'serif'}
            backgroundColor={'#252a2b'}
          >{'Connect Wallet'}
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>Connect Wallet</ModalHeader>
              <ModalBody>
                <Stack direction='row'>
                  {connectors.map(({ title, icon, connectorId }, key) => (
                    <Box
                      key={key}
                      onClick={async () => {
                        try {
                          await authenticate({ signingMessage: "CSSC Autentication", provider: connectorId }); // TODO: mention type
                          window.localStorage.setItem('connectorId', connectorId);
                          await onClose();

                          // setIsAuthModalVisible(false);
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                    >
                      <Image boxSize='50px'
                        objectFit='cover'
                        src={icon} alt={title} />
                      <Text style={{ fontSize: '14px' }}>{title}</Text>
                    </Box>
                  ))}
                </Stack>

              </ModalBody>


            </ModalContent>
          </Modal>
        </a>
      </div>
    );
  } else {

    return (
      <div className="connect-wal" style={{ marginTop: "2px", marginLeft: "10px" }}>
        <Button
          fontFamily={'Futura Lt BT'}
          borderRadius='0px'
          color={'#fff'}
          padding={'25px'}
          backgroundColor={'#252a2b'}
          onClick={onOpen} >
          <Blockie currentWallet scale={2} />
          <span style={{ padding: '8px' }}>{getEllipsisTxt(account, 6)}</span>
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              {t('account')}
              <Box>
                <Address
                  avatar="left"
                  size={6}
                  copyable
                  style={{ fontSize: '20px' }}
                />
                <div style={{ marginTop: '10px', padding: '0 10px' }}>
                  <a
                    href={`${getExplorer(chainId)}/address/${account}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('view_on_explorer')}
                  </a>
                </div>
              </Box>
              <Button
                onClick={async () => {
                  await onClose();
                  await logout();
                  window.localStorage.removeItem('connectorId');
                }}
              >
                {t('disconnect_wallet')}
              </Button>

            </ModalBody>


          </ModalContent>
        </Modal>
      </div >
    );
  }




}

export default Account;
