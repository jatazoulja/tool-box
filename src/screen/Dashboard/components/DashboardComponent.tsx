import {
  Box,
  Container,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ArrowRight,
  Braces,
  Check,
  Code2,
  Command,
  FileCode2,
  Github,
  Hash,
  Moon,
  Search,
  Star,
  WandSparkles,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { conversionCategories } from "../../Converter/utils/conversion-categories";

const DashboardComponent: React.FC = () => {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleCategories = conversionCategories.filter((category) =>
    `${category.name} ${category.description}`
      .toLowerCase()
      .includes(normalizedQuery),
  );

  return (
    <Box className="converter-page">
      <Container maxW="7xl" className="converter-shell">
        <HStack className="site-header" justify="space-between">
          <Link to="/converter" className="brand-lockup">
            <svg
              className="brand-mark"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="ToolForge logo"
              role="img"
            >
              <rect
                width="40"
                height="40"
                rx="10"
                fill="#161B22"
                stroke="#30363D"
                strokeWidth="1.5"
              />
              <path
                d="M14 12C12.5 12 12 13 12 14.5V17C12 18 11 19 10 20C11 21 12 22 12 23V25.5C12 27 12.5 28 14 28"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M17 15H23M20 15V25M21 20H24"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M26 12C27.5 12 28 13 28 14.5V17C28 18 29 19 30 20C29 21 28 22 28 23V25.5C28 27 27.5 28 26 28"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <Text className="brand-name">
              TOOL<span>FORGE</span>
            </Text>
          </Link>
          <HStack className="desktop-nav" gap={5}>
            <Link to="/converter" className="nav-link active">
              All Tools
            </Link>
            <Link to="/converter" className="nav-link">
              Converters
            </Link>
            <Link to="/developer-tools" className="nav-link">
              Developer Tools
            </Link>
            <ChakraLink href="#about" className="nav-link">
              About
            </ChakraLink>
          </HStack>
          <HStack gap={2}>
            <Box className="header-icon" title="Toggle theme">
              <Moon size={15} />
            </Box>
            <Box className="github-link" asChild>
              <ChakraLink href="https://github.com" target="_blank">
                <Github size={14} />
                <Text>Star</Text>
              </ChakraLink>
            </Box>
          </HStack>
        </HStack>

        <VStack className="hero" gap={0}>
          <Text className="eyebrow">The developer utility belt</Text>
          <Heading className="hero-title">
            Your everyday developer
            <br />
            <span>Swiss army knife.</span>
          </Heading>
          <Text className="hero-copy">
            Instant, privacy-focused, offline-first web utilities.
          </Text>
          <InputGroup
            className="search-box"
            startElement={<Search size={18} />}
            endElement={
              <Box className="search-shortcut">
                <Command size={12} /> K
              </Box>
            }
          >
            <Input
              aria-label="Search tools"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools, converters..."
            />
          </InputGroup>
          <HStack className="hero-meta" gap={3}>
            <Text>Recent</Text>
            <Text>Popular</Text>
            <Text className="meta-chip">JSON Formatter</Text>
            <Text className="meta-chip">Regex Generator</Text>
            <Text className="meta-chip">Epoch Converter</Text>
          </HStack>
        </VStack>

        <Box className="workspace" id="tools">
          <VStack className="tool-sidebar" align="stretch" gap={1}>
            <Text className="sidebar-label">Workspace</Text>
            <Link to="#tools" className="sidebar-link selected">
              <WandSparkles size={15} /> All Tools
            </Link>
            <Link to="/converter" className="sidebar-link">
              <ArrowRight size={15} /> Converters
            </Link>
            <Link to="/developer-tools" className="sidebar-link">
              <Code2 size={15} /> Developer Tools
            </Link>
            <Link to="/developer-tools/formatting" className="sidebar-link">
              <Braces size={15} /> Cheatsheets
            </Link>
            <Link to="/developer-tools/identifiers" className="sidebar-link">
              <Hash size={15} /> Favorites
            </Link>
            <Box className="sidebar-rule" />
            <Text className="sidebar-note">
              <Check size={13} /> Runs locally in your browser
            </Text>
          </VStack>

          <Box className="tool-content">
            <HStack justify="space-between" mb={5}>
              <Box>
                <Text className="section-kicker">Catalog / utilities</Text>
                <Heading className="section-title">All tools</Heading>
              </Box>
              <Text className="tool-count">
                {visibleCategories.length} tools
              </Text>
            </HStack>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
              }}
              gap={3}
            >
              {visibleCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/converter/${category.id}`}
                  className="tool-card"
                >
                  <HStack justify="space-between" align="start">
                    <Box className="tool-icon">{category.icon}</Box>
                    <ArrowRight className="card-arrow" size={16} />
                  </HStack>
                  <Text className="tool-code">{category.id}</Text>
                  <Heading className="tool-name">{category.name}</Heading>
                  <Text className="tool-description">
                    {category.description}
                  </Text>
                </Link>
              ))}
            </Grid>
            {visibleCategories.length === 0 && (
              <Box className="empty-state">
                <FileCode2 size={22} />
                <Text>No tools match “{query}”.</Text>
              </Box>
            )}
          </Box>
        </Box>

        <HStack className="site-footer" justify="space-between" id="about">
          <Text>100% client-side · Open source · Built for speed</Text>
          <HStack gap={2}>
            <Star size={13} />
            <Text>Make something useful today.</Text>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default DashboardComponent;
