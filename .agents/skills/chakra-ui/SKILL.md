---
name: chakra-ui
description: >-
  Use this skill when developing UI components, layouts, dialogs, forms, or styling
  with Chakra UI (v3). Enforces Chakra UI Provider setup, snippets usage via CLI,
  design tokens, and layout primitives (Box, Flex, HStack, VStack, Grid, Stack).
---

# Chakra UI (v3) Development & Theming Skill

This skill guides the implementation of Chakra UI (v3) within our React + TypeScript + Vite + Atomic Fractal architecture.

---

## 1. Setup & Provider Integration

### Installation

```bash
yarn add @chakra-ui/react @emotion/react
```

### Adding Pre-built Snippets

Chakra UI v3 uses snippets for composable components (like `Button`, `Dialog`, `Drawer`, `Menu`, `Tooltip`):

```bash
yarn dlx @chakra-ui/cli snippet add
```

### Provider Setup (`src/components/ui/provider.tsx`)

```tsx
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import React from 'react';

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};
```

---

## 2. Core Layout & Primitive Components

Always prefer Chakra UI layout primitives instead of ad-hoc CSS:

- **`Box`**: Base layout primitive (`<Box bg="bg.muted" p={4} rounded="md">`)
- **`Flex`**: Flexbox container (`<Flex align="center" justify="space-between">`)
- **`HStack` / `VStack` / `Stack`**: Stack items with equal spacing (`<HStack gap={4}>`, `<VStack gap={3}>`)
- **`Grid`**: CSS grid layouts (`<Grid templateColumns="repeat(3, 1fr)" gap={6}>`)
- **`Text` & `Heading`**: Semantic typography (`<Heading size="lg">`, `<Text color="fg.muted">`)

---

## 3. Integrating with Fractal Architecture

When building a component inside a Screen or Subcomponent:

1. Define types in `dto/`.
2. Encapsulate state using React Context or custom hooks in `stores/`.
3. Use Chakra UI components for clean, accessible markup:

```tsx
// src/screen/<ScreenName>/components/UserCard/index.tsx
import React from 'react';
import { Box, HStack, VStack, Text, Heading, Button } from '@chakra-ui/react';
import { UserDto } from '../../dto';

export interface UserCardProps {
  user: UserDto;
  onEdit?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderColor="border.subtle"
      rounded="lg"
      shadow="sm"
    >
      <HStack justify="space-between">
        <VStack align="start" gap={1}>
          <Heading size="sm">{user.name}</Heading>
          <Text color="fg.muted" fontSize="sm">
            {user.email}
          </Text>
        </VStack>
        {onEdit && (
          <Button size="sm" variant="outline" onClick={onEdit}>
            Edit
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default UserCard;
```

---

## 4. Design Tokens & Color Mode

Use semantic token colors:

- Background: `bg`, `bg.muted`, `bg.subtle`, `bg.emphasized`
- Foreground/Text: `fg`, `fg.muted`, `fg.subtle`, `fg.error`
- Border: `border`, `border.muted`, `border.subtle`
- Spacing & Radii: `p={4}`, `gap={3}`, `rounded="md"`

---

## 5. MCP Server Tools Available

When the Chakra UI MCP server is active (`@chakra-ui/react-mcp`), use the following tools:

- `list_components`: List all available Chakra components.
- `get_component_props`: Get prop definitions and types for any component.
- `get_component_example`: Retrieve official usage examples and patterns.
- `get_theme`: Retrieve the token and theme tree.
