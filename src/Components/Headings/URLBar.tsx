import { Input } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

export default function URLBar({ onUrlChange, onError, method, onLoad }) {
  const [url, setUrl] = useState("");

  const requestUri = () => {
    if (url.trim() === "") {
      return onError("URL is required");
    }
    if (method.trim() === "") {
      return onError("Method is required");
    }
    onUrlChange(url);
  };

  const urlChanged = (value) => {
    switch (value.trim()) {
      case "http":
        setUrl("http://");
        break;
      case "shttp":
        setUrl("https://");
        break;
      case "_p":
        setUrl("http://localhost:3000");
        break;
      case "_lhnp":
        setUrl("http://localhost/");
        break;
      case "_slhnp":
        setUrl("https://localhost/");
        break;
      case "_lhwp":
        setUrl("http://localhost:");
        break;
      case "_slhwp":
        setUrl("https://localhost:");
        break;
      case "_lh3":
        setUrl("http://localhost:3000/");
        break;
      case "_slh3":
        setUrl("https://localhost:3000/");
        break;
      case "_lh8":
        setUrl("http://localhost:8000/");
        break;
      case "_slh8":
        setUrl("https://localhost:8000/");
        break;
      case "_lh28":
        setUrl("http://localhost:8080/");
        break;
      case "_slh28":
        setUrl("https://localhost:8080/");
        break;
      default:
        setUrl(value);
        break;
    }
  };

  return (
    <Flex
      grow={1}
      alignItems={{ base: "normal", md: "center" }}
      flexDirection={{ base: "column", md: "row" }}
      gap={2}
    >
      <Input
        placeholder="http://localhost:3000"
        onChange={(e) => urlChanged(e.target.value)}
        value={url}
      />
      {onLoad ? (
        <Button colorScheme="blue" isLoading loadingText="Requesting...">
          Request
        </Button>
      ) : (
        <Button colorScheme="blue" onClick={requestUri}>
          Request
        </Button>
      )}
    </Flex>
  );
}
