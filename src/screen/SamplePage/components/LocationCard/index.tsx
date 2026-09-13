import React from 'react';
import { Box, HStack, VStack, Text, Heading, Badge } from '@chakra-ui/react';
import type { LocationDTO } from '../../dto/LocationsDTO';

export interface LocationCardProps {
  location: LocationDTO;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const isOnline = location.status === 'active';

  return (
    <Box
      p={5}
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.subtle"
      rounded="xl"
      shadow="sm"
      transition="all 0.2s ease"
      _hover={{ shadow: 'md', borderColor: 'border.emphasized' }}
    >
      <HStack justify="space-between" align="start" mb={3}>
        <VStack align="start" gap={0}>
          <Heading size="md" color="fg">
            {location.name}
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            {location.city}, {location.state} {location.zipCode}
          </Text>
        </VStack>
        <Badge
          colorPalette={isOnline ? 'green' : 'gray'}
          variant="solid"
          size="sm"
          rounded="full"
          px={3}
        >
          {location.status.toUpperCase()}
        </Badge>
      </HStack>

      <Text fontSize="xs" color="fg.subtle">
        {location.address}
      </Text>
    </Box>
  );
};

export default LocationCard;
