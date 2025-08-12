import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <Box textAlign="center" py={10}>
      <Heading as="h1" size="2xl" mb={4}>
        404
      </Heading>
      <Text fontSize="xl" mb={8}>
        Page not found
      </Text>
      <Button as={Link} to="/" colorScheme="blue">
        Go to Home
      </Button>
    </Box>
  );
}
