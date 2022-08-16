import { Heading } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import React from "react";

export default function Card({ head, content }) {
  return (
    <Box
      py={2}
      px={3}
      borderWidth={1}
      borderColor="gray.300"
      rounded="lg"
      shadow="lg"
    >
      <Heading as="h2" fontSize="xl" mb={2}>
        {head}
      </Heading>
      <Divider />
      {content}
    </Box>
  );
}
