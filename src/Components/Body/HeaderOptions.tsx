import { Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomAlert from "../Core/CustomAlert";

export default function HeaderOptions({ onChange }) {
  const [header, setHeader] = useState("");
  const [error, setError] = useState("");
  const sampleValue = `"Authorization": "bearer <token>"`;

  const onHeaderChange = (value) => {
    setHeader(value);
    if (header === "") {
      return setError("");
    }
    try {
      const data = JSON.parse(`{${value}}`);
      setError("");
      onChange(data);
    } catch (err) {
      setError("Invalid JSON Format");
    }
  };

  return (
    <Box>
      <Text fontSize="md" color="gray.500">
        Header (JSON):
      </Text>
      <Textarea
        mt={3}
        size="md"
        placeholder={sampleValue}
        onChange={(e) => onHeaderChange(e.target.value)}
        value={header}
      />
      <CustomAlert msg={error} type="error" />
    </Box>
  );
}
