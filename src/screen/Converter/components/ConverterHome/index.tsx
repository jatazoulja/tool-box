import {
  Box,
  Container,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { conversionCategories } from "../../utils/conversion-categories";
import "./index.css";

export const ConverterHome: React.FC = () => (
  <Box className="converter-page" py={{ base: 8, md: 14 }}>
    <Container maxW="6xl">
      <VStack align="stretch" gap={10}>
        <Box textAlign="center" maxW="2xl" mx="auto">
          <Text
            color="blue.600"
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
          >
            Everyday calculation, simplified
          </Text>
          <Heading size="4xl" mt={3}>
            Convert with confidence
          </Heading>
          <Text color="fg.muted" fontSize="lg" mt={4}>
            Choose a category to convert between commonly used units. Fixed
            conversions work instantly, with no API or sign-in required.
          </Text>
        </Box>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={5}
        >
          {conversionCategories.map((category) => (
            <Box asChild key={category.id}>
              <Link to={`/converter/${category.id}`}>
                <Box
                  className="converter-card"
                  bg="bg"
                  borderWidth="1px"
                  borderColor="border.subtle"
                  rounded="xl"
                  p={5}
                  h="full"
                >
                  <HStack align="start" gap={4}>
                    <Box
                      bg="blue.50"
                      color="blue.700"
                      rounded="lg"
                      w={10}
                      h={10}
                      display="grid"
                      placeItems="center"
                      fontWeight="bold"
                      fontSize="lg"
                    >
                      {category.icon}
                    </Box>
                    <Box>
                      <Heading size="md">{category.name}</Heading>
                      <Text color="fg.muted" fontSize="sm" mt={1}>
                        {category.isDynamic
                          ? "Rates require a live data source"
                          : category.description}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Link>
            </Box>
          ))}
        </Grid>
        <Box
          bg="orange.50"
          borderLeftWidth="4px"
          borderColor="orange.400"
          p={5}
          rounded="md"
        >
          <Text fontWeight="semibold">Currency is intentionally separate</Text>
          <Text color="fg.muted" mt={1}>
            Exchange rates change continuously, unlike the fixed units above.
            The currency page is reserved for a future rate API integration.
          </Text>
        </Box>
      </VStack>
    </Container>
  </Box>
);
