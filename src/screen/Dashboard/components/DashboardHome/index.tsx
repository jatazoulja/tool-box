import { Box, Grid, Heading, HStack, Text } from "@chakra-ui/react";
import { ArrowRight, FileCode2 } from "lucide-react";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { conversionCategories } from "../../../Converter/utils/conversion-categories";
import { developerToolCategories } from "../../../DeveloperTools/utils/developer-tool-categories";

type DashboardOutletContext = {
  query: string;
};

const DashboardHome: React.FC = () => {
  const { query } = useOutletContext<DashboardOutletContext>();
  const normalizedQuery = query.trim().toLowerCase();
  const visibleCategories = conversionCategories.filter((category) =>
    `${category.name} ${category.description}`
      .toLowerCase()
      .includes(normalizedQuery),
  );
  const visibleDeveloperCategories = developerToolCategories.filter(
    (category) =>
      `${category.name} ${category.description}`
        .toLowerCase()
        .includes(normalizedQuery),
  );

  return (
    <>
      <Box
        as="section"
        gridColumn="1 / -1"
        aria-labelledby="converters-heading"
      >
        <Heading id="converters-heading" as="h2" className="section-title">
          Converters
        </Heading>
        <Grid
          mt={4}
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
              <Heading as="h3" className="tool-name">
                {category.name}
              </Heading>
              <Text className="tool-description">{category.description}</Text>
            </Link>
          ))}
        </Grid>
      </Box>
      <Box
        as="section"
        gridColumn="1 / -1"
        aria-labelledby="developer-tools-heading"
      >
        <Heading id="developer-tools-heading" as="h2" className="section-title">
          Developer Tools
        </Heading>
        <Grid
          mt={4}
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap={3}
        >
          {visibleDeveloperCategories.map((category) => (
            <Link
              key={category.id}
              to={`/developer-tools/${category.id}`}
              className="tool-card"
            >
              <HStack justify="space-between" align="start">
                <Box className="tool-icon">{category.icon}</Box>
                <ArrowRight className="card-arrow" size={16} />
              </HStack>
              <Text className="tool-code">{category.id}</Text>
              <Heading as="h3" className="tool-name">
                {category.name}
              </Heading>
              <Text className="tool-description">{category.description}</Text>
            </Link>
          ))}
        </Grid>
      </Box>
      {visibleCategories.length === 0 &&
        visibleDeveloperCategories.length === 0 && (
          <Box className="empty-state">
            <FileCode2 size={22} />
            <Text>No tools match “{query}”.</Text>
          </Box>
        )}
    </>
  );
};

export default DashboardHome;
