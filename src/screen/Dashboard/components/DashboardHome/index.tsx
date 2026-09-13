import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { ArrowRight, FileCode2 } from "lucide-react";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { conversionCategories } from "../../../Converter/utils/conversion-categories";

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

  return (
    <>
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
          <Text className="tool-description">{category.description}</Text>
        </Link>
      ))}
      {visibleCategories.length === 0 && (
        <Box className="empty-state">
          <FileCode2 size={22} />
          <Text>No tools match “{query}”.</Text>
        </Box>
      )}
    </>
  );
};

export default DashboardHome;
