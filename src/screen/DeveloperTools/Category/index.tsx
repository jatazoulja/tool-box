import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { ToolWorkbench } from "./components/ToolWorkbench";
import { developerToolCategories } from "../utils/developer-tool-categories";

const DeveloperToolsCategory: React.FC = () => {
  const { categoryId } = useParams();
  const category = developerToolCategories.find(
    (item) => item.id === categoryId,
  );
  return category ? (
    <ToolWorkbench category={category} />
  ) : (
    <Navigate to="/developer-tools" replace />
  );
};

export default DeveloperToolsCategory;
