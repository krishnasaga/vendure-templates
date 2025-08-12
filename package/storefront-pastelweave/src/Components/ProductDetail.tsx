import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../graphql/queries.js';
import { Box, Heading, Text, Spinner, Image, Grid, VStack, Button, HStack } from '@chakra-ui/react';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
    skip: !id
  });

  if (loading) return (
    <Box display="flex" justifyContent="center" p={8}>
      <Spinner size="xl" />
    </Box>
  );
  
  if (error) return (
    <Box p={8} textAlign="center">
      <Heading size="md" color="red.500">Error</Heading>
      <Text mt={2}>{error.message}</Text>
    </Box>
  );
  
  if (!data || !data.product) return (
    <Box p={8} textAlign="center">
      <Heading size="md">Product not found</Heading>
    </Box>
  );

  const product = data.product;
  
  return (
    <Box p={4}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
        <Box>
          {product.featuredAsset ? (
            <Image 
              src={product.featuredAsset.preview} 
              alt={product.name} 
              borderRadius="md"
              w="100%"
            />
          ) : (
            <Box bg="gray.200" h="300px" borderRadius="md" />
          )}
          
          {/* Add product image gallery if available */}
          {product.assets && product.assets.length > 1 && (
            <Grid templateColumns="repeat(4, 1fr)" gap={2} mt={4}>
              {product.assets.slice(0, 4).map((asset: any, index: number) => (
                <Image 
                  key={index}
                  src={asset.preview}
                  alt={`${product.name} - image ${index + 1}`}
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                />
              ))}
            </Grid>
          )}
        </Box>
        
        <VStack align="start" spacing={4}>
          <Heading>{product.name}</Heading>
          <Text>{product.description}</Text>
          
          <Box w="100%" borderTop="1px" borderColor="gray.200" pt={4} mt={4}>
            <Heading size="md" mb={2}>Available Variants</Heading>
            {product.variants.map((variant: any) => (
              <Box 
                key={variant.id}
                p={3} 
                borderWidth="1px" 
                borderRadius="md"
                mb={2}
              >
                <Text fontWeight="bold">{variant.name}</Text>
                <HStack justifyContent="space-between" mt={2}>
                  <Text>${(variant.price / 100).toFixed(2)}</Text>
                  <HStack>
                    <Text color={variant.stockLevel > 0 ? "green.500" : "red.500"}>
                      {variant.stockLevel > 0 ? "In Stock" : "Out of Stock"}
                    </Text>
                    <Button 
                      size="sm" 
                      colorScheme="blue"
                      isDisabled={variant.stockLevel <= 0}
                    >
                      Add to Cart
                    </Button>
                  </HStack>
                </HStack>
              </Box>
            ))}
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}
