import { useState } from 'react';
import Arfund, { createPool } from "arfunds";

import PoolModal from './PoolModal'
import {
  Tooltip,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  HStack,
  Button,
  Center,
  VStack,
  Text,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';


export default function PoolForm({ arweave }) {
  const poolObject = {}
  const [noWallet, setNoWallet] = useState(false)
  const [noDescription, setNoDescription] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const { onOpen } = useDisclosure()

  const handleChange = (e) => {
    poolObject[e.target.name] = e.target.value
  }

  const handlePoolCreate = async (e) => {
    e.preventDefault()

    const {
      title,
      description,
      website,
      wallet,
      operatorInfo,
      rewards
    } = poolObject;

    try {
      if (validateFormInput(wallet, description)) return
      setLoading(true)
      const txId = await createPool(arweave, title, description, "use_wallet", wallet, website, operatorInfo, rewards);

      const fund = new Arfund(txId, arweave, true);
      if (fund && fund.poolId) {
        setData([poolObject, fund.poolId])
        setLoading(false)
        onOpen()
      }
    } catch (error) {
      console.log(error)
      setData({ error: error.message })
      onOpen()
    }
  }

  const validateFormInput = (wallet, description) => {
    let anyInvalid = false
    if (wallet === undefined) {
      setNoWallet(true);
      anyInvalid = true
    }
    if (description === undefined) {
      setNoDescription(true)
      anyInvalid = true
    }
    return anyInvalid
  }

  return (
    <>
      <Center maxH={'75vh'} pt={28}>
        {loading ?
          <Center h={'410px'}>
            <VStack>
              <Spinner size='xl' color='blue.400' />
            </VStack>
          </Center>
          :
          <>
            <VStack px={16}>
              <FormControl>
                <FormLabel fontSize='xl'>Pool Title</FormLabel>
                <Input type='text' name='title' borderColor='black' onChange={(e) => handleChange(e)} />
              </FormControl>
              <FormControl isInvalid={noDescription}>
                <HStack>
                  <FormLabel fontSize='xl' pt={1.5}>Description</FormLabel>
                  <Tooltip
                    label={<DescriptionLabel />}
                    fontSize='md'
                  >
                    <QuestionOutlineIcon color='blue' />
                  </Tooltip>
                </HStack>
                <Textarea name='description' borderColor='black' onChange={(e) => handleChange(e)} w='30rem' h='27vh' />
                {noDescription && <FormErrorMessage>Description is required.</FormErrorMessage>}
              </FormControl>
            </VStack>
            <VStack px={16} w={'xl'}>
              <FormControl>
                <FormLabel fontSize='xl'>Website</FormLabel>
                <Input type='text' borderColor='black' name='website' onChange={(e) => handleChange(e)} />
              </FormControl>
              <FormControl isInvalid={noWallet} id='wallet'>
                <HStack>
                  <FormLabel fontSize='xl' pt={1.5}>Wallet</FormLabel>
                  <Tooltip
                    label={<WalletLabel />}
                  >
                    <QuestionOutlineIcon color='blue' />
                  </Tooltip>
                </HStack>
                <Input type='text' borderColor='black' name='wallet' onChange={(e) => handleChange(e)} />
                {noWallet && <FormErrorMessage>Arwallet address is required.</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xl'>Operator Info</FormLabel>
                <Input type='text' borderColor='black' name='operatorInfo' onChange={(e) => handleChange(e)} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xl'>Rewards</FormLabel>
                <Input type='text' borderColor='black' name='rewards' onChange={(e) => handleChange(e)} />
              </FormControl>
            </VStack>
          </>
        }
      </Center>
      <VStack px={12}>
        <Button mt={8} onClick={(e) => handlePoolCreate(e)} px={8} mx={12} size='auto' fontSize='3rem' bg='#A0CDF6' border='1.5px solid' borderColor='black' _hover={{ bg: '#94bce0' }}>
          <Text as="h2" fontWeight="lighter">{loading ? "Creating...." : "Create Pool"}</Text>
        </Button>
      </VStack>
      {/* This needs to be replaced with REAL value. This is currently first index of ALL contracts */}
      {data && <PoolModal data={data} loading={loading} />}
    </>
  )
}

const DescriptionLabel = () => {
  return (
    <div>
      <Text fontSize='xs'>• Add detailed description of pool</Text>
      <Text fontSize='xs'>• Add incentive structure for contributors</Text>
    </div >
  )
}

const WalletLabel = () => {
  return (
    <div>
      <Text fontSize='xs'>• To instantiate a pool, you must have Arconnect with two web wallet addresses.</Text>
      <Text fontSize='xs'>• Paste the address with 0 funds on it into this field.</Text>
    </div >
  )
}