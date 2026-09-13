import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { ConversionTool } from "./components/ConversionTool";
import { CurrencyPlaceholder } from "./components/CurrencyPlaceholder";
import { conversionCategories } from "../utils/conversion-categories";
import "./index.css";

const Category: React.FC = () => {
  const { categoryId } = useParams();
  const category = conversionCategories.find((item) => item.id === categoryId);

  if (!category) {
    return <Navigate to="/converter" replace />;
  }

  if (category.isDynamic) {
    return <CurrencyPlaceholder />;
  }

  return <ConversionTool category={category} />;
};

export default Category;
