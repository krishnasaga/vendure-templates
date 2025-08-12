import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries.js.js';
import {
  Box,
  Grid,
  Text,
  Image,
  VStack,
  Heading,
  Spinner,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const toast = useToast();

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    },
    onError: (error) => {
      toast({
        title: 'Error loading products',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Calculate total pages
  const totalItems = data?.products?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Show up to 5 page numbers

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={8}>
        <Spinner size="xl" />
      </Box>
    );

  if (error)
    return (
      <Box p={8} textAlign="center">
        <Heading size="md" color="red.500">
          Error
        </Heading>
        <Text mt={2}>{error.message}</Text>
      </Box>
    );

  return (
    <Box p={4}>
      <Heading mb={6}>Our Products</Heading>

      {/* Show total items count and current page */}
      <Text mb={4}>
        Showing{' '}
        {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{' '}
        products
      </Text>

      {data?.products?.items?.length === 0 ? (
        <Text textAlign="center" p={8}>
          No products found
        </Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {data?.products?.items?.map((product: any) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <VStack
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                spacing={3}
                align="stretch"
                _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                bg="white"
                h="100%"
              >
                {product.featuredAsset ? (
                  <Image
                    src={product.featuredAsset.preview}
                    alt={product.name}
                    height="200px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                ) : (
                  <Box bg="gray.200" h="200px" borderRadius="md" />
                )}
                <Heading size="md" noOfLines={2}>
                  {product.name}
                </Heading>
                <Text fontSize="sm" color="gray.600" noOfLines={2}>
                  {product.description || 'No description available'}
                </Text>
                <Text fontWeight="bold" mt="auto">
                  {product.variants && product.variants[0]
                    ? `$${(product.variants[0].price / 100).toFixed(2)}`
                    : 'Price not available'}
                </Text>
              </VStack>
            </Link>
          ))}
        </Grid>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <HStack spacing={2} justifyContent="center" mt={8}>
          <Button
            onClick={handlePrevPage}
            isDisabled={currentPage === 1}
            size="sm"
          >
            Previous
          </Button>

          {getPageNumbers().map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              colorScheme={
                currentPage === pageNumber ? 'blue' : 'gray'
              }
              variant={
                currentPage === pageNumber ? 'solid' : 'outline'
              }
              size="sm"
            >
              {pageNumber}
            </Button>
          ))}

          <Button
            onClick={handleNextPage}
            isDisabled={currentPage === totalPages}
            size="sm"
          >
            Next
          </Button>
        </HStack>
      )}
    </Box>
  );
}
