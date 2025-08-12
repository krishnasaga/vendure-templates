import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client.js';

// Pages
import Home from './Pages/Home';
import ProductPage from './Pages/ProductPage';
import CollectionPage from './Pages/Collections';
import { ProductDetail } from './Components/ProductDetail';
import { ProductList } from './Components/ProductList.js';
import { NotFound } from './Components/NotFound.js';

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            {/* <Route path="/collections" element={<CollectionPage />} /> */}
            {/* <Route path="/dummy" element={<ProductDetail />} /> */}
            <Route path="/collections" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
