import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ConversionCategoryDto } from "../../../dto";
import { convert } from "../../utils/convert";
import { FormField } from "./components/FormField";
import { UnitSelect } from "./components/UnitSelect";
import { formatValue } from "./utils/format-value";
import "./index.css";

interface ConversionToolProps {
  category: ConversionCategoryDto;
}

export const ConversionTool: React.FC<ConversionToolProps> = ({ category }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const activeFrom = from || category.units[0]?.id || "";
  const activeTo = to || category.units[1]?.id || category.units[0]?.id || "";
  const result = useMemo(
    () => convert(Number(amount) || 0, activeFrom, activeTo, category),
    [amount, activeFrom, activeTo, category.id],
  );
  const fromUnit = category.units.find((unit) => unit.id === activeFrom);
  const toUnit = category.units.find((unit) => unit.id === activeTo);

  return (
    <Box className="converter-page" py={{ base: 7, md: 14 }}>
      <Container maxW="3xl">
        <VStack align="stretch" gap={8}>
          <Button
            alignSelf="start"
            variant="plain"
            colorPalette="blue"
            onClick={() => navigate("/converter")}
          >
            &lt;- All converters
          </Button>
          <Box>
            <Text
              color="blue.600"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
            >
              Unit converter
            </Text>
            <Heading size="3xl" mt={2}>
              {category.name}
            </Heading>
            <Text color="fg.muted" mt={2}>
              {category.description}. All rates are precise, fixed unit
              mappings.
            </Text>
          </Box>
          <Box
            bg="#111a27"
            borderWidth="1px"
            borderColor="#26364b"
            rounded="2xl"
            p={{ base: 5, md: 8 }}
            shadow="sm"
          >
            <VStack align="stretch" gap={6}>
              <FormField label="Amount">
                <input
                  aria-label="Amount"
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="conversion-tool__input"
                />
              </FormField>
              <Grid
                templateColumns={{ base: "1fr", md: "1fr auto 1fr" }}
                gap={4}
                alignItems="end"
              >
                <FormField label="From">
                  <UnitSelect
                    value={activeFrom}
                    onChange={setFrom}
                    units={category.units}
                  />
                </FormField>
                <Button
                  aria-label="Swap units"
                  variant="outline"
                  onClick={() => {
                    setFrom(activeTo);
                    setTo(activeFrom);
                  }}
                >
                  &lt;-&gt;
                </Button>
                <FormField label="To">
                  <UnitSelect
                    value={activeTo}
                    onChange={setTo}
                    units={category.units}
                  />
                </FormField>
              </Grid>
              <Box bg="#162a45" borderRadius="xl" p={6}>
                <Text color="#9ec5ff" fontSize="sm" fontWeight="medium">
                  RESULT
                </Text>
                <Heading size="2xl" color="#d6e6ff" mt={1}>
                  {formatValue(result)} {toUnit?.symbol}
                </Heading>
                <Text color="#b5d0f5" mt={2}>
                  {amount || 0} {fromUnit?.symbol} = {formatValue(result)}{" "}
                  {toUnit?.symbol}
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
