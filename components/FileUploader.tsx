
// import { promises as fsPromises } from 'node:fs';

// import { createWriteStream } from "fs"
import { useState, useEffect } from 'react'
import Arfund from "arfunds";
import {
  Center, VStack, Text, FormLabel,
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
  let formData = new FormData();
  const [readArr, setReadArr] = useState<any[]>([])
  const handleFiles = async (e: any) => {
    e.preventDefault()
    const files = e.target[0].files
    try {
      Array.from(files).map((file: any, i: number) => {
        console.log("appending:", file)
        formData.append('file', file)
      })
      console.log(files)
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   if (reader.result) {
      //     setReadArr(oldState => [...oldState, Buffer.from(reader.result as string)])
      //   }
      // };
      // reader.readAsArrayBuffer(file);
      // const objectUrl = URL.createObjectURL(file)

      // const mobj = tweet.extended_entities.media[i]
      // const url = mobj.media_url
      // if ((mobj.type === "video" || mobj.type === "animated_gif") && mobj ?.video_info ?.variants) {
      //   const variants = mobj ?.video_info ?.variants.sort((a, b) => ((a.bitrate ?? 1000) > (b.bitrate ?? 1000) ? -1 : 1))
      //                 await processMediaURL(variants[0].url, mediaDir, i)
      // } else {
      //   await processMediaURL(url, mediaDir, i)
      // }
      // }
    } catch (error) {
      console.log(error)
    }

    handleArchive()
  }
  const handleArchive = async () => {
    await fetch('/api/hello', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "content-type": "multipart/form-data"
      },
      body: JSON.stringify(formData)
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
            <form onSubmit={handleFiles}>
              <input type='file' name='file' multiple />
              <Button size='sm' w='10vw' fontSize='md' type='submit' bg='#A0CDF6' ml={4} border={'1.5px solid'} borderColor='black' _hover={{ bg: '#eee', borderColor: 'gray.300', border: '1.5px solid' }}>Archive</Button>
            </form>
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