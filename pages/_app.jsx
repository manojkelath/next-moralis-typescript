import { ChakraProvider } from '@chakra-ui/react'
import { MoralisProvider } from 'react-moralis'

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <Component {...pageProps} />
      </MoralisProvider>

    </ChakraProvider>
  )
}

export default MyApp
