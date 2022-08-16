import { Select } from "@chakra-ui/react";
import React from "react";

export default function TypeData({ onChange }) {
  return (
    <Select
      placeholder="Select Data Type"
      maxW="sm"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="json">JSON</option>
      <option value="yaml">YAML</option>
      <option value="plain/text">Plain Text</option>
    </Select>
  );
}
