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
import { developerToolCategories } from "../../utils/developer-tool-categories";
import "./index.css";

export const DeveloperToolsHome: React.FC = () => (
  <Box className="developer-tools-page outlet-page" py={{ base: 8, md: 14 }}>
    <Container maxW="6xl">
      <VStack align="stretch" gap={10}>
        <Box textAlign="center" maxW="2xl" mx="auto">
          <Text
            color="blue.600"
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
          >
            Local utilities for builders
          </Text>
          <Heading size="4xl" mt={3}>
            Developer tools, without the setup
          </Heading>
          <Text color="fg.muted" fontSize="lg" mt={4}>
            Practical text, token, and data helpers that run in your browser.
            Each tool includes a familiar code snippet for quick reference.
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
          {developerToolCategories.map((category) => (
            <Box asChild key={category.id}>
              <Link to={`/developer-tools/${category.id}`}>
                <Box
                  className="developer-tools-card"
                  bg="#111a27"
                  borderWidth="1px"
                  borderColor="#26364b"
                  rounded="xl"
                  p={5}
                  h="full"
                >
                  <HStack align="start" gap={4}>
                    <Box
                      bg="#162a45"
                      color="#9ec5ff"
                      rounded="lg"
                      w={10}
                      h={10}
                      display="grid"
                      placeItems="center"
                      fontWeight="bold"
                    >
                      {category.icon}
                    </Box>
                    <Box>
                      <Heading size="md">{category.name}</Heading>
                      <Text color="fg.muted" fontSize="sm" mt={1}>
                        {category.description}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Link>
            </Box>
          ))}
        </Grid>
      </VStack>
    </Container>
  </Box>
);
