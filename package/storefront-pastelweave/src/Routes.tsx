import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import { ProductList } from './Components/ProductList.js';
import { ProductDetail } from './Components/ProductDetail.js';
import { NotFound } from './Components/NotFound.js';

export function Routes() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <RouterRoutes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </RouterRoutes>
      </Container>
    </Box>
  );
}
