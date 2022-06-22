
// import { promises as fsPromises } from 'node:fs';

// import { createWriteStream } from "fs"
import { useState, useEffect } from 'react'
import Arfund from "arfunds";
import {
  Input, Center, VStack, Text, FormLabel,
  Button
} from '@chakra-ui/react'

export default function FileUploader({ arweave }: any) {
  const os = require('os');
  os.tmpDir = os.tmpdir;

  const [mintContract, setMintContract] = useState<string>('')
  const mint = async () => {
    try {
      const fund = new Arfund(mintContract || "", arweave, true);
      const fundState = await fund.getState();

      const tags = await fund.getNftTags(fundState.title, fund.poolId, false);
    } catch (error) {
      console.log(error)
    }
  }

  // const checkPath = async (path) => { return fsPromises.stat(path).then(_ => true).catch(_ => false) }
  const [readArr, setReadArr] = useState<any[]>([])
  const handleFiles = async (e: any) => {
    const files = Array.from(e.target.files)
    try {
      files.map((file: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setReadArr(oldState => [...oldState, Buffer.from(reader.result as string)])
          }
        };
        reader.readAsArrayBuffer(file);
        const objectUrl = URL.createObjectURL(file)

        // const mobj = tweet.extended_entities.media[i]
        // const url = mobj.media_url
        // if ((mobj.type === "video" || mobj.type === "animated_gif") && mobj ?.video_info ?.variants) {
        //   const variants = mobj ?.video_info ?.variants.sort((a, b) => ((a.bitrate ?? 1000) > (b.bitrate ?? 1000) ? -1 : 1))
        //                 await processMediaURL(variants[0].url, mediaDir, i)
        // } else {
        //   await processMediaURL(url, mediaDir, i)
        // }
      })

    } catch (error) {
      console.log(error)
    }
  }
  const handleArchive = async () => {
    console.log(readArr)
    await fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify(readArr)
    }).then(obj => {
      console.log(obj)
    });
  }
  return (
    <Center>
      <VStack pt={4}>
        <FormLabel fontSize='4xl'>Archive</FormLabel>
        <VStack border='1px solid black' borderRadius='md' p={4}>
          <Center>
            <Input type='file' name='file' multiple onChange={(e) => handleFiles(e)} />
            <Button size='sm' w='10vw' fontSize='md' onClick={handleArchive} bg='#A0CDF6' ml={4} border={'1.5px solid'} borderColor='black' _hover={{ bg: '#eee', borderColor: 'gray.300', border: '1.5px solid' }}>Archive</Button>
          </Center>
        </VStack>
        <FormLabel fontSize='4xl'>Mint</FormLabel>
        <VStack border='1px solid black' borderRadius='md' p={4}>
          <Text fontWeight='semibold' fontSize='sm' px={4}>Pool creators can mint their rewards to a random contributor</Text>
          <FormLabel>Artifact ID</FormLabel>
          {/* <Input onChange={(e: string) => setMintContract(e.target.value)} border={'1.5px solid'} borderColor='black' size='sm' w={80} type='text' /> */}
          <Button size='sm' w='10vw' fontSize='md' onClick={mint} bg='#A0CDF6' ml={4} border={'1.5px solid'} borderColor='black' _hover={{ bg: '#eee', borderColor: 'gray.300', border: '1.5px solid' }}>Mint</Button>
        </VStack>
      </VStack>
    </Center>
  )
}