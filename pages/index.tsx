import type { NextPage } from 'next'
import Arweave from 'arweave';

import PoolForm from '../components/PoolForm'
import { Image, Center, Text, Box, Stack, Switch, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
// import Image from 'next/image'

const Home: NextPage = () => {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });

  return (
    <Box pt={6}>
      <Image style={{ position: 'fixed', bottom: '10px' }} width='6rem' height='6rem' src='https://arweave.net/JBDB4gRkUFhf-l_1FctwKkyB79xp6fBKxIm1uhV-vqo' />
      <>
        <PoolForm arweave={arweave} />
        <Center>
          <Text fontSize='xs'>You can get an ArConnect wallet from <Link href='https://www.arconnect.io/' isExternal>here <ExternalLinkIcon /></Link></Text>
        </Center>
      </>
      <Center position='fixed' bottom='0' left='0' w='100%'>
        <footer>Heroes of History - 2022</footer>
      </Center>
    </Box>
  )
}

export default Home
