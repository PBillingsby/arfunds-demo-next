import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box bg='#A0CDF6' h='100vh'>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>

  )
}

export default MyApp
