import { Select } from "@chakra-ui/react";
import React, { useState } from "react";

export default function ResType({ onChange, type }) {
  const [resType, setResType] = useState(type);

  const changeType = (value) => {
    setResType(value);
    onChange(value);
  };

  return (
    <Select
      placeholder="Select Type Data"
      maxW="md"
      onChange={(e) => changeType(e.target.value)}
      value={resType}
    >
      <option value="html">text/html</option>
      <option value="json">application/json</option>
      <option value="text">plain/text</option>
    </Select>
  );
}
