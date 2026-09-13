import React from 'react';
import { Container, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { LocationsProvider, useLocations } from './stores/LocationsContext';

const SampleSubPageContent: React.FC = () => {
  const { state } = useLocations();
  const navigate = useNavigate();

  return (
    <Container maxW="4xl" py={8}>
      <VStack align="start" gap={4}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/sample-page')}
        >
          ← Back to Locations
        </Button>
        <Heading size="xl">Sample Sub-Page</Heading>
        <Text color="fg.muted">
          This sub-page demonstrates a nested fractal screen mapped to{' '}
          <Text as="span" fontWeight="bold">
            /sample-page/sample-subpage
          </Text>
          .
        </Text>
        <Text fontSize="sm" color="fg.subtle">
          Currently tracking {state.locations.length} locations in context.
        </Text>
      </VStack>
    </Container>
  );
};

export const SampleSubPage: React.FC = () => {
  return (
    <LocationsProvider>
      <SampleSubPageContent />
    </LocationsProvider>
  );
};

export default SampleSubPage;
