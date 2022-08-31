import { useEffect } from 'react'

import { CopyIcon, CheckIcon } from '@chakra-ui/icons';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  HStack,
  Link,
  useDisclosure
} from '@chakra-ui/react'

export default function PoolModal(props) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const poolObject = props.data[0]
  const poolId = props.data[1]

  useEffect(() => {
    const loadModal = () => {
      onOpen()
    }
    loadModal()
  }, [])

  const addressParser = (address) => {
    return (
      `${address.slice(0, 9)}...${address.slice(address.length - 9)}`
    )
  }

  return (
    <>
      {<Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(1.5px) hue-rotate(50deg)' />
        <ModalContent>
          <ModalHeader pt={4} fontWeight='normal' fontSize='2xl' color={poolObject.error ? 'red' : ''}>{poolObject.error ? "Error" : poolObject.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              {!poolId ?
                (<div>
                  <Text>Check that pool wallet is empty</Text>
                  <Text pb={6}>Check that signature wallet has $AR tokens on it</Text>
                  <Text fontSize='xs'>{poolObject.error}</Text>
                </div>)
                :
                (<VStack>
                  <HStack>
                    {poolId && <Text><Text as={'strong'}>Pool Id:</Text> {addressParser(poolId)}</Text>}
                    <button>
                      <CopyIcon onClick={() => navigator.clipboard.writeText(poolId)} />
                    </button>
                  </HStack>
                  <HStack>
                    {poolObject.wallet && <Text><Text as={'strong'}>Contract Owner:</Text> {addressParser(poolObject.wallet)}</Text>}
                    <button>
                      <CopyIcon onClick={() => navigator.clipboard.writeText(poolObject.owner)} />
                    </button>
                  </HStack>
                  {poolObject.operatorInfo && <Text><Text as={'strong'}>Owner Info:</Text> {poolObject.operatorInfo}</Text>}
                  {poolObject.website && <Text><Text as={'strong'}>Website:</Text> <Link href={poolObject.website}>{poolObject.website}</Link></Text>}
                  {poolObject.description && <Text><Text as={'strong'}>Use of Proceeds:</Text> {poolObject.description}</Text>}
                  {poolObject.rewards && <Text><Text as={'strong'}>Rewards:</Text> {poolObject.rewards}</Text>}
                  {!props.loading && (
                    <>
                      <CheckIcon color='green' boxSize={6} />
                      <Text fontSize='xs'>pool created</Text>
                    </>
                  )
                  }
                </VStack>
                )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      }
    </>
  )
}