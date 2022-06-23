import type { NextPage } from 'next'

import { useState } from 'react';
import Arweave from 'arweave';

import PoolForm from '../components/PoolForm'
import FileUploader from '../components/FileUploader';
import { Image, Center, Text, Box, Stack, Switch, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
// import Image from 'next/image'

const Home: NextPage = () => {
  const [isArchive, setIsArchive] = useState(false)

  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });

  return (
    <Box pt={6}>
      <Center>
        <Stack direction='row' p={2}>
          <Text fontSize='2xl'>Create Pool</Text>
          <Switch size='lg' onChange={() => setIsArchive(!isArchive)} />
          <Text fontSize='2xl'>Archive and Mint</Text>
        </Stack>
      </Center>
      <Image style={{ position: 'fixed', bottom: '10px' }} width='6rem' height='6rem' src='https://arweave.net/JBDB4gRkUFhf-l_1FctwKkyB79xp6fBKxIm1uhV-vqo' />
      {isArchive ?
        <FileUploader arweave={arweave} />
        :
        <>
          <PoolForm arweave={arweave} />
          <Center>
            <Text fontSize='xs'>You can get an ArConnect wallet from <Link href='https://www.arconnect.io/' isExternal>here <ExternalLinkIcon /></Link></Text>
          </Center>
        </>
      }
      <Center bg='#eee' position='fixed' bottom='0' left='0' w='100%'>
        <footer>Heroes of History - 2022</footer>
      </Center>
    </Box>
  )
}

export default Home
