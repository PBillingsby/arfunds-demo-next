import { useState, useEffect } from 'react'

import Arfund from "arfunds";
import Arweave from 'arweave';

import { Center, VStack, Text, FormLabel, Button, Input } from '@chakra-ui/react'
import { WebBundlr } from '@bundlr-network/client'
import { providers } from 'ethers'


export default function FileUploader({ arweave }: any) {
  const os = require('os');
  os.tmpDir = os.tmpdir;

  const [mintContract, setMintContract] = useState<string>('')
  const initializeBundlr = async () => {
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
      timeout: 20000,
      logging: false,
    });
    // const bundlr = new WebBundlr('https://node1.bundlr.network', 'arweave', provider)
    // await bundlr.ready()
    // console.log(bundlr)
    // setBundlrInst(bundlr);
  }
  const mint = async () => {
    const walletAddress = await arweave.wallets.jwkToAddress("use_wallet")
    try {
      const fund = new Arfund(mintContract || "", arweave, true);
      const fundState = await fund.getState();

      if (fundState.owner === walletAddress) {
        // add mint either in this file or api file
        // const tags = await fund.getNftTags(fundState.title, fund.poolId, false);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Center>
      <VStack pt={4}>
        <FormLabel fontSize='4xl'>Archive</FormLabel>
        <VStack border='1px solid black' borderRadius='md' p={4}>
          <Center>
            <form action="/api/hello" encType="multipart/form-data" method="post">
              <input type='file' name='file' multiple />
              <Button boxShadow='md' fontSize='xl' size='xl' w='10vw' fontSize='md' type='submit' bg='#A0CDF6' ml={4} border={'1.5px solid'} borderColor='black' _hover={{ bg: '#eee', borderColor: 'gray.300', border: '1.5px solid' }}>Archive</Button>
            </form>
          </Center>
        </VStack>
        <FormLabel fontSize='4xl'>Mint</FormLabel> */}
        <VStack border='1px solid black' borderRadius='md' p={4}>
          <Text fontWeight='semibold' fontSize='sm' px={4}>Pool creators can mint their rewards to a random contributor</Text>
          <FormLabel>Artifact ID</FormLabel>
          <Input onChange={(e: string) => setMintContract(e.target.value)} border={'1.5px solid'} borderColor='black' size='sm' w={80} type='text' /> */}
          <Button boxShadow='md' size='sm' w='10vw' fontSize='md' onClick={mint} bg='#A0CDF6' ml={4} border={'1.5px solid'} borderColor='black' _hover={{ bg: '#eee', borderColor: 'gray.300', border: '1.5px solid' }}>Mint</Button> */}
        </VStack>
        <Button size='lg' boxShadow='md' bg='#A0CDF6' borderColor='black' border='1px solid black' onClick={() => initializeBundlr()}>
          <VStack>
            <Text fontSize='md'>Initialize</Text>
            <Text fontSize='md'>Bundlr</Text>
          </VStack>
        </Button>
      </VStack>
    </Center >
  )
}