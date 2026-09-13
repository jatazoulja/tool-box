import { Text, VStack } from "@chakra-ui/react";
import React from "react";
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}
export const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
  <VStack align="stretch" gap={2}>
    <Text fontSize="sm" fontWeight="semibold">
      {label}
    </Text>
    {children}
  </VStack>
);
