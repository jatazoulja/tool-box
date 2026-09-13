import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react';
import { LocationsProvider, useLocations } from './stores/LocationsContext';
import { LocationCard } from './components/LocationCard';

const SamplePageContent: React.FC = () => {
  const { state, fetchLocations } = useLocations();

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return (
    <Container maxW="5xl" py={10}>
      <VStack align="stretch" gap={8}>
        <HStack justify="space-between" align="center" wrap="wrap" gap={4}>
          <Box>
            <Heading size="2xl" letterSpacing="tight" color="fg">
              Locations Overview
            </Heading>
            <Text color="fg.muted" mt={1}>
              Manage, monitor, and configure registered facility locations.
            </Text>
          </Box>
          <Button
            colorPalette="blue"
            loading={state.loading}
            onClick={() => fetchLocations()}
          >
            Refresh Data
          </Button>
        </HStack>

        {state.loading && (
          <HStack justify="center" py={16}>
            <Spinner size="xl" color="blue.500" />
          </HStack>
        )}

        {state.error && (
          <Box
            p={4}
            bg="red.50"
            color="red.700"
            borderWidth="1px"
            borderColor="red.200"
            rounded="md"
          >
            <Text fontWeight="semibold">Error loading locations:</Text>
            <Text fontSize="sm">{state.error}</Text>
          </Box>
        )}

        {!state.loading && !state.error && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
            {state.locations.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export const SamplePage: React.FC = () => {
  return (
    <LocationsProvider>
      <SamplePageContent />
    </LocationsProvider>
  );
};

export default SamplePage;
