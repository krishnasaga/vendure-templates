import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { Routes } from './Routes';

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
