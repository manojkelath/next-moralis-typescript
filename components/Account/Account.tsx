import { useMoralis, useChain } from 'react-moralis';
import { useTranslation } from 'react-i18next';
import { getEllipsisTxt } from '../helpers/formatters';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import Address from '../Address/Address';
import { getExplorer } from '../helpers/networks';
import { connectors } from './config';

function Account() {
  const { authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis();
  const { switchNetwork } = useChain();

  const { t } = useTranslation();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()


  if (!isAuthenticated || !account) {
    return (
      <div className="connect-wal">
        <a>
          <Button onClick={onOpen}>{'Connect Wallet'}</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {connectors.map(({ title, icon, connectorId }, key) => (
                    <div
                      key={key}
                      onClick={async () => {
                        try {
                          await authenticate({ signingMessage: "CSSC Autentication" });
                          window.localStorage.setItem('connectorId', connectorId);
                          setIsAuthModalVisible(false);
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                    >
                      <img src={icon} alt={title} />
                      <Text style={{ fontSize: '14px' }}>{title}</Text>
                    </div>
                  ))}
                </div>
              </ModalBody>


            </ModalContent>
          </Modal>
        </a>
      </div>
    );
  }



}

export default Account;
