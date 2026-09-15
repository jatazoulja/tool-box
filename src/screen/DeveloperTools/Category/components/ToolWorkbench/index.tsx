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
import type { DeveloperToolCategoryDto } from "../../../dto";
import { runDeveloperTool } from "../../utils/run-tool";
import "./index.css";

interface ToolWorkbenchProps {
  category: DeveloperToolCategoryDto;
}

export const ToolWorkbench: React.FC<ToolWorkbenchProps> = ({ category }) => {
  const navigate = useNavigate();
  const [toolId, setToolId] = useState(category.tools[0]?.id ?? "");
  const [input, setInput] = useState("hello world");
  const tool = useMemo(
    () =>
      category.tools.find((item) => item.id === toolId) ?? category.tools[0],
    [category.tools, toolId],
  );
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const run = () => {
    try {
      setResult(runDeveloperTool(tool.id, input));
      setError("");
    } catch (caught) {
      setResult("");
      setError(
        caught instanceof Error
          ? caught.message
          : "This input could not be processed.",
      );
    }
  };

  return (
    <Box className="developer-tools-page" py={{ base: 7, md: 14 }}>
      <Container maxW="5xl">
        <VStack align="stretch" gap={8}>
          <Button
            alignSelf="start"
            variant="plain"
            colorPalette="blue"
            onClick={() => navigate("/developer-tools")}
          >
            ← All developer tools
          </Button>
          <Box>
            <Text
              color="blue.600"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
            >
              Developer tool
            </Text>
            <Heading size="3xl" mt={2}>
              {category.name}
            </Heading>
            <Text color="fg.muted" mt={2}>
              Choose a tool, paste an input, and run it entirely in your
              browser.
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
              <label className="tool-workbench__label">
                Tool
                <select
                  aria-label="Developer tool"
                  value={toolId}
                  onChange={(event) => {
                    setToolId(event.target.value);
                    setResult("");
                    setError("");
                  }}
                >
                  {category.tools.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <Box bg="#162a45" rounded="lg" p={4}>
                <Text fontWeight="semibold">{tool.description}</Text>
                <Text
                  as="code"
                  color="#b5d0f5"
                  fontSize="sm"
                  display="block"
                  mt={2}
                >
                  {tool.example}
                </Text>
              </Box>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
                <label className="tool-workbench__label">
                  Input
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    spellCheck={false}
                  />
                </label>
                <label className="tool-workbench__label">
                  Output
                  <textarea
                    value={error || result}
                    readOnly
                    aria-label="Output"
                    placeholder="Run the tool to see the result"
                  />
                </label>
              </Grid>
              {error ? (
                <Text color="fg.error" fontSize="sm">
                  {error}
                </Text>
              ) : null}
              <Button alignSelf="start" colorPalette="blue" onClick={run}>
                Run {tool.name}
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
