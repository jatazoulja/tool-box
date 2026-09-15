import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
export const CurrencyPlaceholder: React.FC = () => (
  <Box className="converter-page" py={20}>
    <Container maxW="2xl">
      <VStack align="stretch" gap={6}>
        <Button alignSelf="start" variant="plain" colorPalette="blue" asChild>
          <Link to="/converter">&lt;- All converters</Link>
        </Button>
        <Box
          bg="#111a27"
          borderWidth="1px"
          borderColor="#26364b"
          rounded="2xl"
          p={8}
        >
          <Text color="blue.600" fontWeight="bold">
            CURRENCY
          </Text>
          <Heading size="2xl" mt={2}>
            Live rates, coming next
          </Heading>
          <Text color="fg.muted" mt={3}>
            Currency conversion needs a current exchange-rate source. This is
            kept out of fixed mappings so every result can show its rate source
            and update time.
          </Text>
        </Box>
      </VStack>
    </Container>
  </Box>
);
