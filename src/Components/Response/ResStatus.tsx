import { Text } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { AxiosError } from "axios";
import React from "react";

export default function ResStatus({ result }) {
  if (result instanceof AxiosError) {
    return (
      <Box my={3} p={1}>
        <Text color="red.400">Network Error</Text>
      </Box>
    );
  }
  return (
    <Box my={3} p={1}>
      <Text>
        Status:{" "}
        <Badge>
          {result.statusText} ({result.status})
        </Badge>
      </Text>
    </Box>
  );
}
